---
layout: post
title:  "Sviluppo di una app completa in Firebase: parte 1"
author: mattia
categories: [ Serverless, Javascript, Firebase ]
image: "assets/images/firebasehost.jpg"
rating: 5
---

In questo articolo creeremo un progetto completamente basato su Firebase, che permetta a chiunque di autenticarsi, proporre dei tutorial o degli argomenti da trattare, e a chiunque di aggiungere un like o un dislike all'argomento, in modo da mostrare a cosa sia più interessata la community.

## Preparazione del progetto

Registriamoci a Firebase, successivamente controlliamo di aver installato NodeJs sul nostro pc, e lanciamo da terminale i seguenti comandi:

```
npm install -g firebase-tools
firebase init ==> da lanciare nella cartella in cui vogliamo creare il progetto (selezioniamo il servizio Hosting con il cursore e premendo la barra spaziatrice, poi confermando con invio)
```

Selezioniamo i servizi di hosting, authentication, firestore, functions e storage. Analizzeremo tutti questi servizi mano a mano ce ci serviranno. Inizialmente i verrà detto che il nostro progetto necessita di un database ed il wizard andrà in errore, fornendoci un link a cui inserire il db. Creiamolo in modalità di test, e rilanciamo il comando selezionando questa volta il progetto precedentemente creato.
Qui di seguito il wizard con le mie risposte.

```
You're about to initialize a Firebase project in this directory:

  /home/mattia/poll-firebase

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. Firestore: Deploy rules and create indexes for Firest
ore, Functions: Configure and deploy Cloud Functions, Hosting: Configure and deploy Firebase Hosting sites, Storage: Deploy Cloud Storage security rules, Emulators: Set up local emulators fo
r Firebase features

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add, 
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: poll-tutorials (poll-tutorials)
i  Using project poll-tutorials (poll-tutorials)

=== Firestore Setup

Firestore Security Rules allow you to define how and when to allow
requests. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore Rules? firestore.rules

Firestore indexes allow you to perform complex queries while
maintaining performance that scales with the size of the result
set. You can keep index definitions in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore indexes? firestore.indexes.json

=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? JavaScript
? Do you want to use ESLint to catch probable bugs and enforce style? Yes
✔  Wrote functions/package.json
✔  Wrote functions/.eslintrc.js
✔  Wrote functions/index.js
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes

> protobufjs@6.11.2 postinstall /home/mattia/poll-firebase/functions/node_modules/protobufjs
> node scripts/postinstall

npm notice created a lockfile as package-lock.json. You should commit this file.
added 312 packages from 240 contributors and audited 312 packages in 17.516s

23 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
✔  Wrote public/404.html
✔  Wrote public/index.html

=== Storage Setup

Firebase Storage Security Rules allow you to define how and when to allow
uploads and downloads. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Storage Rules? storage.rules

=== Emulators Setup
? Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices. Authentication Emulator, Functions Emulator, Firestore Emulator, Databa
se Emulator, Hosting Emulator, Pub/Sub Emulator
? Which port do you want to use for the auth emulator? 9099
? Which port do you want to use for the functions emulator? 5001
? Which port do you want to use for the firestore emulator? 8080
? Which port do you want to use for the database emulator? 9000
? Which port do you want to use for the hosting emulator? 5000
? Which port do you want to use for the pubsub emulator? 8085
? Would you like to enable the Emulator UI? Yes
? Which port do you want to use for the Emulator UI (leave empty to use any available port)? 
? Would you like to download the emulators now? Yes
i  firestore: downloading cloud-firestore-emulator-v1.11.15.jar...
Progress: ====================================================================================================================================================================> (100% of 61MB)
i  database: downloading firebase-database-emulator-v4.7.2.jar...
Progress: ====================================================================================================================================================================> (100% of 29MB)
i  pubsub: downloading pubsub-emulator-0.1.0.zip...
Progress: ====================================================================================================================================================================> (100% of 37MB)
i  ui: downloading ui-v1.4.2.zip...

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...
i  Writing gitignore file to .gitignore...

✔  Firebase initialization complete!
```

## Sviluppo in locale

Una volta finito possiamo lanciare il progetto sulla porta 5000, per farlo basterà usare:
```
firebase serve ==> lancia un server di sviluppo in ascolto sula porta 5000 in locale.
```
