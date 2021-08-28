---
layout: post
title:  "OOP in PHP: Costruttori"
author: mattia
categories: [ PHP, OOP]
image: "assets/images/php.png"
---

Nel precedente articolo abbiamo visto come istanziare dei nuovi oggetti e come rendere facile la lettura dei dati al loro interno. Ora analizzeremo invece un metodo molto particolare disponibile all'interno degli oggetti in PHP. Si tratta di un metodo che deve sempre essere dichiarato con una parola chiave predefinita.


### Il problema


Mentre programmiamo ci rendiamo conto che, alla creazione di un pagamento, per esempio, non c'è nessun motivo per cui l'utente debba poter modificare esternamente il cliente o la macchina a cui i pagamenti fanno riferimento, di conseguenza i metodi setCustomer e setCar, in realtà, sono completamente inutili, se non dannosi. Molto meglio sarebbe poter istanziare un oggetto pagamento che richieda obbligatoriamente questi due altri oggetti per poter essere istanziato, e poi che essi siano in sola lettura.

### La soluzione: il metodo __construct


PHP, come da prassi nei linguaggi di programmazione ad oggetti, mette a disposizione un cosidetto metodo "costruttore". Si tratta di un metodo che viene lanciato immediatamente ogni volta che un oggetto di una determinata classe viene istanziato. L'interprete PHP dedica le risorse all'oggetto, e subito lancia tale metodo prima ancora di eseguire qualunque altra operazione. Tale metodo deve ovviamente essere dichiarato pubblico poichè dobbiamo potervi accedere da qualunque parte nel codice, e come vedremo è molto utile. Sebbene in questo caso lo stiamo utilizzando per una questione di integrità dei dati (vogliamo infatti cancellare i setter che riteniamo dannosi), la sua utilità è molto maggiore, i costruttori vengono utilizzati per una infinità di applicazioni, come ad esempio eseguire codice preventivo, settare o inizializzare un determinato oggetto con dei parametri di configurazione, o per mille altri motivi. Come vedremo, è molto utile in quella che viene chiamata "dependency injection", un concetto con cui faremo presto i conti.

Modifichiamo la classe Payment e inseriamo il nostro costruttore. Rimuoviamo anche i getter inutili.

```
<?php

class Payment
{
    private $amount;

    private $customer;

    private $car;

    public function __construct(Car $car, Customer $customer)
    {
        $this->car = $car;
        $this->customer = $customer;
    }

    public function setAmount(float $amount)
    {
        $this->amount = $amount;
    }

    public function getAmount() : float
    {
        return $this->amount;
    }

    public function getCustomer() : Customer
    {
        return $this->customer;
    }

    public function getCar() : Car
    {
        return $this->car;
    }
}
```

ora, quando vorremo istanziare un oggetto Payment, dovremo passare come argomenti i dati richiesti:

```
//payment
$payment = new Payment($car, $customer);
$payment->setAmount($car->getPrice());
```
