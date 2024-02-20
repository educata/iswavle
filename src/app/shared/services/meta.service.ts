import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly mediaPrefixes: string[] = ['og:', 'twitter:'];

  getTitle() {
    return this.title.getTitle();
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTagProperty(meta: string, content: string) {
    this.meta.removeTag(`property="${meta}"`);
    this.meta.addTag({ property: meta, content });
  }

  updateMetaTagName(meta: string, content: string) {
    this.meta.removeTag(`name="${meta}"`);
    this.meta.addTag({ name: meta, content });
  }

  updateMetaTags(metaTags: MetaDefinition[]) {
    metaTags.forEach((meta) => this.meta.updateTag(meta));
  }

  updateMediaMetaTags(meta: string, content: string) {
    this.updateMetaTagName(meta, content);
    this.mediaPrefixes.forEach((prefix) => {
      this.updateMetaTagProperty(`${prefix}${meta}`, content);
    });
  }
}
