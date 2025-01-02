---
title: 'Audio'
description: 'Audio კლასი JavaScript-ში'
keywords: 'window, audio, play, volume'
---

[`Audio`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio) კლასი JavaScript-ში გამოიყენება ვებგვერდზე აუდიო ფაილის ჩასართავად ან ხმის კონტროლისთვის.

## წყაროსთან დაკავშირება

ვებგვერდზე ხმის გასაშვებად პირველ რიგში საჭიროა წყაროს მითითება, თუ რა აუდიო ან ხმა უნდა გაეშვას ვებგვერდზე. წყაროსთან დაკავშირება შესაძლებელია, რამდენიმე გზით:

1. კონსტრუქტორის გამოყენებით.
2. [`src`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src) თვისების გამოყენებით.

```js
const audio = new Audio('https://iswavle.com/assets/audio/cat_meow.wav');
const audio2 = new Audio();
audio2.src = 'https://iswavle.com/assets/audio/dog_bark.wav';
```

## ხმის გაშვება

ხმის ჩასართავად გამოიყენება [`play`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) მეთოდი,
ხოლო დასაპაუზებლად [`pause`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause)

```js
const audio = new Audio('https://iswavle.com/assets/audio/cat_meow.wav');
audio.play();

setTimeout(() => audio.pause(), 1000);
```

## ხმის დონე

ხმის დონის დასარეგურილებლად საჭიროა [`volume`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume) თვისების გამოყენება.

```js
const audio = new Audio('https://iswavle.com/assets/audio/dog_bark.wav');
audio.volume = 0.22;
audio.play();
```

:::info
ხმის დონე განისაზღვრება 0-დან 1-ის ჩათვლით.
:::

<iframe data-url="guides/javascript-audio" data-title="Audio-s მაგალითი" data-height="530"></iframe>

## შეჯამება

აუდიო ელემენტის გასამართად JavaScript-ში გამოიყენება `Audio` კლასი.
