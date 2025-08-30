import { LogGreeter } from '@app-shared/interfaces';

export const DEFAULT_LOG_DATA: LogGreeter[] = [
  {
    message: '%cმოგესალმებით iswavle.com-ზე',
    style: ['color:#1890ff;font-size:28px;font-weight:bold'],
  },
  {
    message:
      '%cეს არის დეველოპერის ხელსაწყო %cconsole %cსადაც შეგიძლია %cJavaScript%c-ის კოდი გაუშვა',
    style: [
      'color:inherit;',
      'color:green;font-weight:bold',
      'color:inherit;',
      'color:orange;font-weight:bold',
      'color:inherit;',
    ],
  },
];
