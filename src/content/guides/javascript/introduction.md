---
title: 'შესავალი'
description: 'JavaScript მცირედი მიმოხილვა'
keywords: 'js, javascript, ჯავასკრიპტი, jit, first-class, node.js, apache couchdb, adobe acrobat, single-threaded, oop, framework, library, ecmascript'
---

## რა არის JavaScript

JavaScript (JS) არის ინტერპრეტირებადი ან [just-in-time](https://en.wikipedia.org/wiki/Just-in-time_compilation) (JIT) კომპილირებადი პროგრამული ენა,
რომელიც არის [first-class](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) ფუნქციებით სავსე. JavaScript ცნობილია, როგორც ვებგვერდებისთვის სკრიპტულიენა,
ასევე ხშირად გამოიყენება როგორც არა ვებგვერდისთვის, არამედ [Node.js](https://developer.mozilla.org/en-US/docs/Glossary/Node.js?retiredLocale=hu&language=hu), [Apache CouchDB](https://couchdb.apache.org/) და [Adobe Acrobat](https://opensource.adobe.com/dc-acrobat-sdk-docs/acrobatsdk/). ჯავასკრიპტი არის ერთ ნაკადიანი ([single-threaded](https://developer.mozilla.org/en-US/docs/Glossary/Thread)),
დინამიური ენა , რომელსაც მხარდაჭერა გააჩნია ობიეტზე-ორიენტირება([OOP](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)) და ასევე ფუნქციონალური პროგრამირების სტილი.
ზოგადად ნებისმიერ ენაზე დაწერილი პროგრამა შესრულდება ხდება ორ ვარიანტად: კომპილირებად ან ინტერპრეტირებად. კომპილაცია არის პროცესი,
როდესაც პროგრამული კოდი სხვა პროგრამის სპეციალური ინსტრუმენტის ე.წ კომპილატორის დახმარებით გადაიწერება პროცესორისთვის და სრულდება.
ინტერპრეტაცია არის პროცესი , როდესაც პროგრამული კოდი გადაეცემა ინტერპრეტატორს, რომელიც კოდში მითითებულ ინსტრუქციებს ასრულებს კომპილაციის გარეშე.
JavasScript არის პროგრამირების ინტერპრეტატორული ენა, მისი კოდს არ სჭირდება კომპილაცია, ის სერვერზე გაშვებისას ავტომატურად სრულდება.

## სად გამოიყენება JavaScript

JavaScript შესაძლებელია გამოვიყენოთ, როგორც კლიენტის მხარეს ასევე სერვერის მხარესაც. კლიენტის მხარეს სხვადასხვა ტიპის ინფორმაციის დამუშავებისათვის შეგვიძლია გამოვიყენოთ [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), ასევე [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) და სერვერთან დაკავშირებისთვის [API](https://developer.mozilla.org/en-US/docs/Glossary/API). JavaScript-ზე დაყრდნობით შეიქმნა, არაერთი ბიბლიოთეკა([Library](<https://en.wikipedia.org/wiki/Library_(computing)>)) და ფრეიმვორკი([Framework](https://en.wikipedia.org/wiki/Software_framework)), რაც დეველოპერებს ეხმარება სხვადასხვა ტიპის ვებგვერდების აწყობაში. სერვერის მხარეს Node.js დაყრდნობით, შესაძლებელი გახდა სხვადასხვა ტიპის API სერვისების აწყობა, რაც შემდეგ ისევ გამოიყენება კლიენტის მხარეს.

## JavaScript-ის სტანდარტი

JavaScript-ის სტანდარტი არის [ECMAScript Language Specification](https://tc39.es/ecma262/) და [ECMAScript Internationalization API specification](https://tc39.es/ecma402/).
ხშირია შემთხვევა, როცა დამწყები დეველოპერი JavaScript მოიხსენიებს, როგორც [Java](<https://en.wikipedia.org/wiki/Java_(programming_language)>). Java სრულიად სხვა პროგრამირების ენა არის.
