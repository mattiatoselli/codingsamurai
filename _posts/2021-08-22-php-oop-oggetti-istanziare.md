---
layout: post
title:  "OOP in PHP: Classi ed oggetti"
author: mattia
categories: [ PHP, OOP]
image: "assets/images/php.png"
---

Abbiamo creato le nostre classi e abbiamo visto come farlo, quali sono le parole chiave da utilizzare, e il perchè di certe scelte. Iniziamo ora ad utilizzare i nostri oggetti.
Per prima cosa, iniziamo importando le nostre classi e rendiamole disponibili su "index.php".


### Istanziare oggetti ed importare file


Per prima cosa importiamo le nostre classi in modo da renderle sempre disponibili. Creiamo un unico file in cui importeremo tutto e poi includeremo in ogni funzione.
Lo svantaggio di questo approccio è che dovremo ricordarci di creare sempre uno statement di importazione su questo file, e che ogni volta che eseguiremo un file php, tutte le classi e funzioni verranno caricate nella RAM.
Questo verrà risolto fra poco, comunque.

Iniziamo quindi creando un unico loader delle classi e delle nostre funzioni.

```
/Loader.php

<?php

require ".models/Car.php";
require ".models/Customer.php";
require ".models/Payment.php";
```
