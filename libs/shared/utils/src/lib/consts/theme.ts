import { ThemeOptions } from '../enums';
import { ThemeDisplay } from '../interfaces';

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
