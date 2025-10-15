import { BaseNavigationTreeNode } from '@app-shared/interfaces';

export const HTML_CSS_GUIDE_NAV: BaseNavigationTreeNode = {
  title: 'HTML&CSS',
  path: 'html-css',
  children: [
    { title: 'შესავალი', path: 'introduction' },
    { title: 'შესავალი CSS-ში', path: 'css' },
    { title: 'ცხრილები', path: 'table' },
    { title: 'ტექსტის გასტილვა', path: 'styling-text' },
    { title: 'Box Model (ყუთის მოდელი)', path: 'box-model' },
    { title: 'ფერის მნიშვნელობები', path: 'color-values' },
    { title: 'ჰიპერბმულები', path: 'hyperlinks' },
    { title: 'სემანტიკური ელემენტები', path: 'semantics' },
    { title: 'SEO', path: 'seo' },
    { title: 'ფორმები', path: 'form' },
    { title: 'ხელმისაწვდომობა (a11y)', path: 'a11y' },
    { title: 'სელექტორები და ფსევდო კლასები', path: 'selector-pseudo-classes' },
    { title: 'ფსევდო ელემენტები', path: 'pseudo-elements' },
    { title: 'მულტიმედია', path: 'multimedia' },
    { title: 'პოზიცირება', path: 'position' },
    { title: 'Flexbox', path: 'flexbox' },
    { title: 'Grid', path: 'grid' },
    { title: 'ანიმაცია', path: 'animations' },
    { title: 'რესპონსიული ვებ დიზაინი', path: 'responsive' },
    { title: 'ცვლადები', path: 'variables' },
    { title: 'UI ფრეიმვორკები', path: 'ui-frameworks' },
  ],
};

export const HTML_CSS_REFERENCE_NAV: BaseNavigationTreeNode = {
  title: 'HTML',
  path: 'html',
  children: [
    {
      title: '<center>',
      path: 'center',
      depricated: true,
    },
  ],
};
