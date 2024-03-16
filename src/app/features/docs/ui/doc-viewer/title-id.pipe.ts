import { Pipe, PipeTransform, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Pipe({
  name: 'titleId',
  standalone: true,
})
export class TitleIdPipe implements PipeTransform {
  private readonly activatedRoute = inject(ActivatedRoute);

  transform(value: string) {
    return `doc/${this.activatedRoute.snapshot.url.map((url) => url.path).join('/')}#${value.split(' ').join('_')}`;
  }
}
