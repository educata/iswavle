---
title: 'ივენთები'
description: 'ივენთების გამოყენება JavaScript-ში'
keywords: 'events, listen event, ივენთი, ივენთზე მოსმენა, addEventListener, removeEventListener, ივენთის მოსმენის გათიშვა, ივენთების ჩამონათვალი, event list, event table, abort, animationend, animationiteration, animationstart, auxclick, blur, change, click, contextmenu, copy, dbclick, drag, dragend, dragenter, dragleave, dragover, dragstart, drop, focus, focusin, focusout, input, keydown, keyup, load, mousedown, mouseup, mouseenter, mouseleave, mouseout, paste, reset, resize, scroll, select, submit, transitionend, wheel'
---

`Event` არის მოვლენა, რომელიც მოხდა რაღაც მოქმედებისგან გამომდინარე. მაგალითად როცა რომელიმე HTML-ს ელემენტს ვაკლიკებთ
ეს არის `'click'` ივენთი. დაკლიკების გარდა კიდევ ბევრი ივენთი გვაქვს, რომლის ნაწილსაც ამ თავში განვიხილავთ.

## ივენთზე მოსმენა

როდესაც მომხარებელი შეასრულებს რაიმე ივენთს თუნდაც დაკლიკებას, ჩვენ გვჭირდება კონკრეტულ ელემენტზე მოსმენა. მოსმენაში
იგუსლიხმება, რომ როდესაც მოხდება დაკლიკება ჩვენი ფუნქცია უნდა გავუშვათ, რის მიხედვითაც რაიმე მოქმედებებს გავაკეთებთ,
იმისათვის რომ ივენთს მოვუსმინოთ საჭიროა პირველ რიგში ეს ელემენტი ამოვიღოთ.

მაგალითისთვის შევქმნათ HTML-ში ღილაკი:

```html
<button>შეტყობინების გამოტანა</button>
```

ამოვიღოთ ეს ელემენტი JavaScript-ს მხარეს:

```js
const button = document.querySelector('button');
```

მსგავს ტიპად წარმატებით ამოვიღებთ ელემენტს, ეხლა კი საჭიროა დავუმატოთ ივენთის მომსმენი, ამის შესრულება კი შეიძლება სამი გზით:

- პირდაპირ HTML-შივე გავუწერთო ივენთის მომსმენი.
- JavaScript-ს მხარეს უკვე ამოღებულ ელემენტზე გავწეროთ [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
- JavaScript-ს მხარეს უკვე ამოღებულ ელემენტზე გავწეროთ შესაბამისი ივენთის დასახელების მომსმენი.

```html
<button onclick="logText()">შეტყობინების დალოგვა</button>
```

```js
button.addEventListener('click', logText);
button.onclick = logText;

function logText() {
  console.log('ღილაკზე დაეკლიკა');
}
```

სამივე მიდგომა დალოგავს ტექსტს `'ღილაკზე დაეკლიკა'`, თუმცა ჩნდება კითხვა: რომელი არის ყველაზე ეფექტური მიდგომა ?
შედეგი სამივე მიდგომისთვის კი იგივე არის მაგრამ უფრო მოსახერხებელი არის `addEventListener`. `addEventListener` გამოყენებით
შესაძლებელია დამატებითი [პარამეტრების](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) გადაცემა,
შედარებით უფრო დინამიურად გამოყენება და დაკავშირებული ივენთის მოხსნაც იგივე ლოგიკით ხდება, როგორც დაემატა.

## პარამეტრი

თითოეულ ივენთის მომსმენს სჭირდება ფუნქცია თუ რის მიხედვით გაეშვება კოდი. ამ ფუნქციას ყოველთვის შეგვიძლია გავაყოლთ 1 პარამეტრი,
ეს ერთი პარამეტრი არის [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) ტიპის, სადაც ბევრი კარგი მეთოდი და თვისება არის
ჩაშენებული.

```html
<button>ივენთის გამოძახება</button>
```

```js
const button = document.querySelector('button');

button.addEventListener('click', function (event) {
  console.log(event, this);
});

button.addEventListener('click', (event) => {
  console.log(event, this);
});
```

ამ შემთხვევაში ამოვიღეთ HTML-დან პირველი `button` და მასზე დავამატეთ ორი ივენთის მომსმენი, ორივეგან გავაყოლეთ პარამეტრში `event`, რომელიც
სურვილისამებრ შეიძლება ავღწეროთ ისივე, როგორც მასივის [`callback`](./doc/guides/javascript/array#callbackFn_როგორც_მასივის_პარამეტრი) ფუნქციებში ხდება.
ორივე ფუნქცია დალოგავს `event` პარამეტრს და ასევე `this`. `this` ორივე შემთხვევაში განსხვავებული იქნება, წინა სტატიებში ([რა არის This ?](./doc/guides/javascript/object-basics#რა_არის_This_?)) განვიხილეთ `this` განსხვავება სამომხარებლო და `arrow` ფუნქციებში. სამომხარებლო ფუნქციის (`function`) `this` არის ლოკალური
კონტექსტის მატარებელი, გვიბრუნებს იმ ობიექტს, რომელზეც მოხდა ფუნქციის გამოძახება, ჩვენს შემთხვევაში `button`, ხოლო `arrow` ფუნქციაში `this` წარმოადგენს გლობალურ
კონტექტის მნიშვნელობას.

`arrow` ფუნქცია ჯობია გამოიყენოთ მაშინ, როცა გსურთ უბრალოდ `callback` ფუნქციის აღწერა და არ გჭირდება `this` გამოყენება, ხოლო სამომხარებლო ფუნქცია ჯობია
მაშინ გამოიყენოს როცა გჭირდებათ `this`.

## ივენთის მოსმენის გათიშვა

წინა მაგალითებში რამდენჯერაც დავწერეთ `addEventListener` იმდენჯერ დავაკავშირეთ რაღაც ფუნქცია დაკლიკებასთან. დაკლიკების შემთხვევაში ყოველ ჯერზე ყოველი ფუნქცია
გაეშვება. ზოგჯერ გვჭირდება არსებულ ელემენტებზე ივენთის მოსმენის გათიშვა, ამისათვის კი გამოიყენება [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener), ან შეგვიძლია `addEventListener` `options` პარამეტრებში გავატანოთ `{ once: true }`, რისი გამოყენებითაც ჩვენი ივენთი მხოლოდ ერთხელ
მოისმინება და შემდგომ მოხდება ივენთის მოსმენის გათიშვა. თუ ვიცით რომ რაღაც დროის შემდგომ ელემენტზე ივენთის მოსმენა უნდა შევწყვიტოთ მაშინ **აუცილებელია**
`callback` ფუნქცია აღვწეროთ ცალკე ცვლადში

განვიხილოთ ივენთის მოსმენის გათიშვის მაგალითი:

<!-- prettier-ignore -->
```html
<button id="logBtn">ლოგში შეტყობინების გამოტანა</button>
<button id="removeListenerBtn">პირველი ღილაკის ივენთის მომსმენის გათიშვა</button>
```

```js
const logBtn = document.querySelector('#logBtn');
const removeListenerBtn = document.querySelector('#removeListenerBtn');

logBtn.addEventListener('click', handleClick);

removeListenerBtn.addEventListener('click', () => {
  console.log('გაითიშა დამლოგავი ღილაკის ივენთის მოსმენა');
  logBtn.removeEventListener('click', handleClick);
});

function handleClick() {
  console.log('რაღაც საინტერესო ტექსტი');
}
```

მაგალითიდან ჩანს სანამ მეორე ღილაკს დავაწვებით მანამდე პირველი ღილაკი ლოგავს ტექსტს, მაგრამ როგორც კი მეორე ღილაკს დავაკლიკებთ მისი ივენთის მოსმენა ითიშება.
`removeEventListener` იგივე ნაირად ღებულბოს პარამეტრებს, როგორც `addEventListener`.

## ივენთების ჩამონათვალი

JavaScript-ში საკმაოდ ბევრი კარგი ჩაშენებული ივენთი არის, განვიხილოთ ისინი:

| ივენთის სახელი                                                                                            | ივენთის ფუნქციის სახელი | ივენთის ტიპი                                                                          | აღწერა                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`abort`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event)                  | `onabort`               | [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)                     | გაეშვება მაშინ როცა რესურსი/სკრიპტი სრულიად ჩატვირთული არ არის მაგრამ არც ერორი არ გვაქვს                                                                                                                                                                              |
| [`animationend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)             | `onanimationend`        | [`AnimationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent)   | გაეშვება მაშინ როცა CSS ანიმაცია შესრულდება                                                                                                                                                                                                                            |
| [`animationiteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event) | `onanimationiteration`  | [`AnimationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent)   | გაეშვება მაშინ როცა CSS ანიმაცია თავიდან დაიწყებს იტერაციას (გაშვებას)                                                                                                                                                                                                 |
| [`animationstart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event)         | `onanimationstart`      | [`AnimationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent)   | გაეშვება მაშინ როცა CSS ანიმაცია დაიწყება                                                                                                                                                                                                                              |
| [`auxclick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event)                     | `onauxclick`            | [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)       | გაეშვება მაშინ როცა არამთავარ (სქროლის ან მარჯვენა) მაუსის ღილაკზე მოხდება დაკლიეკბა                                                                                                                                                                                   |
| [`blur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event)                             | `onblur`                | [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent)           | გაეშვება მაშინ როცა ელემენტი დაკარგავს ფოკუს                                                                                                                                                                                                                           |
| [`change`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)                     | `onchange`              | [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)                     | გაეშვება მაშინ `<input>`, `<select>` ან `ტეხტარეა` შეიცვლის მნიშვნელობას და ელემენტი დაკარგავს ფოკუს ან როცა მომხარებელი შეცვლის მნიშვნელობას                                                                                                                          |
| [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)                           | `onclick`               | [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)       | გაეშვება მაშინ როცა ელემენტზე მოხდება დაკლიკება                                                                                                                                                                                                                        |
| [`contextmenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event)               | `oncontextmenu`         | [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)       | გაეშვება მაშინ როცა მაუსის მარჯვენა ღილაკით მოხდება დაკლიკება (კონტექსტური მენიუსთვის განკუთვნილი ღილაკით)                                                                                                                                                             |
| [`copy`](https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event)                             | `oncopy`                | [`ClipboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent)   | გაშვება მაშინ როცა მომხარებელი აკოპირებს ტექსტს ელემენტიდან                                                                                                                                                                                                            |
| [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event)                     | `ondblclick`            | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მოხდება ელემენტზე ორჯერ დაკლიკება                                                                                                                                                                                                                  |
| [`drag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event)                         | `ondrag`                | [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)             | გაეშვება მაშინ როცა ელემენტის გადაადგილება დაიწყო                                                                                                                                                                                                                      |
| [`dragend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event)                   | `ondragend`             | [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)             | გაეშვება მაშინ როცა გადაადგილების ოპერაცია დასრულდა (მაგალთად: მომხარებელმა მაუს ხელი აუშვა ან დააჭირა ესქეიპ ღილაკს) დაიწყო                                                                                                                                           |
| [`dragenter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event)               | `ondragenter`           | [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)             | გაეშვება მაშინ როცა ელემენტი ან არჩეული ტექსტი შედის ვალიდურ გადაადგილების არეალში                                                                                                                                                                                     |
| [`dragleave`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragleave_event)               | `ondragleave`           | [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)             | გაეშვება მაშინ როცა ელემენტი ან არჩეული ტექსტი გამოდის ვალიდური გადაადგილების არეალიდან                                                                                                                                                                                |
| [`dragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event)                 | `ondragover`            | [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)             | გაეშვება მაშინ როცა ელემენტი დაიტოვება ვალიდურ გადასაადგილებელ ადგილას                                                                                                                                                                                                 |
| [`dragstart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event)               | `ondragstart`           | [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)             | გაეშვება მაშინ როცა ელემენტის გადაადგილების ოპერაცია დაიწყო (ელემენტის ან ტექსტის გადაადგილებით)                                                                                                                                                                       |
| [`drop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event)                         | `ondrop`                | [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent)             | გაეშება მაშინ როცა ელემენტი გადაადგილების დროს დავტოვებთ ვალიდურ ადგილას                                                                                                                                                                                               |
| [`focus`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)                           | `onfocus`               | [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent)           | გაეშვება მაშინ როცა ელემენტი ფოკუსის არეალში მოექცევა                                                                                                                                                                                                                  |
| [`focusin`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event)                       | არ აქვს                 | [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent)           | გაეშვება მაშინ როცა ელემენტმა ესესაა უნდა მიღოს ფოკუსი                                                                                                                                                                                                                 |
| [`focusout`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event)                     | არ აქვს                 | [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent)           | გაეშვება მაშინ როცა ელემენტმა ესესაა უნდა დაკარგოს ფოკუსი                                                                                                                                                                                                              |
| [`input`](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)                           | `oninput`               | [`InputEvent`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent)           | გაეშვება სინქრონულად როცა ელემენტის მნიშვნელობა იცვლება (`<input>`, `<select>` ან `<textarea>`)                                                                                                                                                                        |
| [`keydown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)                       | `onkeydown`             | [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)     | გაეშვება მაშინ როცა კლავიშზე მოხდა დაკლიკება (ეს მეთოდი არის [`keypress`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event) გაუმჯობესებული ვერსია, `keypress`-ს გამოყენება აღარ არის პრაქტიკაში მიღებული, გამოცხადებულია როგორც **Deprecated**) |
| [`keyup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event)                           | `onkeyup`               | [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)     | გაეშვება მაშინ როცა კლავიშიდან ხელს ავიღებთ (აღარ ხდება დაჭერა)                                                                                                                                                                                                        |
| [`load`](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event)                              | `onload`                | [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)                     | გაეშვება მაშინ როცა მთლიანი გვერდი ჩაიტვირთება, იგულისხმება ყოველი დამოკიდებული რესურსი (სტილები, სკრიპტები, სურათები, `iframe`)                                                                                                                                       |
| [`mousedown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event)                   | `onmousedown`           | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მაუსის ღილაკზე დაკლიკებულია                                                                                                                                                                                                                        |
| [`mouseup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event)                       | `onmouseup`             | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მაუსის ღილაკზე დაკლიკება შეწყდება                                                                                                                                                                                                                  |
| [`mouseenter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event)                 | `onmouseenter`          | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მოხდება ელემენტზე მაუსის გადატარება ხილვად არეალზე (`:hover` მსგავსად)                                                                                                                                                                             |
| [`mouseleave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event)                 | `onmouseleave`          | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მაუსი დატოვებს ელემენტის ხილვად არეალს (`:hover` საპირისპიროდ)                                                                                                                                                                                     |
| [`mousemove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)                   | `onmousemove`           | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მოხდება ელემენტის შიგნით მაუსის გამოძრავება                                                                                                                                                                                                        |
| [`mouseout`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event)                     | `onmouseout`            | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მაუსი დატოვებს ელემენტს                                                                                                                                                                                                                            |
| [`mouseover`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event)                   | `onmouseover`           | [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)           | გაეშვება მაშინ როცა მოხდება მაუსის გადატარება ელემენტზე ან მის შვილობილ ელემენტებზე                                                                                                                                                                                    |
| [`paste`](https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event)                           | `onpaste`               | [`ClipboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent)   | გაეშვება მაშინ როცა მოხდება კონტენტის ჩასმა ელემენტში (paste)                                                                                                                                                                                                          |
| [`reset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event)                   | `onreset`               | [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)                     | გაეშვება მაშინ როცა მოხდება ფორმის დარესეტება (ყველაფრის ნაგულისხმევ მნიშვნელობაზე დაბრუნება)                                                                                                                                                                          |
| [`resize`](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event)                          | `onresize`              | [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)                     | გაეშვება მაშინ როცა მოხდება `window` ზომის ცვლილება                                                                                                                                                                                                                    |
| [`scroll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event)                        | `onscroll`              | [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)                     | გაეშვება მაშინ როდესაც მოხდება სქროლი (ზემოთ ასვლა ან ქვემოთ ჩამოსვლა)                                                                                                                                                                                                 |
| [`select`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event)                | `onselect`              | [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)                     | გაეშვება მაშინ როცა მოხდება ტექსტი ინიშნება                                                                                                                                                                                                                            |
| [`submit`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)                 | `onsubmit`              | [`SubmitEvent`](https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent)         | გაეშვება მაშინ როცა მოხდება ფორმის დადასტურება (დასრულება)                                                                                                                                                                                                             |
| [`transitionend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)           | `ontransitionend`       | [`TransitionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent) | გაეშვება მაშინ როცა მორჩება CSS transition                                                                                                                                                                                                                             |
| [`wheel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event)                           | `onwheel`               | [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent)           | გაეშვება მაშინ როცა მომხარებელი დაატრიალებს მაუსის შუა ღილაკს (წააგავს `scroll` ივენთს თუმცა გააჩნია განსხვავებები დელტა თვისების ცვილებებში და სხვა თვისებებშიც)                                                                                                      |

რეალურად ამ ცხრილში არ არის სრულიად ჩამოთვლილი ივენთის მეთოდები, თუმცა არის ძირითადი ნაწილი რაც შესაძლოა დაგჭირდეთ ვებგვერდზე მუშაობის დროს.

## შეჯამება

JavaScript გააჩნია ბევრი ჩაშენებული ივენთი სხვადასხვა სიტუაციებისთვის. იმისათვის, რომ რომელიმე ელემენტზე რაიმე ივენთს მოვუსმინოთ საჭიროა ჯერ ამ ელემენტის ამოღება
და შემდგომ მასზე ივენთის მიბმა, თუ ვაპირებთ რაღაც პერიოდის მერე ივენთის მოსმენის გაუქმებას, საჭიროა ცალკე ფუნქციაში ავღწეროთ და არ გადავცეთ პირდაპირ, როგორც `callback`
ფუნქცია. ხშირ შემთხვევაში ჯობია `addEventListener` გამოყენება ვიდრე HTML-დან ან პირდაპირ ელემენტზე ფუნქციის სახელით გამოძახება, რადგან მსგავს ტიპად უფრო მეტ ოპციაზე
გვაქვს წვდომა

იხილეთ სამაგალითო კოდები [playground](./playground/guides/javascript-dom-events)-ში.
