---
title: "შეჯამება"
---

# შეჯამება

ამ გაკვეთილში ჩვენ ვისწავლეთ RxJS-ის დახმარებით მარტივი აპლიკაციის სთეითის მართვა,
სადაც აპლიკაციის სთეითის კონკრეტული ნაწილები არიან საბჯექთები, რომლებსაც რაღაც
მოვლენების მიხედვით გავაცემინებთ ახალ მნიშვნელობებს. სთეითიდან ინფორმაციას ვიღებთ
`observable`-ების ფორმით და მათზე ვასუბსქრაიბებთ თემფლეითში `async` ფაიფის მეშვეობით.
ეს უზრუნველყოფს იმას, რომ `unsubscribe` ავტომატურად მოხდება და, ამასთანავე, თუ
`changeDetection` სტრატეგიას შევცვლით `OnPush`-ზე, ანგულარი აპლიკაციის view-ს მხოლოდ იმ
შემთხვევაში დაარენდერებს ხელახლა, თუ `async` ფაიფში გატარებული სტრიმები ახალ
მნიშვნელობას გასცემენ, შედეგად რესურსების ეკონომიას ვაკეთებთ. ჩვენ ასევე შევქმენით
ერთიანი `vm$` სტრიმი, რომელიც სთეითის სხვადასხვა ნაწილს აერთიანებს და კომპონენტში
მხოლოდ ამ ერთ სტრიმზე დავასუბსქრაიბეთ. ეს არ არის აუცილებელი მიდგომა, თუმცა
კარგია ზოგჯერ სტრიმების ლოგიკურად დაჯგუფება. შესაძლებელია რომ აპლიკაციის
თითოეულ გვერდს ჰქონდეს თავისი უნიკალური View Model სტრიმი.

ამ აპლიკაციის ბევრნაირად გაუმჯობესება არის შესაძლებელი, რაც ახლა დამოუკიდებლად
შეგიძლიათ გააკეთოთ:

- ნივთებიისთვის შექმნის თარიღის შესახებ ინფორმაციის მინიჭება
- ნივთების სიაში სათაურის მოდიფიკაციის საშუალება
- ნივთების სიის გაფილტვრა მათი სტატუსის მიხედვით (Routing Params-ის გამოყენებით)

[ამ ბმულზე ნახავთ დასრულებული კოდის ნიმუშს.](https://github.com/CondensedMilk7/basic-rxjs-state-management/tree/ng17)