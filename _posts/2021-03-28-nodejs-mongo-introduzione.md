---
layout: post
title:  "Introduzione a Nodejs e Mongo"
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


##Event Driven

Il modello event-driven, o "programmazione ad eventi", si basa su un concetto piuttosto semplice: si lancia una azione quando accade qualcosa. Nodejs, ovviamente, non è la panacea di tutti i mali, ha delle applicazioni in cui è lo strumento migliore, e altre in cui non è indicato il suo utilizzo.
Applicazioni in cui è indicato l'utilizzo di questa tecnologia sono casi d'uso in cui si hanno tante richieste e risposte di piccola dimensione, per esempio sistemi di notifica o chat, applicazioni in real time, giochi online.
Quando conviene invece evitarlo? Risposte HTTP di grandi dimensioni, gestionali, server per gestione di file statici (es. immagini), Blogs, CMS, E-Commerce.
