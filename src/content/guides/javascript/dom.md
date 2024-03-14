---
title: 'შესავალი DOM-ში'
description: 'Document Object Model JavasScript-ში'
keywords: 'FILL LATER'
---

წინა სტატიებში ვიხილეთ **JavaScript**-ის გამოყენება, როგორც კონსოლის აპლიკაცია, თუმცა რეალურად JavaScript უფრო მეტი
შესაძლებლობები აქვს ვიდრე უბრალოდ კონსოლის აპლიკაცია. JavaScript-ში გვაქვს [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), რისი
გამოყენებითაც უკვე შეგვეძლება HTML ელემენტებზე წვდომა და მათი თვისებების ცვლილება. DOM იშიფრება, როგორც **D**ocumnet **O**bject **M**odel, რაც გულისხმობს თუ
როგორი ინტერფეისით არის წარმოდგენილი ვებში არსებული დოკუმენტები. ამ შეთხვევაში დოკუმენტი არის HTML რისი წარმოდგენაც შეიძლება სრულიად ობიექტებში.

## რა არის DOM ?

Document Object Model (დოკუმენტის ობიექტური მოდელი) არის პროგრამული ინტერფეისი ვებ დოკუმენტების. ის წარმოადგენს ვებგვერდს, რისი თანხლებითაც შესაძლებელია: დოკუმენტის სტრუქტურის, სტილიზაციის
და კონტენტის შეცვლა. უშუალოდ DOM წარმოადგენს დოკუმენტს, როგორც კვანძებად (nodes) და ობიექტებად. მსგავს ტიპად წარმოდგენა გვაძლევს საშუალებას, რომ სხვადასხვა პროგრამულმა
ენებმა მოახდინოს ვებგვერდის ცვლილება.

მაგალითისთვის განვიხილოთ DOM-ის ერთერთი ხშირად გამოყენებადი მეთოდი [`querySelectorAll`](./docs/guides/javascript/dom/selectors#querySelectorAll). მისი საშუალებით
შეგვიძლია ამოვიღოთ ყოველი ელემენტი.

```js
const paragraphs = document.querySelectorAll('p');
console.log(paragraphs); // დაილოგება ყოველი p ელემენტი
```

ყოველი თვისება, მეთოდი და ივენთები არის ობიექტებში გაერთიანებული სადაც მარტივად შეგვიძლია მანიპულაცია. მაგალითისთვის: `documnet` არის ობიექტი, რომელიც წარმოადგენს
თავად დოკუმენტს, ყოველი ელემენტი, რაც HTML-ში არის მოთავსებული შეგვიძლია სხვადასხვა სელექტორების გამოყენებით ამოვიღოთ და შევუცვალოთ თვისებები.

## DOM და JavaScript

ვებში მეტწილადად JavaScript-ით განიხილება დოკუმენტთან მუშაობა DOM-ის გამოყენებით, თუმცა ეს ნაწილი არ გულისხმობს იმას, რომ მხოლოდ JavaScript გააჩნია DOM-ზე წვდომა.
DOM არ არის JavaScript-ს უშუალო ნაწილი, ის არის [WEB API](https://developer.mozilla.org/en-US/docs/Web/API) ჩაშენებული ნაწილი. JavaScript თანხლებით გვეძლევა შესაძლებლობა,
რომ გამოვიყენოთ WEB API და მის მიხედვით ვცვალოთ დოკუმენტის კონტექსტი. ამრიგად უნდა გავიაზროთ ის ნაწილი, რომ JavaScript არ არის ერთადერთი ენა, რომლის მიხედვითაც
შეიძლება დოკუმენტზე მანიპულაცია. DOM შეიქმნა ისე, რომ დამოუკიდებელი იყოს პროგრამული ენებისაგან. ჩვენ შეგვიძლია DOM გამოვიყენოთ, როგორც JavaScript-ის თანხლებით ასევე:
Python, Java, C# ან Ruby გამოყენებითაც.

მაგალითად:

```python
# -*- coding: utf-8 -*-

import xml.dom.minidom as m

html_content = """
  <html>
    <head>
      <title>Iswavle</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>Python მაგალითი</p>
    </body>
  </html>
"""

doc = m.parseString(html_content)

print("დოკუმენტის კვანძის სახელი:", doc.nodeName)

h1_elements = doc.getElementsByTagName("h1")
print("<h1> ელემენტების რაოდენობა დომ-ში:", len(h1_elements))

if h1_elements:
    first_h1_text = h1_elements[0].firstChild.nodeValue
    print("პირველი <h1> კონტექსტის მნიშვნელობა:", first_h1_text)
```

```java
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;

public class DOMExample {
    public static void main(String[] args) {
        String htmlContent = "<html><head><title>Iswavle</title></head><body><h1>Hello, World!</h1><p>Java მაგალითი</p></body></html>";

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();

            ByteArrayInputStream input = new ByteArrayInputStream(htmlContent.getBytes("UTF-8"));
            Document doc = builder.parse(input);

            System.out.println("დოკუმენტის კვანძის სახელი: " + doc.getNodeName());

            NodeList h1Elements = doc.getElementsByTagName("h1");
            System.out.println("<h1> ელემენტების რაოდენობა დომ-ში: " + h1Elements.getLength());

            if (h1Elements.getLength() > 0) {
                Element firstH1Element = (Element) h1Elements.item(0);
                String firstH1Text = firstH1Element.getTextContent();
                System.out.println("პირველი <h1> კონტექსტის მნიშვნელობა: " + firstH1Text);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

```c#
using System;
using System.Xml;

class Program {
  static void Main(string[] args) {
    string htmlContent = "<html><head><title>Iswavle</title></head><body><h1>Hello, World!</h1><p>C# მაგალითი</p></body></html>";

    try {
      XmlDocument doc = new XmlDocument();

      doc.LoadXml(htmlContent);
      Console.WriteLine("დოკუმენტის კვანძის სახელი: " + doc.DocumentElement.Name);

      XmlNodeList h1Elements = doc.GetElementsByTagName("h1");

      Console.WriteLine("<h1> ელემენტების რაოდენობა დომ-ში: " + h1Elements.Count);

      if (h1Elements.Count > 0){
        XmlNode firstH1Element = h1Elements[0];
        string firstH1Text = firstH1Element.InnerText;
        Console.WriteLine("პირველი <h1> კონტექსტის მნიშვნელობა: " + firstH1Text);
      }
    } catch (Exception e) {
      Console.WriteLine("Error: " + e.Message);
    }
  }
}
```

```ruby
require 'nokogiri'

html_content = "<html><head><title>Iswavle</title></head><body><h1>Hello, World!</h1><p>Ruby მაგალითი</p></body></html>"

begin
  doc = Nokogiri::HTML(html_content)

  puts "დოკუმენტის კვანძის სახელი: #{doc.name}"

  h1_elements = doc.xpath('//h1')
  puts "<h1> ელემენტების რაოდენობა დომ-ში: #{h1_elements.length}"

  first_h1_text = h1_elements.first.text
  puts "პირველი <h1> კონტექსტის მნიშვნელობა: #{first_h1_text}"
rescue => e
  puts "Error: #{e.message}"
end
```

მაგალითებიდან ჩანს, რომ JavaScript არ არის ერთადერთი ენა, რომელსაც შეუძლია დოკუმენტის მოდიფიცირება. თუმცა ხშირ შემთხვევაში დეველოპერების დიდი ნაწილი
ამჯობინებს JavaScript გამოყენებას, რადგან უფრო მორგებული და ოპტიმიზირებული არის JavaScript გამოყენება HTML-ში.

## შეჯამება

DOM იშიფრება, როგორც **D**ocument **O**bject **M**odel. DOM გამოყენებით JavaScript-იდან შეგვიძლია ამოვიღოთ HTML-ის ობიექტი და მასზე მანიპულაციით შევცვალოთ
მისი თვისებები ან მეთოდები. შემდგომ სტატიებში განხილული იქნება თუ, როგორ უნდა ამოვიღოთ HTML ელემენტები, როგორ შევასრულოთ მასზე მანიპულაცია და სხვა ძირეული
დეტალები, რაც საჭიროა იმისათვის, რომ სტატიკური კონტენტი დინამიურად ვმართოთ.

- [სელექტორები](./doc/guides/javascript/dom/selectors)
- [ივენთები](./doc/guides/javascript/dom/events)
- [მანიპულაცია ელემენტებზე](./doc/guides/javascript/dom/elements-manipulation)
- [ელემენტზე CRUD ოპერაციები](./doc/guides/javascript/dom/elements-crud)
- [ფორმები](./doc/guides/javascript/dom/form)
- [კანვასი](./doc/guides/javascript/dom/canvas)
- [ხელმისაწვდომობა](./doc/guides/javascript/dom/accessibility)
- [უსაფრთხოება](./doc/guides/javascript/dom/security)
