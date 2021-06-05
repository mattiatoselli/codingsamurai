---
layout: post
title:  "Sviluppo di una app completa in Firebase: parte 1"
author: mattia
categories: [ Serverless, Javascript, Firebase ]
image: "assets/images/firebasehost.jpg"
rating: 5
---

In questo articolo creeremo un progetto completamente basato su Firebase, che permetta a chiunque di autenticarsi, votare i propri piloti preferiti, fino ad un massimo di 5, utilizzando anche una validazione dei dati lato server con delle automazioni. Utilizzeremo quindi Hosting, Firestore, Storage, e le Cloud Functions.


## Preparazione del progetto
Registriamoci a Firebase, successivamente controlliamo di aver installato NodeJs sul nostro pc, e lanciamo da terminale i seguenti comandi:
```
npm install -g firebase-tools
firebase init ==> da lanciare nella cartella in cui vogliamo creare il progetto (selezioniamo il servizio Hosting con il cursore e premendo la barra spaziatrice, poi confermando con invio)
```
Selezioniamo i servizi di hosting, authentication, firestore, functions e storage. Verrà lanciato un wizard da seguire passo passo, potrebero essere sollevati degli errori, dovuti a dei servizi da attivare. In caso attiviamoli e rilanciamo il comando, selezionando poi nuovamente il rpogetto che stavamo creando e non più quello nuovo.
Qui di seguito un esempioil wizard con le mie risposte.


## Sviluppo in locale
Una volta finito possiamo lanciare il progetto sulla porta 5000, per farlo basterà usare:
```
firebase serve ==> lancia un server di sviluppo in ascolto sulla porta 5000 in locale.
```
connettendoci in locale alla porta 5000 vedremo la pagina inziale. Vediamo ora la struttra dei file del progetto:

![image](https://user-images.githubusercontent.com/44556380/120886422-26df7880-c5ee-11eb-93ca-bfb5c34e355e.png)
