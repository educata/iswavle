// used Material Icon Theme https://github.com/PKief/vscode-material-icon-theme/

import { CustomIcons } from '@app-shared/interfaces';

export const ICON_PREFIX = 'sw:';

// TODO: implement dynamic loading

export const CUSTOM_ICONS: CustomIcons = {
  html: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 17.56 4.07-1.13.55-6.1H9.38L9.2 8.3h7.6l.2-1.99H7l.56 6.01h6.89l-.23 2.58-2.22.6-2.22-.6-.14-1.66h-2l.29 3.19L12 17.56M4.07 3h15.86L18.5 19.2 12 21l-6.5-1.8L4.07 3z" fill="#e44d26"/></svg>',
  css: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m5 3-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3H5z" fill="#42a5f5"/></svg>',
  js: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v18H3V3m4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.8 2.53-2.55v-5.78h-1.7V17c0 .86-.35 1.08-.9 1.08-.58 0-.82-.4-1.09-.87l-1.38.83m5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8z" fill="#ffca28"/></svg>',
  ts: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><path d="M46 46v408h408V46H46zm310.02 198.17v.006c3.912.012 8.359.213 11.703.576 13.619 1.473 24.225 7.349 33.248 18.416 4.493 5.513 6.03 7.925 5.703 8.957-.211.666-3.294 2.874-13.096 9.38-9.629 6.393-12.73 8.308-13.45 8.308-.731 0-2.253-1.566-4.446-4.573-4.225-5.789-8.538-8.431-15.205-9.312-7.17-.95-13.602 1.31-16.752 5.888-2.693 3.912-3.1 10.206-.96 14.78 2.48 5.297 6.968 8.226 24.167 15.767 19.836 8.698 29.888 14.651 37.209 22.04 7.884 7.956 11.878 17.142 13.105 30.136.599 6.334-.133 13.84-1.945 19.943-4.445 14.961-16.44 25.916-34.02 31.072-4.86 1.425-9.382 2.276-13.855 2.604-6.829.503-16.603.226-22.486-.63-14.884-2.169-31.686-10.83-40.064-20.65-4.113-4.821-9.364-12.755-9.364-14.15 0-.674.334-1.057 1.656-1.897 3.922-2.492 26.394-15.338 26.83-15.338.264 0 1.438 1.383 2.608 3.074 2.651 3.828 9.17 10.407 12.484 12.602 2.707 1.793 6.169 3.232 10.279 4.271 2.354.587 3.6.692 8.736.692 5.248-.002 6.324-.09 8.672-.721 6.21-1.671 11.057-5.13 13.111-9.354.9-1.825.918-2.053.918-6.48v-4.59l-1.104-2.19c-2.673-5.306-8.433-8.947-26.645-16.835-8.365-3.624-18.61-8.733-22.61-11.275-9.129-5.801-15.456-12.433-19.608-20.551-4.13-8.073-4.745-11.078-4.755-23.217-.01-9.503-.026-9.386 1.941-15.451 1.785-5.504 5.439-11.652 9.473-15.94 8.05-8.557 19.813-14.057 32.406-15.151 1.61-.153 3.768-.212 6.115-.205zm-108.36 1.877h.004c24.253.012 38.156.096 38.379.236.42.26.473 2.371.473 15.842v15.541l-24.201.088-24.201.088v68.713c0 37.793-.077 68.938-.182 69.213-.171.463-2.033.498-17.78.498h-17.587l-.182-.71c-.117-.39-.203-31.537-.205-69.214l-.006-68.504-24.2-.086-24.202-.088v-15.357c0-12.18.084-15.442.409-15.766.333-.343 12.684-.431 65.902-.484 10.26-.01 19.495-.015 27.58-.01z" fill="#0288d1"/></svg>',
  json: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.759 3.975h1.783V5.76H5.759v4.458A1.783 1.783 0 0 1 3.975 12a1.783 1.783 0 0 1 1.784 1.783v4.459h1.783v1.783H5.759c-.954-.24-1.784-.803-1.784-1.783v-3.567a1.783 1.783 0 0 0-1.783-1.783H1.3v-1.783h.892a1.783 1.783 0 0 0 1.783-1.784V5.76A1.783 1.783 0 0 1 5.76 3.975m12.483 0a1.783 1.783 0 0 1 1.783 1.784v3.566a1.783 1.783 0 0 0 1.783 1.784h.892v1.783h-.892a1.783 1.783 0 0 0-1.783 1.783v3.567a1.783 1.783 0 0 1-1.783 1.783h-1.784v-1.783h1.784v-4.459A1.783 1.783 0 0 1 20.025 12a1.783 1.783 0 0 1-1.783-1.783V5.759h-1.784V3.975h1.784M12 14.675a.892.892 0 0 1 .892.892.892.892 0 0 1-.892.892.892.892 0 0 1-.891-.892.892.892 0 0 1 .891-.892m-3.566 0a.892.892 0 0 1 .891.892.892.892 0 0 1-.891.892.892.892 0 0 1-.892-.892.892.892 0 0 1 .892-.892m7.133 0a.892.892 0 0 1 .891.892.892.892 0 0 1-.891.892.892.892 0 0 1-.892-.892.892.892 0 0 1 .892-.892z" fill="#fbc02d"/></svg>',
  scss: '<svg viewBox="0 0 500 500" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M419.047 96.227C406.855 48.39 327.54 32.67 252.472 59.336c-44.68 15.876-93.029 40.785-127.81 73.31-41.349 38.675-47.943 72.329-45.216 86.396 9.583 49.621 77.585 82.068 105.535 106.125v.144c-8.246 4.051-68.565 34.585-82.684 65.8-14.893 32.932 2.372 56.556 13.804 59.742 35.424 9.858 71.765-7.866 91.312-37.01 18.852-28.12 17.279-64.422 9.085-82.488 11.3-2.976 24.476-4.313 41.218-2.36 47.248 5.52 56.517 35.017 54.747 47.367s-11.681 19.14-14.998 21.185-4.326 2.767-4.05 4.287c.406 2.216 1.94 2.137 4.758 1.652 3.894-.655 24.804-10.042 25.709-32.827 1.14-28.934-26.587-61.302-75.684-60.45-20.216.354-32.933 2.268-42.123 5.69a82.505 82.505 0 0 0-2.084-2.308c-30.35-32.382-86.46-55.285-84.088-98.823.866-15.824 6.372-57.5 107.817-108.053 83.104-41.414 149.638-30.009 161.135-4.759 16.427 36.079-35.554 103.137-121.857 112.812-32.88 3.684-50.199-9.06-54.499-13.805-4.536-4.995-5.204-5.218-6.909-4.287-2.753 1.534-1.01 5.939 0 8.574 2.583 6.712 13.15 18.603 31.176 24.516 15.863 5.204 54.459 8.062 101.157-9.99 52.282-20.255 93.12-76.523 81.124-123.549zM196.584 339.995c3.92 14.5 3.487 28.016-.564 40.247a65.289 65.289 0 0 1-3.225 7.97c-3.12 6.477-7.315 12.534-12.441 18.132-15.654 17.07-37.508 23.533-46.882 18.092-10.12-5.873-5.047-29.943 13.084-49.11 19.52-20.635 47.602-33.902 47.602-33.902l-.039-.08 2.465-1.35z" fill="#ec407a" stroke="#ec407a" stroke-width="16.287"/></svg>',
  sass: '<svg viewBox="0 0 500 500" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M419.047 96.227C406.855 48.39 327.54 32.67 252.472 59.336c-44.68 15.876-93.029 40.785-127.81 73.31-41.349 38.675-47.943 72.329-45.216 86.396 9.583 49.621 77.585 82.068 105.535 106.125v.144c-8.246 4.051-68.565 34.585-82.684 65.8-14.893 32.932 2.372 56.556 13.804 59.742 35.424 9.858 71.765-7.866 91.312-37.01 18.852-28.12 17.279-64.422 9.085-82.488 11.3-2.976 24.476-4.313 41.218-2.36 47.248 5.52 56.517 35.017 54.747 47.367s-11.681 19.14-14.998 21.185-4.326 2.767-4.05 4.287c.406 2.216 1.94 2.137 4.758 1.652 3.894-.655 24.804-10.042 25.709-32.827 1.14-28.934-26.587-61.302-75.684-60.45-20.216.354-32.933 2.268-42.123 5.69a82.505 82.505 0 0 0-2.084-2.308c-30.35-32.382-86.46-55.285-84.088-98.823.866-15.824 6.372-57.5 107.817-108.053 83.104-41.414 149.638-30.009 161.135-4.759 16.427 36.079-35.554 103.137-121.857 112.812-32.88 3.684-50.199-9.06-54.499-13.805-4.536-4.995-5.204-5.218-6.909-4.287-2.753 1.534-1.01 5.939 0 8.574 2.583 6.712 13.15 18.603 31.176 24.516 15.863 5.204 54.459 8.062 101.157-9.99 52.282-20.255 93.12-76.523 81.124-123.549zM196.584 339.995c3.92 14.5 3.487 28.016-.564 40.247a65.289 65.289 0 0 1-3.225 7.97c-3.12 6.477-7.315 12.534-12.441 18.132-15.654 17.07-37.508 23.533-46.882 18.092-10.12-5.873-5.047-29.943 13.084-49.11 19.52-20.635 47.602-33.902 47.602-33.902l-.039-.08 2.465-1.35z" fill="#ec407a" stroke="#ec407a" stroke-width="16.287"/></svg>',
  md: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 15.75v-8h2l3 3 3-3h2v8h-2v-5.17l-3 3-3-3v5.17h-2m14-8h3v4h2.5l-4 4.5-4-4.5h2.5z" fill="#42a5f5"/></svg>',
  svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.13 10.71h3.74L6.22 8.06c-1.01 0-1.83-.82-1.83-1.84a1.83 1.83 0 0 1 1.83-1.83c1.02 0 1.84.82 1.84 1.83l2.65 2.65V5.13a1.84 1.84 0 0 1 0-2.59 1.81 1.81 0 0 1 2.58 0c.71.71.71 1.87 0 2.59v3.74l2.66-2.65a1.83 1.83 0 0 1 3.66 0c0 1.02-.82 1.84-1.83 1.84l-2.65 2.65h3.74a1.84 1.84 0 0 1 2.59 0c.72.71.72 1.87 0 2.58-.71.71-1.87.71-2.59 0h-3.74l2.65 2.66c1.01 0 1.83.81 1.83 1.83a1.83 1.83 0 0 1-1.83 1.83c-1.02 0-1.83-.82-1.83-1.83l-2.66-2.65v3.74c.71.72.71 1.88 0 2.59-.71.72-1.87.72-2.58 0a1.84 1.84 0 0 1 0-2.59v-3.74l-2.65 2.65c0 1.01-.82 1.83-1.84 1.83a1.83 1.83 0 0 1 0-3.66l2.65-2.66H5.13c-.72.71-1.88.71-2.59 0a1.81 1.81 0 0 1 0-2.58 1.84 1.84 0 0 1 2.59 0z" style="fill:#ffb300"/></svg>',
  document:
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2h9m3-4v-2H6v2h12z" fill="#42a5f5"/></svg>',
  folder:
    '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.097.903 2 2 2h16c1.097 0 2-.903 2-2V8a2 2 0 0 0-2-2h-8l-2-2z" fill="#4caf50" fill-rule="nonzero"/><path d="M15.597 21.678a.637.637 0 0 1-.147-.018.739.739 0 0 1-.513-.857l1.915-10.2a.734.734 0 0 1 .314-.482.63.63 0 0 1 .495-.087.74.74 0 0 1 .513.858l-1.92 10.2a.73.73 0 0 1-.312.481.632.632 0 0 1-.345.105zm3.839-1.445h-.048a.658.658 0 0 1-.472-.267.78.78 0 0 1 .07-1.003l3.293-3.218L19 12.75a.78.78 0 0 1-.1-1 .663.663 0 0 1 .467-.283.636.636 0 0 1 .501.167l3.866 3.534a.78.78 0 0 1 .102 1 .743.743 0 0 1-.1.116l-3.85 3.763a.646.646 0 0 1-.451.187zm-5.764.002a.648.648 0 0 1-.451-.189l-3.854-3.765a.775.775 0 0 1 .006-1.108l3.867-3.533a.623.623 0 0 1 .495-.169c.19.022.361.125.47.283a.78.78 0 0 1-.099 1.002l-3.277 2.993 3.293 3.216c.266.27.297.699.07 1.003a.656.656 0 0 1-.472.267z" fill-rule="nonzero" fill="#c8e6c9"/></svg>',
  theme:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>',
  check:
    '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>',
  copy: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" /></svg>',
};
