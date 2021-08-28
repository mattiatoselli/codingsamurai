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
/loader.php

<?php

<?php

require "./models/Car.php";
require "./models/Customer.php";
require "./models/Payment.php";
```

qui abbiamo un esempio di come possiamo istanziare degli oggetti, tramite la parola chiave "new <nome classe>();". Nel nostro file index.php creiamo due macchine in vendita e mostriamone le informazioni.

```
<?php
require "loader.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Autoconcessionaria PHP</title>
</head>
<body>
    <?php
    //new cars
      $car = new Car();
      $car->setModel("Yaris");
      $car->setBrand("Toyota");
      $car->setKm(11000);
      $car->setPower(90);
      $car->setFuel("Benzina");
      $car->setEngine("1000cc V3");
      $car->setPlate("BE 123 KK");
      $car->setPrice(3500);


      $car01 = new Car();
      $car01->setModel("Volkswagen");
      $car01->setBrand("Polo");
      $car01->setKm(0);
      $car01->setPower(120);
      $car01->setFuel("Benzina");
      $car01->setEngine("1000cc V3");
      $car01->setPlate("UG 903 RP");
      $car01->setPrice(23000);

      //new Customer
      $customer = new Customer();
      $customer->setName("Mario");
      $customer->setSurname("Luigi");
      $customer->setEmail("mario@mail.com");

      //payment
      $payment = new Payment();
      $payment->setAmount($car->getPrice());
      $payment->setCustomer($customer);
      $payment->setCar($car)
    ?>
    <h2>Macchine in vendita:</h2>
    <ul>
      <?php echo "<li> {$car->getBrand()} - {$car->getModel()}: {$car->getPrice()}$ </li>" ?>
      <?php echo "<li> {$car01->getBrand()} - {$car01->getModel()}: {$car01->getPrice()}$ </li>" ?>
    </ul>

    <hr>

    <h2>Macchine vendute:</h2>
    <ul>
      <?php echo "<li> {$payment->getCustomer()->getName()} {$payment->getCustomer()->getSurname()}, paga {$payment->getAmount()}$ e compra 
      {$payment->getCar()->getBrand()} {$payment->getCar()->getModel()} </li>" ?>
    </ul>



</body>
</html>
 ```
