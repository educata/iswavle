import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { WebContainerProcess } from '@webcontainer/api';
import {
  Observable,
  combineLatest,
  filter,
  fromEvent,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Terminal } from 'xterm';
import { WEBCONTAINER_STATE, LAYOUT_SIZES } from '@app-shared/providers';
import 'xterm/css/xterm.css'; // terminal styles

@Component({
  selector: 'sw-terminal',
  standalone: true,
  imports: [],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalComponent implements AfterViewInit {
  private readonly platform = inject(PLATFORM_ID);
  private readonly webContainerState = inject(WEBCONTAINER_STATE, {
    skipSelf: true,
  });
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly layoutSizes = inject(LAYOUT_SIZES);

  @ViewChild('terminal') terminalRef!: ElementRef<HTMLElement>;
  @Input() interactive = true;
  @Input() processInput$: Observable<WebContainerProcess> | undefined;

  shellProcess$ = this.webContainerState.shellProcess$.pipe(filter(Boolean));
  instanceLoaded$ = this.webContainerState.instanceLoaded$.pipe(
    filter(Boolean),
  );

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platform)) return;
    // Has to be imported only in browser
    const Terminal = await import('xterm').then((m) => m.Terminal);
    const FitAddon = await import('xterm-addon-fit').then((m) => m.FitAddon);

    const terminal = new Terminal({
      convertEol: true,
      rows: this.layoutSizes.terminalMaxRow,
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    this.terminalRef.nativeElement.style.maxWidth = `${document.getElementById('result-side')?.clientWidth ?? 100}px`;
    terminal.open(this.terminalRef.nativeElement);
    fitAddon.fit();

    if (this.interactive) {
      this.startShell(terminal);
      this.terminalRef.nativeElement.style.maxWidth = `${document.getElementById('result-side')?.clientWidth ?? 100}px`;

      fromEvent(this.document.defaultView!, 'resize')
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          switchMap(() => this.shellProcess$),
          tap((shellProcess) => {
            this.terminalRef.nativeElement.style.maxWidth = `${document.getElementById('result-side')?.clientWidth ?? 100}px`;
            fitAddon.fit();
            shellProcess.resize({
              cols: terminal.cols,
              rows:
                terminal.rows >= this.layoutSizes.terminalMaxRow
                  ? this.layoutSizes.terminalMaxRow
                  : terminal.rows,
            });
          }),
        )
        .subscribe();
    }

    if (this.processInput$) {
      this.processInput$
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((process) => this.writeProcess(terminal, process)),
        )
        .subscribe();
    }
  }

  startShell(terminal: Terminal) {
    const startShellSession$ = this.instanceLoaded$.pipe(
      tap(() => {
        this.webContainerState.startShellProcess({
          rows: terminal.rows,
          cols: terminal.cols,
        });
      }),
    );

    const setupShellWriter$ = this.shellProcess$.pipe(
      tap((shellProcess) => {
        const input = shellProcess.input.getWriter();
        this.writeProcess(terminal, shellProcess);
        input.write('cd * && clear\n'); //cd to Project folder and clear console
        terminal.onData((data) => {
          input.write(data);
        });
      }),
    );

    combineLatest([startShellSession$, setupShellWriter$])
      .pipe(take(1))
      .subscribe();
  }

  writeProcess(terminal: Terminal, process: WebContainerProcess) {
    return process.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data);
        },
      }),
    );
  }
}
