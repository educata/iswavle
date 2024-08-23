---
title: 'შეჯამება'
description: 'REST API-ს შეჯამება JavaScript-ში'
keywords: 'CRUD, rest, rest api, api, get, post, put, patch, delete, create, read, update, delete, fetch, xml, xhr, XMLHttpRequest, sockets, websockets, http, https'
---

წინა სტატიებიდან შევისწავლეთ, რომ საიტზე დინამიურობისთვის საჭიროა სერვერთან კომუნიკაცია. სერვერთან კომუნიკაცია შეიძლება სხვადასხვა მეთოდებით თუმცა ხშირ შემთხვევაში გამოიყენება REST API.

REST API ეს არის გზა, რომ სერვერთან გავაგზავნოთ HTTP მოთხოვნა. მოთხოვნები გვაქვს 5 სახის:

1. `GET` - მონაცემების მიღების მოთხოვნა.
2. `POST` - მონაცემების გაგზავნის / ჩაწერის მოთხოვნა.
3. `PUT` - მონაცემების სრულიად განახლების მოთხოვნა.
4. `PATCH` - მონაცემების ნაწილობრივ განახლების მოთხოვნა.
5. `DELETE` - მონაცემების წაშლის მოთხოვნა.

`GET` გარდა ყოველ მოთხოვნას შეიძლება გავაყოლოთ `body` ობიექტი.

REST API არ არის **ერთადერთი** გზა სერვერთან კომუნიკაციისთვის, გვაქვს სხვადასხვა ალტერნატივებიც: [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [GraphQL](https://graphql.org/) და სხვა.

REST API-თ გამოყენებით შეგვიძლია ავაწყოთ CRUD-ს ტიპის აპლიკაცია. CRUD-ს ტიპში იგულისხმება ისეთი აპლიკაცია, სადაც შესასრულებელია შემდგომი მოქმედებები:

- **C**reate - შექმნა.
- **R**ead - წაკითხვა.
- **U**update - განახლება.
- **D**elete - წაშლა.

კლიენტის მხრიდან განვიხილეთ ორი გზა თუ როგორ შეიძლება კომუნიკაცია სერვერთან:

- [`XMLHttpRequest`](./doc/guides/javascript/rest-api/xhr)
- [`fetch`](./doc/guides/javascript/rest-api/fetch)

ორივე მიდგომას თავისი დადებითი და უარყოფითი მხარეები გააჩნია თუმცა რეკომენდირებულია უკეთესი შედეგისთვის `fetch`-ს გამოყენება, რადგან უფრო სწრაფი მიდგომა არის ვიდრე `XMLHttpRequest`.

ასევე განვიხილეთ [Swagger](./doc/guides/javascript/rest-api/practice#swagger), [Postman](./doc/guides/javascript/rest-api/practice#postman) და [Insomnia](./doc/guides/javascript/rest-api/practice#insomnia). ამ აპლიკაციების დანიშნულება არის, კოდის გარეშე მოთხოვნის გაგზავნა სერვერთან, რაც Front-end დეველოპერს უმარტივებს მუშაობს, რადგან ეცნობა თუ როგორ მუშაობს Back-end დეველოპერის მიერ დაწერილი endpoint-ები, ასევე Back-end დეველოპერსაც ეძლევა საშუალება გატესტთვის.
