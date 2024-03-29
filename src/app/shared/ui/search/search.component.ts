import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SearchService } from '@app-shared/services';
import { SearchResultComponent } from '..';
import { AsyncPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IndexMapResult } from '@app-shared/interfaces';

@Component({
  selector: 'sw-search',
  standalone: true,
  imports: [
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    SearchResultComponent,
    AsyncPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() searchCompleted = new EventEmitter<void>();

  readonly searchService = inject(SearchService);
  readonly isSearchModalVisible$ = new BehaviorSubject<boolean>(false);

  readonly cache = new Map<string, IndexMapResult[]>();

  readonly vm$ = combineLatest([
    this.searchService.indexMap$,
    this.isSearchModalVisible$,
    this.searchService.search$,
  ]).pipe(
    map(([indexMap, isSearchModalVisible, search]) => ({
      isSearchModalVisible,
      indexMap,
      search,
    })),
  );

  searchUp(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchService.search(target.value);
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.searchService.search('');
  }

  onCacheChange(event: { key: string; data: IndexMapResult[] }) {
    this.cache.set(event.key, event.data);
  }
}
