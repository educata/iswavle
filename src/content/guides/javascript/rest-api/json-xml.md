---
title: 'JSON & XML'
description: 'რა არის JSON & XML ?'
keywords: 'sitemap, parse, stringify'
---

სერვერთან კომუნიკაციის დროს ინფორმაციის მიწოდება და მიღება შეიძლება შესრულდეს ბევრი მეთოდი.
ეს მეთოდებია:

- ტექსტური
- JSON
- XML
- ფაილი
- ბინარული ინფორმაცია
- ფორმის ინფორმაცია

თითოეულ მეთოდს თავისი გამოყენების სწორი დრო აქვს, თუმცა ყველაზე ფართოდ მაინც 2 მეთოდი გამოირჩევა: JSON და XML.

## JSON

[JSON](https://www.json.org/json-en.html) (JavaScript Object Notation) ეს არის ჯავასკრიპტის ობიექტი, რომელიც მოცემულია სტრინგის ფორმატში. JSON არის მარტივი წასაკითხი ობიექტი, რომელიც შეიძლება გამოვიყენოთ ინფორმაციის გასაგზავნად და შესანახად.

JSON გააჩნია ორი მეთოდი:

- [stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) - მეთოდი გამოიყენება ინფორმაციის JSON ფორმატში გადასატანად.
- [parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) - მეთოდი გამოიყენება JSON ფორამტიდან, სტანდარტულ ინფორმაციაში გადასატანად.

```js
const user = {
  name: 'john',
  lastName: 'doe',
};

const stringOfUser = JSON.stringify(user);
const objectFromString = JSON.parse(stringOfUser);

console.log(user, typeof user); // { name: 'john', lastName: 'doe' } object
console.log(stringOfUser, typeof stringOfUser); // {"name":"john","lastName":"doe"} string
console.log(objectFromString, typeof objectFromString); // { name: 'john', lastName: 'doe' } object
```

ამ ორი მარტივი მეთოდის გამოყენებით შეგვიძლია ინფორმაცია გადავიტანოთ სტრინგის ფორმატში ან პირიქით სტრინგიდან თავდაპირველ მნიშვნელობაში.

## XML

[XML](https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction) (Extensible Markup Language) ეს არის მარკირების ენა, როგორც HTML მაგრამ წინასაწრ აღწერილი თაგების გარეშე. XML-ში საკუთარ თაგებს თვითონ ქმნი, რომელიც შემდგომ შემდგომ გამოიყენება ინფორმაციის წასაკითხად / ჩასაწერად. ეს არის ერთ-ერთი ძლიერი გზა, რომელიც შეგიძლიათ გამოიყენოთ: ინფორამციის შესანახად, მოსაძებნად და გასაზიარებლად.

ბევრი ენა არის XML-ზე დაშენებული, როგორებიცა: [XHTML](https://developer.mozilla.org/en-US/docs/Glossary/XHTML), [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML), [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG), [RSS](https://developer.mozilla.org/en-US/docs/Glossary/RSS), და [RDF](https://developer.mozilla.org/en-US/docs/Glossary/RDF). ასევე შეგიძლიათ თქვენი ენის აღწერაც.

XML-ს სტრუქტურა მარტივია, პირდაპირი გაგებით თეგებია HTML-ს მსგავსად. თავსართად საჭიროა ერთი თეგის გაწერა, თუ რომელი ვერსია არის XML-ს და როგორი ენკოდირება იქნება გამოყენებული.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<user>
  <name>john</name>
  <lastName>doe</lastName>
</user>
```

## რომელი ჯობია გამოვიყენოთ?

რეალურად ორივეს თავისი გამოყენების დრო აქვს. ინფორმაციის მიმონაცვლეობის დროს [REST API](./doc/guides/javascript/rest-api)-ში ჯობია გამოვიყენოთ JSON. JSON შედარებით ახალი და უფრო მარტივი გამოსაყენებელი არის ვიდრე XML. ადრე სანამ JSON არ იყო, ყოველი აპლიკაცია XML-ის გავლით მუშაობდა. დღემდეც არის ძველი (Legacy) აპლიკაციები სადაც XML ისევ გამოიყენება.

XML-ს გამოყენება კარგია სქემებისთვის და სტრუქტურებისთვის. საძიებო სისტემებისთვის ისევ აქტიურად გამოიყენება XML გაფართოვების ფაილები, მაგალითისთვის შეგიძლიათ გახსნათ ნებისმიერი ვებგვერდი და შეეცადოთ მისი `sitemap.xml`-ს ფაილის პოვნას.

`sitemap` ეს არის ფაილი სადაც აღწერილია ინფორმაცია ვებგვერდის სხვადასხვა დეტალებზე, როგორიცა:

- გვერდი
- ვიდეო
- ფაილი

შეგიძლიათ ამავე ვებგვერდზე იხილოთ [sitemap-ის](https://iswavle.com/sitemap.xml) ფაილი.

## შეჯაემბა

ინფორმაციის მიმონაცვლეობა შესაძლებელია ბევრი მეთოდით, თუმცა ხშირად გამოიყენება JSON და XML. JSON ვიყენებთ REST API და მსგავსი სტრუქტურის ინფორმაციის მიმონაცვლეობისას, ხოლო საძიებო სისტემებისთვის და დაინდექსებისთვის, სადაც საჭიროა უფრო სტრუქტული ფაილი, ვიყენებთ XML-ს.
