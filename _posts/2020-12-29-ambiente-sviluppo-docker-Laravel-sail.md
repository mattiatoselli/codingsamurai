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
curl -s https://laravel.build/timesheet-app | bash
cd timesheet-app/vendor/bin/
./sail up
```

Quando finalmente il terminale ci dirà <i>"PHP 8.0.0 Development Server (http://0.0.0.0:80) started"</i>, potremo visitare la pagina di root del nostro progetto Laravel, disponibile presso http://localhost.
