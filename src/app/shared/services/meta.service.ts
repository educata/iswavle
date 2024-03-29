import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { DEFAULT_KEYWORDS, DEFAULT_META_CONFIG } from '@app-shared/consts';
import { MetaTags } from '@app-shared/enums';
import { DocContent } from '@app-shared/interfaces';

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

  updateContentMetaTags(content: DocContent, section: string) {
    const attributes = content.attributes;

    if (attributes.description) {
      this.updateMediaMetaTags(MetaTags.Description, attributes.description);
    }

    const keywords = [
      ...DEFAULT_KEYWORDS,
      ...(DEFAULT_META_CONFIG.find((meta) => meta.name === section)?.keywords ||
        []),
    ];

    if (attributes.keywords) {
      keywords.push(...attributes.keywords.split(', '));
    }

    if (attributes.toc) {
      attributes.toc.forEach((toc) => {
        if (!keywords.includes(toc.title)) {
          keywords.push(
            toc.title === 'შეჯამება'
              ? `${attributes.title} შეჯამება`
              : toc.title,
          );
        }
        if (toc.sub) {
          // only 1 depth
          toc.sub.forEach((item) => {
            if (!keywords.includes(item.title)) {
              keywords.push(item.title);
            }
          });
        }
      });
    }

    if (keywords.length > 0) {
      const uniqueKeywords = [...new Set(keywords)];
      this.updateMetaTagName(MetaTags.Keywords, uniqueKeywords.join(', '));
    }

    if (attributes.image) {
      this.updateMediaMetaTags(MetaTags.Image, attributes.image);
    } else {
      const language = DEFAULT_META_CONFIG.find(
        (lang) => lang.name === section,
      );

      if (language && language.imagePath) {
        this.updateMediaMetaTags(
          MetaTags.Image,
          `https://iswavle.com/assets/images/${language.imagePath}`,
        );
      }
    }
  }
}
