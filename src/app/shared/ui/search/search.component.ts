import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, map, tap } from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SearchService } from '@app-shared/services';
import { SearchResultComponent } from '..';
import { AsyncPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IndexMapResult } from '@app-shared/interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sw-search',
  imports: [
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    SearchResultComponent,
    AsyncPipe,
    ReactiveFormsModule,
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
  readonly searchControl = new FormControl('');

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

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(500),
        tap((value) => {
          this.searchService.search(value || '');
        }),
      )
      .subscribe();
  }

  clearSearch() {
    this.searchControl.setValue(null);
  }

  onCacheChange(event: { key: string; data: IndexMapResult[] }) {
    this.cache.set(event.key, event.data);
  }

  handleSearchCtaClick() {
    this.isSearchModalVisible$.next(true);
    if (!this.searchService.hasInitialized()) {
      this.searchService.init();
    }
  }
}
