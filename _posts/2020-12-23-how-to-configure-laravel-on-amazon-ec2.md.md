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


## Laravel

Laravel è un framework PHP per la creazione di qualsiasi cosa, dalle applicazioni di piccole dimensioni a quelle di enterprise. Laravel è stato creato da Taylor Otwell nel giugno 2011 con l'obiettivo di avere una sintassi del codice semplice ed espressiva, che offre il vantaggio di avere un'applicazione Web che è facile da usare e codice gestibile.

È interessante notare che Laravel è stato visto migliorare di anno in anno. Ogni anno vengono implementate nuove funzionalità oltre alla correzione dei bug, tutto grazie alla sua disponibilità come framework PHP open source e alla comunità degli sviluppatori su GitHub.


## Stack

Ci sono alcune possibilità quando si sceglie un server web per PHP in Linux. Le più popolari sono Nginx e Apache. In questo caso useremo Nginx.


## Creazione della EC2

Accediamo alla console del nostro account AWS e dopo esserci posizionati nela region di nostra scelta, selezioniamo il servizio EC2. Per prima cosa dobbiamo scegliere la AMI, nel nostro caso selezioniamo Ubuntu Server 20.04 LTS (HVM). Tale AMI è disponibile per il free tier e quindi fa esattamente al caso nostro. Come tipologia sceglieremo la t2.micro.

Nel terzo passo possiamo lasciare tutto secondo impostazioni standard, verrà creata una VPC pubblica di default. Negli step successivi assegnamo lo storage di default e i tag che riteniamo opportuni. Infinev assegnamo un gruppo di sicurezza con i permessi di accesso per i protocolli SSH, HTTP ed HTTPS. 

Ricordiamoci di generare una chiave SSH per l'accesso alla istanza, in alternativa potremo già usare una di quelle che già abbiamo, se per qualche motivo su AWS ne abbiamo generata una. La chiave di accesso non deve essere persa, una volta generata non sarà possibile per alcun motivo generarne un'altra. Lanciamo l'istanza e attendiamo che parta.


## Installazione dei software

Apriamo un terminale Linux sul nostro PC e forniamo i giusti permessi alla chiave per la connessione ssh.

```bash
sudo chmod 400 laravel-coding-samurai.pem
```

Accediamo alla nostra istanza. Il nome dell'utente di default per le istanze Ubuntu è "ubuntu", l'indirizzo IP della macchina è disponibile nella visuale di dettaglio della stessa l'indirizzo ip nell'esempio seguente è completamente inventato.

```bash
ssh ubuntu@86.232.212.99 -i laravel-coding-samurai.pem
```

Aggiorniamo i pacchetti e installiamo NGINX

```bash
sudo apt-get update
sudo apt-get install nginx
```

Installiamo PHP.

```

#### HTML
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php8.0 php8.0-xml php8.0-gd php8.0-opcache php 8.0-mbstring
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
