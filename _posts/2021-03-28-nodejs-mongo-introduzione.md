---
layout: post
title:  "Creazione di una app NodeJs, MongoDb su DigitalOcean App Platform"
author: mattia
categories: [ Javascript, Nodejs, API]
image: assets/images/node.jpg
rating: 5
---


Node.js è un framework per realizzare applicazioni Web in JavaScript, permettendoci di utilizzare questo linguaggio, anche per la scrittura di applicazioni "server-side".
Alla sua creazione Javascript poteva essere eseguito solo su un browser, e quindi era sempre stato utilizzato come linguaggio "Client Side". La piattaforma è basata sul JavaScript Engine V8, 
un ambiente di runtime creato da Google, ed utilizzato ad esempio da Chrome.
La caratteristica principale di Node.js risiede nella possibilità che offre di accedere alle risorse del sistema operativo in modalità event-driven e non 
sfruttando il classico modello basato su processi o thread concorrenti, utilizzato dai classici web server.


## Event Driven

Il modello event-driven, o "programmazione ad eventi", si basa su un concetto piuttosto semplice: si lancia una azione quando accade qualcosa. Nodejs, ovviamente, non è la panacea di tutti i mali, ha delle applicazioni in cui è lo strumento migliore, e altre in cui non è indicato il suo utilizzo.
Applicazioni in cui è indicato l'utilizzo di questa tecnologia sono casi d'uso in cui si hanno tante richieste e risposte di piccola dimensione, per esempio sistemi di notifica o chat, applicazioni in real time, giochi online.
Quando conviene invece evitarlo? Risposte HTTP di grandi dimensioni, gestionali, server per gestione di file statici (es. immagini), Blogs, CMS, E-Commerce.


## Mongo Database

MongoDB è un database orientato ai documenti. Ciò significa che non utilizza tabelle e righe per memorizzare i dati, ma raccolte di documenti simili a JSON. Questi documenti supportano i campi incorporati, quindi i dati correlati possono essere archiviati al loro interno.


## Spiegazione del progetto

In questo piccolo progetto andremo a creare una applicazione che servirà a gestire un'asta piloti e macchine di fine campionato per un gruppo di sim drivers in cui partecipo, lascio di seguito i riferimenti al <a href="https://www.twitch.tv/racingteamitalia">canale twitch</a> e al <a href="https://www.racingteamitalia.it">sito internet</a>.
