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
import { WEBCONTAINER_STATE } from '../../../../shared/providers';
import { isPlatformBrowser } from '@angular/common';
import { Observable, filter, from, switchMap, take, tap } from 'rxjs';
import { Terminal } from 'xterm';
import { WebContainerProcess } from '@webcontainer/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  @ViewChild('terminal') terminalRef!: ElementRef<HTMLElement>;
  @Input() interactive = true;
  @Input() processInput: Observable<WebContainerProcess> | undefined;

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platform)) return;
    // Has to be imported only in browser
    const Terminal = await import('xterm').then((m) => m.Terminal);
    const terminal = new Terminal({ convertEol: true });
    terminal.open(this.terminalRef.nativeElement);

    if (this.interactive) {
      // Start shell session after container instance has loaded
      this.webContainerState.instanceLoaded$
        .pipe(
          filter(Boolean),
          take(1),
          switchMap(() => from(this.webContainerState.instance!.spawn('jsh'))),
          tap((shellProcess) => {
            const input = shellProcess.input.getWriter();
            this.writeProcess(terminal, shellProcess);
            input.write('cd * && clear\n'); //cd to Project folder and clear console
            terminal.onData((data) => {
              input.write(data);
            });
          }),
        )
        .subscribe();
    }

    if (this.processInput) {
      this.processInput
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((process) => this.writeProcess(terminal, process)),
        )
        .subscribe();
    }
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
