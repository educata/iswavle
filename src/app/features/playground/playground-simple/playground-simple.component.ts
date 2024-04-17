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
} from 'rxjs';

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

  editorForm = this.fb.group({});

  readonly openFileName$ = new BehaviorSubject<string>('index.html');

  readonly vm$ = combineLatest([
    this.files$,
    this.themeService.theme$,
    this.editorTheme$,
    this.isSiderCollapsed$,
    this.isEditorInitialized$,
    this.openFileName$,
  ]).pipe(
    map(
      ([
        files,
        globalTheme,
        editorTheme,
        isSiderCollapsed,
        isEditorInitialized,
        openFileName,
      ]) => ({
        files,
        globalTheme,
        editorTheme,
        isSiderCollapsed,
        isEditorInitialized,
        openFileName,
      }),
    ),
  );

  effects = {
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
            this.fb.control(file['content']),
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
}
