---
title: 'მულტიმედია'
description: 'რა არის მულტიმედია?'
keywords: 'მულტიმედია, მულტიმედიის ელემენეტები'
---

მულტიმედია არის ტექნოლოგია, რომელიც აერთიანებს სხვადასხვა ტიპის მედიას ერთი სისტემის ან აპლიკაციის ფარგლებში.
ვებში მულტიმედია გამოიყენება ინფორამციის ვიზუალრუად გამოსახვისთვის, დინამიურობისთვის და ინტერაქტიულობისთვის, რაც აუმჯობესებს მომხარებლის გამოცდილებას (UX - User experience).

## სურათის ჩასმა

სურათი გამოისახება `<img>` ელემენტით.

```html preview
<img src="./assets/icons/educata.png" alt="ედუკატას ლოგო" height="400" />
```

`src` ატრიბუტი წარმოადგენს მისამართს, თუ საიდან უნდა ჩაიტვირთოს მედია, ხოლო `alt` განსაზღვრავს ალტერნატიულ ტექსტს,
იმ შემთხვევაში, თუ სურათი ვერ ჩაიტვირთა.

ასევე შეგვიძლია `img` თეგით მოძრავი GIF-ის ფორმატის სურათის გამოტანაც:

```html preview
<img src="./assets/images/pendulum.gif" alt="ჩატვირთვის ანიმაცია" />
```

`src`-მა შეიძლება მიიღოს შემდგომი ფაილის ტიპები:

<!-- TODO: გადათარგმნე აღწერის ნაწილი -->

- [APNG](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#apng_animated_portable_network_graphics) - Animated Portable Network Graphics (`.apng`, `.png`) - Good choice for lossless animation sequences (GIF is less performant)
- [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#avif_image) - AV1 Image File Format (`.avif`) - Good choice for both images and animated images due to high performance.
- [GIF](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#gif_graphics_interchange_format) - Graphics Interchange Format (`.gif`) - Good choice for simple images and animations.
- [JPEG](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#jpeg_joint_photographic_experts_group_image) - Joint Photographic Expert Group image (`jpg`, `.jpeg`, `.jfif`, `.pjpeg`, `.pjp`) - Good choice for lossy compression of still images (currently the most popular).
- [PNG](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#png_portable_network_graphics) - Portable Network Graphics (`.png`) - Good choice for lossless compression of still images (slightly better quality than JPEG).
- [SVG](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#svg_scalable_vector_graphics) - Scalable Vector Graphics (`.svg`) - Vector image format. Use for images that must be drawn accurately at different sizes.
- [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#webp_image) - Web Picture format (`.webp`) - Excellent choice for both images and animated images.

## ვიდეო

ვიდეოს ვებში ჩასასმელად გამოიყენება [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video) ელემენტი.

```html preview
<video controls>
  <source src="./assets/videos/5-sec-loading.mp4" type="video/mp4" />
</video>
```

სურათის მსგავსად, აქაც საჭიროა მისამართის მითითბა, რომელიც სრულდება [`source`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/source) თეგის გამოყენებით.
შესაძლებელია `source` თეგის ნაცვლად პირდაპირ `video`-ს ელემენტზე ატრიბუტის სახით დავამატოთ მისამართი, მაგალითად:

```html
<video controls src="./assets/videos/5-sec-loading.mp4"></video>
```

ეს მიდგომაც მისაღებია, თუმცა უმჯობესია `source`-ის გამოყენება, რადგან შეგვიძლია ერთზე მეტი `source` მივუთითოთ.
თუ პირველი ვერსია არ ჩაიტვირთება მაშინ გაეშვება მომდევნო და ა.შ.

ვიდეოს გამოსახვისთვის, პრაქტიკაში უმჯობესია ერთზე მეტი `source`-ის გამოყენება, სადაც პირველი იქნება შედარებით მსუბუქ ფორმატში ხოლო მეორე მძიმე.
მსგავსი მიდგომით შეგვიძლია კარგი ოპტიმიზაციის მიღება, რაც დაზოგავს მომხარებლის რესურსებს.

ვთქვათ გვაქვს ორი `source`, სადაც `webm` გაფართოვების ვიდეო არის 10მბ ხოლო `mp4`-ის ვიდეო 12მბ. ამ შემთხვევაში ბრაუზერი ჯერ შეეცდება
პირველი ვიდეოს ჩატვირთვას `video.webm` ხოლო წარუმატებლობის შემთხვევაში მეორე ვიდეოს ჩატვირთვას.

```html
<video controls="controls">
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
</video>
```

`controls` ატრიბუტი განსაზღვრავს კონტროლებს ვიდეო ელემენტზე, როგორებიცაა: ჩართვა/დაპაუზება, ხმის კონტროლი და ა.შ.

იხილეთ ვიდეო ელემენტის ატრიბუტების სრული ჩამონათვალი[MDN-ის სტატიაში](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video#attributes).

## აუდიო

აუდიოს ვებში გამოსახვისთვის გამოიყენება [`audio`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio) ელემენტი.

```html preview
<audio controls>
  <source src="./assets/videos/5-sec-loading.mp4" />
</audio>
```

მისი გამოყენების მიდგომა და ატრიბუტები ჰგავს `video` ელემენტს.

იხილეთ აუდიო ელემენტის ატრიბუტების სრული ჩამონათვალი [MDN-ის სტატიაში](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio#attributes).

## iframe

ვებგვერდში შეგვიძლია ჩავაშენოთ სხვა ვებგვერდი [`iframe`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) თეგის გამოყენებით.

მაგალითად, გვსურს google maps აპლიკაციის გამოტანა ჩვენს ვებსაიტზე:

```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6053278.568476672!2d38.07323725028378!3d42.19942970021602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x4f907964122d4ac2!2z4YOh4YOQ4YOl4YOQ4YOg4YOX4YOV4YOU4YOa4YOd!5e0!3m2!1ska!2sge!4v1744450943201!5m2!1ska!2sge" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

<iframe data-url="guides/html-css-iframe-map" data-title="რუკის გამალითი" data-height="460"></iframe>

`src` ატრიბუტში ვუთითებთ იმ აპლიკაციის მისამართს, რომლის გამოტანაც გვსურს.

:::error
ყოველი `iframe` იყენებს მომხმარებლის მოწყობილობის რესურებს, რაც უფრო დავტვირთავთ ვებგვერდს მძიმე `iframe`-ებით,
მით უფრო დაიტვირთება მომხმარებლის მოწყობილობა. თეორიულად უსასრულო რაოდენობის `iframe`-ის მოთავსება
შეგიძლიათ, მაგრამ გაითვალისწინეთ მომხარებლის რესურსებიც.
:::

:::info
სხვადასხვა მიზეზების გამო ყველა ვებგვერდი არ მოგცემთ `iframe`-ში ჩაშენების უფლებას.
:::

შეზღუდვა არ გვაქვს თუ რამდენ `iframe`-ს მოვათავსებთ `iframe`-ში. მაგალითად ეს რუკის მაგალითი, რომელიც გამოგიჩნდათ ვებგვერდზე,
იყენებს `iswavle`-ს ცალკეულ `iframe`-ს, ხოლო იმ `iframe`-ში კი კიდევ რუკის `iframe` არის გამოყენებული.

`iframe`-ში, კონტენტის ჩასატვირთად, შეიძლება როგორც სრული წყაროს (`src`) გამოყენება, ასევე `html` კონტენტის გადაცემაც.
`html`-ის გადაცემისას გამოიყენება `srcdoc` ატრიბუტი.

იხილეთ `iframe`-ის ატრიბუტების სრული ჩამონათვალი [MDN-ის სტატიაში](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio#attributes).

## შეჯამება

ამ სტატიაში განვიხილეთ HTML5-ის მულტიმედიის ელემენტები. HTML5-მდე ეს ყველაფერი იტვირთებოდა ჯავასკრიპტით
და Adobe flash player-ით თუმცა თანამედროვე ბრაუზერებში ყოველივე ეს ჩაშენებული გვაქვს HTML-ში.
