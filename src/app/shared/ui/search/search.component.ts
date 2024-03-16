import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SearchService } from '@app-shared/services';
import { SearchResultComponent } from '..';
import { AsyncPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
  readonly searchService = inject(SearchService);
  readonly isSearchModalVisible$ = new BehaviorSubject<boolean>(false);

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
}
