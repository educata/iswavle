import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';
import {
  TITLE_SUFFIX,
  TITLE_SEPARATOR,
  TITLE_SUFFIX_SEPARATOR,
} from '@app-shared/consts';
import { DocContent } from '@app-shared/interfaces';
import { MetaTags } from '@app-shared/enums';
import { MetaService } from './meta.service';

@Injectable()
export class SwTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly metaService = inject(MetaService);

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

    const routeTitle = this.buildPageTitle(route);
    const title = `${routeTitle} ${TITLE_SUFFIX_SEPARATOR} ${TITLE_SUFFIX}`;
    this.metaService.updateMediaMetaTags(MetaTags.Title, title);
    return title;
  }

  buildPageTitle(route: ActivatedRouteSnapshot) {
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
      params.shift();
      params.pop();
      params.push(content.attributes.title);
    }
    const title =
      params.reverse().join(` ${TITLE_SEPARATOR} `) ||
      content.attributes.toc[0].title;

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
