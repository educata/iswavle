import { ThemeOptions } from '@app-shared/enums';
import { ThemeDisplay } from '@app-shared/interfaces';

export const DISPLAY_THEMES: ThemeDisplay[] = [
  {
    title: 'ნათელი',
    value: ThemeOptions.Light,
  },
  {
    title: 'მუქი',
    value: ThemeOptions.Dark,
  },
  {
    title: 'ნაგულისხმევი',
    value: ThemeOptions.OS,
  },
];
