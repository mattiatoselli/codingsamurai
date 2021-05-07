---
layout: post
title:  "Introduzione a Firebase"
author: mattia
categories: [ Serverless, Javascript, Firebase, Hosting ]
image: "assets/images/firebasehost.jpg"
rating: 4
---

In questo articolo analizzeremo un servizio particolarmente semplice da utilizzare e molto apprezzato: Firebase Hosting, il servizio di google all’interno di Firebase che ci permette in pochissimo tempo di pubblicare la nostra applicazione sul web e renderla disponibile a tutti.


## Preparazione del progetto

Registriamoci a Firebase e creiamo un nuovo progetto accedendo alla console, possiamo tranquillamente accettare Google Analytics. Una volta creato il progetto, rechiamoci su Hosting dalla sidebar e clicchiamo su "Inizia".
Controlliamo di aver installato NodeJs, e lanciamo da terminale i seguenti comandi:
```
npm install -g firebase-tools
firebase login ======> verrà richiesto di fare login su un browser a cui verremo ridiretti
firebase init ==> da lanciare nella cartella in cui vogliamo creare il progetto (selezioniamo il servizio Hosting con il cursore e premendo la barra spaziatrice, poi confermando con invio)
```

Nel wizard di configurazione successivo, scegliamo il progetto appena creato, e ricordiamoci di non configurare come single page application. Ora possiamo aprire la nostra cartella del progetto con un IDE.
