---
layout: post
title:  "OOP in PHP: Classi ed oggetti"
author: mattia
categories: [ PHP, OOP]
image: "assets/images/php.png"
rating: 4
---

In questa serie di articoli analizzeremo la programmazione ad oggett in PHP, e ci concentreremo sulla creazione di codice pulito e facilmente mantenibile. Sebbene si tratti di un argomento sufficientemente basilare, mi sono accorto che col tempo, proprio a causa del fatto che sempre di più facciamo ricorso a dei framework, tanti piccoli funzionamenti del linguaggio
e crismi della buona programmazione vanno persi, nella fretta di eare e stare dietro ai task, salvo poi presentare il conto quando andiamo a caccia di bug in produzione o dobbiamo mantenere progetti molto grossi.
Io stesso son caduto in quella trappola, motivo per cui insieme ai miei collegghi, abbiamo deciso di fermarci, prendere fiato, e ripassare il tutto per poi tornare a lavorare sul codice con le idee fresche e chiare.


## Cosa serve

- Una buona base di PHP.
- PHP instllato sulla propria macchina.
- Un editor di testo.


## Bando alle ciance

Partiamo immmediatamente senza perderci troppo in chiacchiere. Per prima cosa creiamo una cartella per il nostro progetto, può essere qualunque cosa, se volete seguirmi durante la serie, io creerò una piccola applicazione che permette di far combattere fra loro dei Daimyo nella loro battaglia per il Giappone, ma può essere ovviamente qualunque cosa.

```
cd ~
mkdir php-oop-exercises
cd php-oop-exercises
echo "<?php phpinfo();" > index.php
```

Avviamo il server di sviluppo e una volta recati sul nostro indirizzo locale avremo la pagina index.php

```
php -S localhost:8000
```

![il nostro file index.php](/assets/images/php.png)
