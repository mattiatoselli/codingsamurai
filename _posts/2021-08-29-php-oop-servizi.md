---
layout: post
title:  "OOP in PHP: Servizi"
author: mattia
categories: [ PHP, OOP]
image: "assets/images/php.png"
---

Come abbiamo già avuto modo di vedere, la programmazione ad oggetti ci mette a disposizione non solo il poter dichiarare degli attributi, ma anche delle funzioni (dette metodi)
che possono essere confinate e richiamate solo su degli oggetti. Ovviamente, come possiamo ben immaginre, non si tratta solo dei getter e dei setter, con cui abbiamo già familiarizzato, ma di qualunque funzione.

Supponiamo per esempio di voler creare un metodo che ci permetta di stampare in un certomodo alcune delle informazioni che riguardano una determinata macchina. Il primo nostro pensiero potrebbe essere quello di creare questa funzione nella classe Car, nel file /models/Car.php.
Vi dico già che questo è sbagliato! O perlomeno, non è sbagliato in senso totale del termine, è assolutamente possibile farlo, ma è una pratica da disincentivare assolutamente.
La regola aurea da seguire in questi casi è sempre la seguente: "Voglio creare una funzione che fa qualcosa di correlato ad una classe, e voglio metterla dentro la classe? Non lo faccio!".

Piuttosto perentoria come regola, ma è anche una delle mie preferite proprio perchè lo è. Quello che invece bisogna fare, è utilizzare i servizi.


### Creare un servizio


Sebbene abbiano un nome altisonante, i servizi non sono altro che delle classi di supporto in PHP che possiamo usare dopo averle create, come dei veri e propri repository per la logica riguardante le classi vere e proprie.
La nomenclatura dovrebbe essere facilmente interpretabile, in maniera che si sappia sempre che logica gestiscono. Personalmente tendo ad usare un suffisso "manager" alla fine.
Nel caso ad esempio del nostro servizio che si occupa di gestire alcune funzioni della classe Car, possiamo chiamarlo "CarManager".

Nel mio caso inoltre ho fatto un'altra distinzione: i manager vanno inseriti nella nuova cartella /services, di conseguenza il percorso sarà: /services/CarManager.php.

```
<?php
class CarManager
{
    public function printCar(Car $car) : void
    {
        echo "{$car->getBrand()} {$car->getModel()}";
    }

    public function printSpecs(Car $car) : void
    {
        echo "{$car->getEngine()} - {$car->getPower()} CV";
    }
}
?>
```

Come possiamo vedere, abbiamo introdotto due funzioni di stampa ce formattano in modo particolare gli oggetti della classe Car. Come detto poco sopra, tali funzioni possono tranquillamente essere più complesse, e dovrebbero sempre essere contenute nei servizi.
