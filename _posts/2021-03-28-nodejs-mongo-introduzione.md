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

I campionati di questi ragazzi vengono corsi divisi in 7 squadre da 8 componenti, più un campionato Rookies, ovvero nuove leve che sono al loro primo ingresso nel team, e che per regolamento devono prima passare da questo campionato. Ogni fine campionato da 15/16 gare, alcuni piloti finiscono sul mercato ed in una live su twitch, i capi dei 7 team effettuano un'asta per cercare di aggiudicarsi i piloti e le macchine, utilizzando come valuta i punti guadagnati da tutti i loro piloti durante il campionato.

Senza addentrarsi troppo nel funzionamento e nel regolamento di tali aste, basti sapere che alcuni piloti partono da una base d'asta di 75 crediti, altri 100, ed altri 50, mentre altri non vengono proprio messi in vendita, in base al loro piazzamento in classifica finale l'anno prima, stesso vale per le macchine che i vari team si devono aggiudicare. Se un pilota cambia team, metà del costo della transazione viene accordato al team che vende, altrimenti tutti i crediti vengono bruciati.


## Installazione di NodeJs

Se siamo su Windows, una rapida ricerca su Google ci permetterà di scaricare il file eseguibile. Se siamo invece su Mac o Linux, possiamo farlo via terminale. Qui seguiremo la procedura su Ubuntu.

```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt install nodejs
```

Se abbiamo bisogno di installare versioni differenti, basterà modificare il 13 nel primo comando. Creiamo la cartella e installiamo i pacchetti necessari tramite npm. NPM è il gestore di pacchetti di NodeJs, uno dei suoi punti di forza è il fatto che sia il gestore di pacchetti più ampio esistente al mondo. Creiamo una cartella nel nostro filesystem, personalmente preferisco sempre una struttura di questo tipo:

```
cd ~
mkdir asta
cd asta
touch server
npm i express cors body-parser mongodb
```
con l'ultimo comando abbiamo installato una serie di pacchetti npm che ci serviranno rispettivamente per importare il framework web, abilitare le richieste verso il nostro server da tutti i client, per effettuare i parse dei json, e il driver per collegarsi al database MongoDb.
Qui di seguito lascio alcuni link a documentazioni di riferimento utili:
<ul>
  <li><a href="http://expressjs.com/it/">Express</a></li>
  <li><a href="https://mongodb.github.io/node-mongodb-native/">Mongo Nodejs Driver</a></li>
  <li><a href="https://mongodb.github.io/node-mongodb-native/">Mongo Nodejs Driver</a></li>
  <li><a href="https://www.mongodb.com/">MongoDb</a></li>
</ul>
Installiamo anche Nodemon, in modo da non dover riavviare manualmente il server di sviluppo ogni volta che modifichiamo un file.

```
npm i -D nodemon
```

Lanciamo il comando di inizializzazione e modifichiamo gli script del file package.json, tutte le domande del wizard a terminale di configurazione iniziale possono ttranquillamente essere saltate premendo enter.

```
npm init
```

Il file cong.json avrà una struttura simile, assicuriamoci di modificare gli script come segue:

```
{
  "name": "asta",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongodb": "^3.6.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  },
  "scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js"
  },
  "author": "",
  "license": "ISC"
}
```

creiamo il file index.js:

```
cd ~/asta/server
touch index.js
```

ora nel nostro nuovo file, creiamo un server di prova:

```
//initialize expressjs and import modules we need for the functions
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//instantiate express framework
const app = express();

//some middlewares we need to validate and read requests to the server
app.use(bodyParser.json());
app.use(cors());

// open server on port 3000 if you can't read an ENV variable named PORT
//this is because some cloud providers prefer another 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
```

Per il momento non preoccupiamoci troppo del codice. Quello che ci interessa è che se lanciamo i seguenti comandi, dovremmo vedere da terminale che viene creato il server di sviluppo:

```
cd ~/asta
npm run dev
```

il terminale dovrebbe risponderci con un output simile a schermo:

```
> asta@1.0.0 dev /home/mattia/asta
> nodemon server/index.js

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server/index.js`
Example app listening at http://localhost:3000
```
