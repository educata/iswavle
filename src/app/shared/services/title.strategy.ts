import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import { TITLE_PREFIX, TITLE_SEPARATOR } from '@app-shared/consts';
import { DocContent } from '@app-shared/interfaces';

@Injectable()
export class SwTitleStrategy extends TitleStrategy {
  readonly title = inject(Title);

  constructor() {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    this.title.setTitle(title);
  }

  override buildTitle(snapshot: RouterStateSnapshot): string {
    let route: ActivatedRouteSnapshot = snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const routeTitle = this.buildDocTitle(route);
    return `${TITLE_PREFIX} ${TITLE_SEPARATOR} ${routeTitle}`;
  }

  buildDocTitle(route: ActivatedRouteSnapshot) {
    const isMatcher = typeof route.routeConfig?.matcher === 'function';
    if (!isMatcher) {
      return route.title;
    }

    const isEditor = !route.data['data'].content;

    if (isEditor) {
      return this.capitalise(route.data['data'].title);
    }

    const content = route.data['data'] as DocContent;
    const params: string[] = [];
    for (const param in route.params) {
      params.push(route.params[param]);
    }
    if (content.attributes.title) {
      params.splice(2, 1, content.attributes.title);
    }
    const title =
      params.join(` ${TITLE_SEPARATOR} `) || content.attributes.toc[0].title;

    return title
      .split(' ')
      .map((word) => this.capitalise(word))
      .join(' ');
  }

  private capitalise(text: string) {
    return text
      .split(' ')
      .map((word, index) =>
        index === 0 && !/^[ა-ჰ]/.test(word)
          ? `${word[0].toUpperCase()}${word.slice(1)}`
          : word,
      )
      .join(' ');
  }
}
