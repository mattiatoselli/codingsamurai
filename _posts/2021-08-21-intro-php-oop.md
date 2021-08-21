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


### Cosa serve

- Una buona base di PHP.
- PHP instllato sulla propria macchina.
- Un editor di testo.


### Bando alle ciance

Partiamo immmediatamente senza perderci troppo in chiacchiere. Per prima cosa creiamo una cartella per il nostro progetto, può essere qualunque cosa, se volete seguirmi durante la serie, io creerò una piccola applicazione per gestire le vendite di una autoconcessionaria, ma può essere ovviamente qualunque cosa.

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


### Classi e oggetti

Per visualizzare la differenza tra classi ed oggetti pensiamo ad esempio ad una macchina. Una classe è un insieme di dati che compongono tutte le macchine della nostra lista. Una classe quindi è un "progetto" e rappresenta una entità all'interno della nostra applicazione. Un oggetto, d'altra parte, viene anche detto "istanza della classe" e rappresenta una specifica macchina.
Le classi vengono anche chiamate "Modelli", e vengono create tramite la parola "Class" all'interno di un file php. Generalmente è buona norma inserire le classi all'interno di una carteella unica, e nominare il file col nome della classe stessa (tutti gli standard prevedono di farlo, e non vi è alcuna motivazione per evitare).

All'interno del nostro progetto andremo a definire 3 classi:
- Utenti dentro /models/Customer.php
- Macchine dentro /models/Car.php
- Pagamenti dentro /models/Payment.php

Si noti che la convenzione è quella di utilizzare il singolare per il nome della classe.

### Creiamo le classi

La progettazione di una classe richiede sempre una certa attenzione, deve essere definita con cura ed è sicuramente un processo che migliora con l'esperienza. Una classe contiene al suo interno degli attributi, essi sono le proprietà che definiscono la singola entità per esempio nel caso della nostra macchina, la cilindrata, il costo, l'alimentazione, i cavalli e così via. Una buona norma è quella di andare sempre a definire un attributo per ogni colonna del database riguardante la tabella.

Iniziamo creando la nostra classe Car:

```
<?php

class Car
{
    private $model;

    private $brand;
    
    private $km;
    
    private $price;
    
    private $plate;
    
    private $power;
    
    private $fuel;
    
    private $engine;
}
```
