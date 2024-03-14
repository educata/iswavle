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

      const title = this.indexMap[articlePath].title || '';
      const titleResult = title.search(this.searchValue);

      if (searchResult === -1 && titleResult === -1) {
        continue;
      }

      const highlightedTitle = this.highlightText(title, this.searchValue);
      const highlightedContent = this.highlightText(content, this.searchValue);

      result.push({
        title: highlightedTitle,
        content: highlightedContent,
        routerLink: articlePath,
      });
    }

    this.#result$.next(result);
  }

  highlightText(text: string, searchTerm: string): IndexMapResultContent[] {
    if (!text || !searchTerm) {
      return [];
    }

    const words = text.split(/\s+/);

    const searchTermIndex = words.findIndex((word) =>
      word.includes(searchTerm),
    );

    const startWordIndex = Math.max(0, searchTermIndex - 10);
    const endWordIndex = Math.min(words.length - 1, searchTermIndex + 5);

    const slicedWords = words.slice(startWordIndex, endWordIndex + 1);

    return slicedWords.map((word) => {
      return {
        data: ` ${word} `,
        highlight: word.includes(searchTerm),
      };
    });
  }

  onClick(content: IndexMapResult) {
    this.router.navigate([content.routerLink], {
      queryParams: { search: this.searchValue },
    });
    this.onResultClick.emit(content);
  }
}
