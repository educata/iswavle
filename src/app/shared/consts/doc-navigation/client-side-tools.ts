import { BaseNavigationTreeNode } from '@app-shared/interfaces';

export const CLIENT_SIDE_TOOLS_NAV: BaseNavigationTreeNode = {
  title: 'ხელსაწყოები კლიენტის მხარეს',
  path: 'client-side-tools',
  children: [
    {
      title: 'მიმოხილვა',
      path: 'overview',
    },
    {
      title: 'პაკეტების მენეჯმენტი',
      path: 'package-management'
    }
  ],
};
