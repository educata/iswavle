import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { PlaygroundBaseComponent } from '../playground-base';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';
import { LanguageExtensionPipe } from '../language-extension.pipe';
import { Uri } from 'monaco-editor';
import {
  withLatestFrom,
  filter,
  debounceTime,
  tap,
  take,
  BehaviorSubject,
  combineLatest,
  map,
  switchMap,
  startWith,
} from 'rxjs';
import { PlaygroundEffects } from '@app-shared/interfaces';
import { BypassSanitizePipe } from './bypass-sanitize.pipe';

declare const monaco: any;

@Component({
  selector: 'sw-playground-simple',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzIconModule,
    NzTreeModule,
    NzCodeEditorModule,
    NzSpinModule,
    FormsModule,
    LanguageExtensionPipe,
    NzGridModule,
    NzLayoutModule,
    NzButtonModule,
    NzDropDownModule,
    BypassSanitizePipe,
  ],
  templateUrl: './playground-simple.component.html',
  styleUrl: './playground-simple.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundSimpleComponent
  extends PlaygroundBaseComponent
  implements OnInit
{
  private readonly fb = inject(FormBuilder);

  readonly editorForm = this.fb.group({});
  readonly openFileName$ = new BehaviorSubject<string>('index.html');

  readonly frameSource$ = this.files$.pipe(
    take(1),
    switchMap(() =>
      this.editorForm.valueChanges.pipe(startWith(this.editorForm.value)),
    ),
    map((files) => this.combineFiles(files)),
  );

  readonly vm$ = combineLatest([
    this.files$,
    this.themeService.theme$,
    this.editorTheme$,
    this.isSiderCollapsed$,
    this.isEditorInitialized$,
    this.openFileName$,
    this.frameSource$,
  ]).pipe(
    map(
      ([
        files,
        globalTheme,
        editorTheme,
        isSiderCollapsed,
        isEditorInitialized,
        openFileName,
        frameSource,
      ]) => ({
        files,
        globalTheme,
        editorTheme,
        isSiderCollapsed,
        isEditorInitialized,
        openFileName,
        frameSource,
      }),
    ),
  );

  readonly effects: PlaygroundEffects = {
    refreshEditorLayout$: this.isSiderCollapsed$.pipe(
      withLatestFrom(this.isEditorInitialized$),
      filter(([_, isEditorInitialized]) => isEditorInitialized),
      debounceTime(500),
      tap(() => this.editorRef.layout()),
    ),

    registerLinkOpener$: this.isEditorInitialized$.pipe(
      filter(Boolean),
      take(1),
      tap(() => {
        monaco.editor.registerLinkOpener({
          async open(resource: Uri) {
            // TODO: handle link opener
            console.log(resource);
            return true;
          },
        });
      }),
    ),

    updateFormControls$: this.files$.pipe(
      tap((files) => {
        if (!files[0].children) return;

        this.editorForm.reset();

        files[0].children.forEach((file) => {
          this.editorForm.setControl(
            file.title.replaceAll('.', ''),
            this.fb.control(
              file.title.includes('html')
                ? this.parseHTML(file['content'])
                : file['content'],
            ),
          );
        });
      }),
    ),

    rerenderEditor$: this.openFileName$.pipe(tap(() => this.reRenderEditor())),
  };

  ngOnInit(): void {
    this.registerEffects(this.effects);
  }

  selectFile(event: NzFormatEmitEvent) {
    if (!event.node?.isLeaf) return;
    this.openFileName$.next(event.node.title);
  }

  private parseHTML(html: string) {
    html = html.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      '',
    );

    const bodyContent = html.match(/<body[^>]*>[\s\S]*<\/body>/i);

    if (bodyContent && bodyContent.length > 0) {
      return bodyContent[0].replace(/<\/?body[^>]*>/g, '');
    }

    return '';
  }

  private combineFiles(files: Partial<{ [key: string]: string }>) {
    const htmls: string[] = [];
    const styles: string[] = [];
    const scripts: string[] = [];

    for (const key in files) {
      const content = files[key] || '';
      if (key.includes('html')) {
        htmls.push(content);
      } else if (key.includes('js')) {
        scripts.push(content);
      } else if (key.includes('css')) {
        styles.push(content);
      }
    }

    // TODO: Update

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Example</title>
          <style>${styles.join(' ')}</style>
        </head>
        <body>
          ${htmls.join(' ')}
          <span></span>
          <script>
            ${scripts.join(' ')}
          </script>
        </body>
      </html>
    `;
  }
}
