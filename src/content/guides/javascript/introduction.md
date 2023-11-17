---
title: 'JavaScript-ის შესავალი'
description: 'JavaScript მცირედი მიმოხილვა'
keywords: 'js, javascript, ჯავასკრიპტი, jit, first-class, node.js, apache couchdb, adobe acrobat, single-threaded, oop, framework, library, ecmascript'
headings:
  - რა არის JavaScript
  - სად გამოიყენება JavaScript
  - JavaScript-ის სტანდარტი
---

## რა არის JavaScript

JavaScript (JS) არის ინტერპრეტირებადი ან [just-in-time](https://en.wikipedia.org/wiki/Just-in-time_compilation) (JIT) კომპილირებადი პროგრამული ენა,
რომელიც არის [first-class](./references/javascript/first-class) ფუნქციებით სავსე. JavaScript ცნობილია, როგორც ვებ-გვერდებისთვის სკრიპტულიენა,
ასევე ხშირად გამოიყენება როგორც არა ვებ-გვერდისთვის, არამედ [Node.js](./references/javascript/node.js), [Apache CouchDB](https://couchdb.apache.org/) და [Adobe Acrobat](https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/). ჯავასკრიპტი არის ერთ ნაკადიანი ([single-threaded](./references/javascript/single-threaded)),
დინამიური ენა , რომელსაც მხარდაჭერა გააჩნია ობიეტზე-ორიენტირება([OOP](./references/javascript/oop)) და ასევე ფუნქციონალური პროგრამირების სტილი.
ზოგადად ნებისმიერ ენაზე დაწერილი პროგრამა შესრულდება ხდება ორ ვარიანტად: კომპილირებად ან ინტერპრეტირებად. კომპილაცია არის პროცესი,
როდესაც პროგრამული კოდი სხვა პროგრამის სპეციალური ინსტრუმენტის ე.წ კომპილატორის დახმარებით გადაიწერება პროცესორისთვის და სრულდება.
ინტერპრეტაცია არის პროცესი , როდესაც პროგრამული კოდი გადაეცემა ინტერპრეტატორს, რომელიც კოდში მითითებულ ინსტრუქციებს ასრულებს კომპილაციის გარეშე.
JavasScript არის პროგრამირების ინტერპრეტატორული ენა, მისი კოდს არ სჭირდება კომპილაცია, ის სერვერზე გაშვებისას ავტომატურად სრულდება.

## სად გამოიყენება JavaScript

JavaScript შესაძლებელია გამოვიყენოთ, როგორც კლიენტის მხარეს ასევე სერვერის მხარესაც. კლიენტის მხარეს სხვადასხვა ტიპის ინფორმაციის დამუშავებისათვის შეგვიძლია გამოვიყენოთ [DOM](./referenecs/javascript/dom), ასევე [Web APIs](./references/javascript/web-api) და სერვერთან დაკავშირებისთვის [API](./reference/javascript/api). JavaScript-ზე დაყრდნობით შეიქმნა, არაერთი ბიბლიოთეკა([Library](./references/javascript/library)) და ფრეიმვორკი([Framework](./references/javascript/framework)), რაც დეველოპერებს ეხმარება სხვადასხვა ტიპის ვებ-გვერდების აწყობაში. სერვერის მხარეს Node.js დაყრდნობით, შესაძლებელი გახდა სხვადასხვა ტიპის API სერვისების აწყობა, რაც შემდგომ ისევ გამოიყენება კლიენტის მხარეს.

## JavaScript-ის სტანდარტი

JavaScript-ის სტანდარტი არის [ECMAScript Language Specification](https://tc39.es/ecma262/) და [ECMAScript Internationalization API specification](https://tc39.es/ecma402/).
ხშირია შემთხვევა, როცა დამწყები დეველოპერი JavaScript მოიხსენიებს, როგორც [Java](<https://en.wikipedia.org/wiki/Java_(programming_language)>). Java სრულიად სხვა პროგრამირების ენა არის.
