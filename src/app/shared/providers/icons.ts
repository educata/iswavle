import { IconDefinition } from '@ant-design/icons-angular';
import {
  GithubOutline,
  BgColorsOutline,
  MenuOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
} from '@ant-design/icons-angular/icons';
import { provideNzIcons } from 'ng-zorro-antd/icon';

export function provideIcons() {
  const icons: IconDefinition[] = [
    GithubOutline,
    BgColorsOutline,
    MenuOutline,
    MenuFoldOutline,
    MenuUnfoldOutline,
  ];

  return provideNzIcons(icons);
}
