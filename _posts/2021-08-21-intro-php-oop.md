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
![image](https://user-images.githubusercontent.com/44556380/130334900-c777281f-69e5-4fe3-b4e1-c411ab5e2aca.png)


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

si noti che gli attributi della classe sono preceduti dalla parola chiave "private", ciò significa che tali variabili non sono accessibili da altri file. Come possiamo quindi leggerne o settarne i valori? Tramite i metodi.


### I metodi getter e setter

I metodi sono funzioni interni alle classi, una volta istanziato un oggetto, potremo utilizzarli. In particolare i metodi getter e setter servono per settare il valore di un attributo o per leggerlo.

```
    public function setModel($model)
    {
        $this->model = $model;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function setBrand($brand)
    {
        $this->brand = $brand;
    }

    public function getBrand()
    {
        return $this->brand;
    }

    public function setKm($km)
    {
        $this->km = $km;
    }

    public function getKm()
    {
        return $this->km;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getPrice()
    {
        return $this->price;
    }
    public function setPlate($plate)
    {
        $this->plate = $plate;
    }

    public function getPlate()
    {
        return $this->plate;
    }

    public function setPower($power)
    {
        $this->power = $power;
    }

    public function getPower()
    {
        return $this->power;
    }

    public function setFuel($fuel)
    {
        $this->fuel = $fuel;
    }

    public function getFuel()
    {
        return $this->fuel;
    }

    public function setEngine($engine)
    {
        $this->engine = $engine;
    }

    public function getEngine()
    {
        return $this->engine;
    }
```

si noti che le funzioni (o meglio, metodi) sono pubbliche e quindi accessibili dall'esterno. L'uso della parola chiave $this è dovuto al fatto che essa permette di accedere alla istanza stessa dell'oggetto.
Per ora limitiamo a crere le altre classi, inoltre, aggiungiamo anche una piccola chicca che ci permette di rendere ancora più robusto il codice: il type hinting. All'interno di una funzione possiamo specificare il tipo di dato che dovrà essere passato, o quello che deve essere restituito.
La classe Car e la classe Customer saranno quindi fatte così:

```
/models/Car.php

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

    /**
     * the model of the car
     */
    public function setModel(string $model)
    {
        $this->model = $model;
    }

    public function getModel() :string 
    {
        return $this->model;
    }

    /**
     * the brand of the car
     */
    public function setBrand(string $brand)
    {
        $this->brand = $brand;
    }

    public function getBrand() : string 
    {
        return $this->brand;
    }

    /**
     * number of km, if car is new is set to 0
     */

    public function setKm(float $km)
    {
        $this->km = $km;
    }

    public function getKm() : float
    {
        return $this->km;
    }

    /**
     * the price of the car in Euro
     */

    public function setPrice(float $price)
    {
        $this->price = $price;
    }

    public function getPrice() : float
    {
        return $this->price;
    }

    /**
     * the plate of the car
     */

    public function setPlate(string $plate)
    {
        $this->plate = $plate;
    }

    public function getPlate() : string
    {
        return $this->plate;
    }

    /**
     * Engine power in CV
     */

    public function setPower(int $power)
    {
        $this->power = $power;
    }

    public function getPower() : int
    {
        return $this->power;
    }

    /**
     * Fuel used by the engine
     */

    public function setFuel(string $fuel)
    {
        $this->fuel = $fuel;
    }

    public function getFuel() : string
    {
        return $this->fuel;
    }

    /**
     * type of engine, like for example V6 Turbo, V4, Hybrid V6, etc. etc.
     */

    public function setEngine(string $engine)
    {
        $this->engine = $engine;
    }

    public function getEngine() : string 
    {
        return $this->engine;
    }
}
```

```
/models/Customer.php

<?php

class Customer
{
    private $name;

    private $surname;

    private $email;

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getName() : string
    {
        return $this->name;
    }

    public function setSurname(string $surname)
    {
        $this->surname = $surname;
    }

    public function getSurname() : string 
    {
        return $this->surname;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
    }

    public function getEmail() : string
    {
        return $this->email;
    }
}
```

Osserviamo ora l'ultima classe: i pagamenti. Nella classe Payments vorremo tenere conto delle informazioni sulla macchina acquistata dai nostri clienti e dei clienti stessi. La cosa interessante è che una classe può contenere come attributo un oggetto di un'altra classe, questo permette di innestare oggetti diversi per poter accedere velocemente ai loro dati, mantenendo la consistenza dei dati.

```
/models/Payment.php

<?php

class Payment
{
    private $amount;

    private $customer;

    private $car;

    public function setAmount(float $amount)
    {
        $this->amount = $amount;
    }

    public function getAmount() : float
    {
        return $this->amount;
    }

    public function setCustomer(Customer $customer)
    {
        $this->customer = $customer;
    }

    public function getCustomer() : Customer
    {
        return $this->customer;
    }

    public function setCar(Car $car)
    {
        $this->car = $car;
    }

    public function getCar() : Car
    {
        return $this->car;
    }
}
```
