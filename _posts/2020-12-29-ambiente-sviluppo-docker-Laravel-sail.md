---
layout: post
title:  "Creare rapidamente un ambiente di sviluppo con Docker e Laravel Sail"
author: mattia
categories: [ Docker, Laravel ]
tags: [ Docker, Laravel ]
image: assets/images/laravel-sail.jpg
description: "Un breve articolo su come creare un ambiente di sviluppo Laravel in locale."
featured: true
rating: 3.5
---

In questo articolo vedremo come scaricare e configurare Docker e Docker-compose sul proprio PC Linux, per poi avere rapidamente un server locale per lo sviluppo delle nostre aplicazioni Laravel.


## Installazione di Docker su Linux

Laravel dalla versione 8 fa uso dei container, per questo dovremo dotarci di Docker. Nel caso di Linux, occorre fare riferimento alle diverse versioni ed architetture supportate, ogni versione ha una serie di accorgimenti che differiscono dalle altre, Da <a href="https://docs.docker.com/engine/install/">questo articolo</a>, seguire il percorso relativo alla propria versione.
Di seguito installeremo Docker su Ubuntu.

Rimuoviamo precedenti versioni, aggiorniamo i pacchetti, e installiamo quelli necessari, dopodichè forniamo al demone i permessi di root.

```
$ sudo apt-get remove docker docker-engine docker.io containerd runc
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
$ sudo apt-get install docker-compose
```


## Installazione di Laravel

Per creare una nuova applicazione Laravel in una directory denominata "timesheet-app", eseguire i seguenti comando nel terminale:

```
curl -s https://laravel.build/example-app
cd example-app/vendor/bin
./sail up
```

Quando finalmente il terminale ci dirà <i>"PHP 8.0.0 Development Server (http://0.0.0.0:80) started"</i>, potremo visitare la pagina di root del nostro progetto Laravel, disponibile presso http://localhost.

A questo punto se apriamo un altro terminale, possiamo utilizzare i comandi propri di Docker per interagire con i container o con l'ambiente Laravel. Per esempio:
```
//spegni i container
./sail down
//avvia container in detached mode
./sail up -d
//crea chiave di crittazione
./sail artisan key:generate
//effettua migrazione database
./sail artisan migrate
```

Se l'ultimo comando dovesse falire, dobbiamo connetterci alla porta 3306 del nostro PC con un qualunque client SQL (esempio Adminer o MySql Workbench) e creare il database. Il nome del database è visibile nel file .env "DB_DATABASE=example_app", le credenziali di accesso col client sono invece DB_USERNAME=root B_PASSWORD= (generalmente quest'ultima è vuota).


## Installazione di più ambienti con Sail Laravel

Se si è già precedentemente effettuato lo start di una applicazione Laravel con la metodologia sopra descritta, effettuare lo start di un secondo ambiente potrebbe creare qualche problema, in particolare si vedrà che il container MYSQL viene terminato subito dopo il lancio per un errore di plugin. in questo caso dovremo andare nella cartella del nuovo progetto e modificare il file docker-compose.yml nelle due righe in cui ricorre il valore il volume sailmysql, assegnandogli un nome diverso.
```
volumes:
  - 'example-sailmysql:/var/lib/mysql'
 .
 .
 .
 networks:
    sail:
        driver: bridge
volumes:
    timesheet-sailmysql:
        driver: local
    sailredis:
        driver: local
```
