import { Shortcut, ShortcutKey } from '@app-shared/interfaces';

export const SHORTCUTS: Record<ShortcutKey, Shortcut> = {
  S: { ctrl: true, description: 'კოდის გაშვება' },
  M: { ctrl: true, description: 'მენიუს გახსნა' },
  K: { ctrl: true, description: 'ძიების გახსნა' },
  R: { ctrl: true, description: 'კოდის გასუფთავება' },
};
