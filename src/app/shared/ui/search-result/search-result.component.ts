import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {
  IndexMap,
  IndexMapResult,
  IndexMapResultContent,
} from '@app-shared/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sw-search-result',
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent implements OnChanges {
  @Input() indexMap: IndexMap | null = null;
  @Input() searchValue = '';

  @Output() onResultClick = new EventEmitter<IndexMapResult>();

  private readonly router = inject(Router);
  readonly #result$ = new BehaviorSubject<IndexMapResult[]>([]);
  readonly result$ = this.#result$.asObservable();

  ngOnChanges(changes: SimpleChanges): void {
    if ('searchValue' in changes) {
      this.filter();
    }
  }

  filter() {
    const result: IndexMapResult[] = [];

    for (const articlePath in this.indexMap) {
      const content = this.indexMap[articlePath].content;
      const searchResult = content.search(this.searchValue);

      if (searchResult === -1) {
        continue;
      }

      const words = content.split(/\s+/);

      const searchTermIndex = words.findIndex((word) =>
        word.includes(this.searchValue),
      );

      const startWordIndex = Math.max(0, searchTermIndex - 10);
      const endWordIndex = Math.min(words.length - 1, searchTermIndex + 5);

      const slicedWords = words.slice(startWordIndex, endWordIndex + 1);

      const highlightedContent = slicedWords.map((word) => {
        return {
          data: ` ${word} `,
          highlight: word.includes(this.searchValue),
        };
      });

      const adjustedContent: IndexMapResultContent[] = [];

      highlightedContent.forEach((item) => {
        if (item.highlight) {
          if (item.data === this.searchValue) {
            adjustedContent.push(item);
          } else {
            const splitArray = item.data.split(this.searchValue);
            const resultArray = [];

            for (let i = 0; i < splitArray.length; i++) {
              const obj = {
                data: splitArray[i],
                highlight: this.searchValue === splitArray[i],
              };
              resultArray.push(obj);
              if (i < splitArray.length - 1) {
                resultArray.push({ data: this.searchValue, highlight: true });
              }
            }
            adjustedContent.push(...resultArray);
          }
        } else {
          adjustedContent.push(item);
        }
      });

      result.push({
        title: this.indexMap[articlePath].title,
        content: adjustedContent,
        routerLink: articlePath,
      });
    }

    this.#result$.next(result);
  }

  onClick(content: IndexMapResult) {
    this.router.navigate([content.routerLink], {
      queryParams: { search: this.searchValue },
    });
    this.onResultClick.emit(content);
  }
}
