import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  GITHUB_API_COMMITS,
  GITHUB_API_COMMITS_PREFIX,
} from '@app-shared/consts';
import { Contributor, GithubResponse } from '@app-shared/interfaces';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContributorsService {
  private readonly http = inject(HttpClient);

  getContributors(url: string, extension = '.md'): Observable<Contributor[]> {
    const path = GITHUB_API_COMMITS_PREFIX.concat(
      '/',
      url.split('/').slice(2).join('/'),
      extension,
    );
    return this.http
      .get<GithubResponse[]>(`${GITHUB_API_COMMITS}?path=${path}`)
      .pipe(
        map((response) =>
          response
            .map((item) => ({
              name: item.author.login,
              avatar_url: item.author.avatar_url,
              html_url: item.author.html_url,
            }))
            .filter(
              (contributor, index, self) =>
                index ===
                self.findIndex((user) => user.name === contributor.name),
            ),
        ),
        catchError(() => {
          return of([]);
        }),
      );
  }
}
