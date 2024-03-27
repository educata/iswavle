import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AUTHORS,
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
              name: `კონტრიბუტორი: ${item.author.login}`,
              avatar_url: item.author.avatar_url,
              html_url: item.author.html_url,
            }))
            .concat(AUTHORS)
            .filter(
              (contributor, index, self) =>
                index ===
                self.findIndex(
                  (user) => user.html_url === contributor.html_url,
                ),
            )
            .map((contributor, index, self) => {
              // check if default author is the contributor

              const author = AUTHORS.find(
                (author) => author.html_url === contributor.html_url,
              );

              if (!author) {
                return contributor;
              }

              // check if default author is the initial comitter
              const isAuthor = AUTHORS.some(
                (author) => author.html_url === self[0].html_url,
              );

              // if initial commiter is default author's mark as author else as editor
              contributor.name = `${isAuthor ? 'ავტორი' : 'რედაქტორი'}: ${author.name}`;
              return contributor;
            }),
        ),
        catchError(() => {
          return of(
            // if request error return default authors
            AUTHORS.map((author) => ({
              name: `ავტორი: ${author.name}`,
              html_url: author.html_url,
              avatar_url: author.avatar_url,
            })),
          );
        }),
      );
  }
}
