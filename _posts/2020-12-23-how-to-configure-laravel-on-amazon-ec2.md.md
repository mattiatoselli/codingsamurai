---
layout: post
title:  "Creare una applicazione Laravel su AWS con Amazon EC2"
author: mattia
categories: [ AWS, tutorial, EC2, Laravel ]
image: assets/images/laravel-aws.png
featured: true
rating: 4.5
---
In questo articolo partiremo da alcuni presupposti. Per poterlo completare, avremo bisogno di creare un account su AWS e collegargli una carta di credito valida. Si tratta di un passaggio necessario per poter accedere ai servizi offerti, non verranno effettuati addebiti di alcun tipo, tutto ciò che faremo è disponibile all'interno del tier gratuito offerto da AWS.


## Amazon EC2

Amazon EC2 è un servizio di cloud computing che permette di eseguire server virtuali per far girare applicazioni e servizi web come in un tradizionale data center.

A differenza di quest’ultimo però, offre il vantaggio di poter effettuare il provisioning di server e risorse immediatamente in base alle proprie esigenze. Questo servizio introduce una serie di concetti che vanno approfonditi per comprenderne il funzionamento complessivo, in primo luogo istanze ed AMI. 

AMI sta per Amazon Machine Image, e si tratta di template che contengono il software necessario per dare vita ad un server virtuale. Nello specifico, ogni template contiene:

- Sistema operativo.
- Application server.
- Software aggiuntivi.

Le istanze EC2 sono copie di una AMI eseguite su una determinata configurazione hardware. In altre parole, l’istanza è il vero e proprio ambiente virtuale fatto di CPU, memoria, storage e banda internet che esegue il nostro pacchetto software, ovvero la nostra AMI.


## Special formatting

As well as bold and italics, you can also use some other special formatting in Markdown when the need arises, for example:

+ ~~strike through~~
+ ==highlight==
+ \*escaped characters\*


## Writing code blocks

There are two types of code elements which can be inserted in Markdown, the first is inline, and the other is block. Inline code is formatted by wrapping any word or words in back-ticks, `like this`. Larger snippets of code can be displayed across multiple lines using triple back ticks:

```
.my-link {
    text-decoration: underline;
}
```

#### HTML

```html
<li class="ml-1 mr-1">
    <a target="_blank" href="#">
    <i class="fab fa-twitter"></i>
    </a>
</li>
```

#### CSS

```css
.highlight .c {
    color: #999988;
    font-style: italic; 
}
.highlight .err {
    color: #a61717;
    background-color: #e3d2d2; 
}
```

#### JS

```js
// alertbar later
$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 280) {
        $('.alertbar').fadeIn();
    } else {
        $('.alertbar').fadeOut();
    }
});
```

#### Python

```python
print("Hello World")
```

#### Ruby

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

#### C

```c
printf("Hello World");
```




![walking](https://mattiatoselli.github.io/codingsamurai/assets/images/8.jpg)

## Reference lists

The quick brown jumped over the lazy.

Another way to insert links in markdown is using reference lists. You might want to use this style of linking to cite reference material in a Wikipedia-style. All of the links are listed at the end of the document, so you can maintain full separation between content and its source or reference.

## Full HTML

Perhaps the best part of Markdown is that you're never limited to just Markdown. You can write HTML directly in the Markdown editor and it will just work as HTML usually does. No limits! Here's a standard YouTube embed code as an example:

<p><iframe style="width:100%;" height="315" src="https://www.youtube.com/embed/Cniqsc9QfDo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></p>
