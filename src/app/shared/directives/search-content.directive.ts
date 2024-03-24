import {
  AfterViewInit,
  Directive,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[swSearchContent]',
  standalone: true,
})
export class SearchContentDirective implements AfterViewInit {
  private readonly tempalteRef = inject(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);

  constructor() {
    this.vcr.createEmbeddedView(this.tempalteRef);
  }

  ngAfterViewInit(): void {
    console.log(this.vcr);
  }
}
