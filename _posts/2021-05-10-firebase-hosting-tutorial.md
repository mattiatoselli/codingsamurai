---
layout: post
title:  "Sviluppo di una app completa in Firebase: parte 2, deploy"
author: mattia
categories: [ Serverless, Javascript, Firebase, Hosting ]
image: "assets/images/firebasehost.jpg"
rating: 4
---

In questo articolo continuiamo il nostro porgetto eseguendo una dele azioni più semplici. La messa in funzione della nosta app. Per la spiegazione del progetto, invito a prendere visione della prima parte del tutorial.

## Caricamento delle risorse su Firebase

Come abbiamo visto nel precedente tutorial, tutto parte da index.html. Cancelliamo lo stile e il contenuto di default, e creiamo una pagina di login. Tale pagina al momento non fa nulla, se non presentare un form di login, che alla pressione del tasto di sottomissione del odulo, si limita a mostrare un caricamento infinito. Il progetto farà uso di javascript vanilla e di materialize.css. Lanciamo nztutto il server di sviluppo:

```
firebase serve ==> verrà lanciato un server di sviluppo accessibile in locale sulla porta 5000
```

Modifichiamo il file index.html:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Firebase Hosting</title>

    <!-- update the version number as needed -->
    <script defer src="/__/firebase/8.5.0/firebase-app.js"></script>
    <!-- include only the Firebase features as you need -->
    <script defer src="/__/firebase/8.5.0/firebase-auth.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-database.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-firestore.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-functions.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-messaging.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-storage.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-analytics.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-remote-config.js"></script>
    <script defer src="/__/firebase/8.5.0/firebase-performance.js"></script>
    <!-- 
      initialize the SDK after all desired features are loaded, set useEmulator to false
      to avoid connecting the SDK to running emulators.
    -->
    <script defer src="/__/firebase/init.js?useEmulator=true"></script>

    <!-- import materialize css and material icons-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">

    <style>
      body {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }
  
      main {
        flex: 1 0 auto;
      }
  
      body {
        background: #fff;
      }
  
      .input-field input[type=date]:focus + label,
      .input-field input[type=text]:focus + label,
      .input-field input[type=email]:focus + label,
      .input-field input[type=password]:focus + label {
        color: #5a34c0;
      }
  
      .input-field input[type=date]:focus,
      .input-field input[type=text]:focus,
      .input-field input[type=email]:focus,
      .input-field input[type=password]:focus {
        border-bottom: 2px solid #6821b8;
        box-shadow: none;
      }
    </style>
  </head>
  <body>
    <div class="section"></div>
  <main>
    <center>
      <div class="section"></div>
      <div class="container">
        <div class="z-depth-1 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">
          <div id = "login-loader" class="progress indigo" >
            <div class="indeterminate white"></div>
          </div>
          <form class="col s12" method="post">
            <div class='row'>
              <div class='col s12'>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='email' name='email' id='email' />
                <label for='email'>Email</label>
              </div>
            </div>

            <div class='row'>
              <div class='input-field col s12'>
                <input class='validate' type='password' name='password' id='password' />
                <label for='password'>Password</label>
              </div>
              <label style='float: right;'>
								<a class='indigo-text' href='#!'><b>Forgot Password?</b></a>
							</label>
            </div>

            <br />
            <center>
              <div class='row'>
                <button id="toggle-login" name='btn_login' class='col s12 btn btn-large waves-effect indigo'>Login</button>
              </div>
            </center>
          </form>
        </div>
      </div>
      <a href="#!">Crea un account</a>
    </center>

    <div class="section"></div>
    <div class="section"></div>
  </main>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>

    <script>
      document.addEventListener('DOMContentLoaded', function() {
        document.getElementById("login-loader").style.display= "none";
        const loadEl = document.querySelector('#load');
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
        //
        // firebase.auth().onAuthStateChanged(user => { });
        // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
        // firebase.firestore().doc('/foo/bar').get().then(() => { });
        // firebase.functions().httpsCallable('yourFunction')().then(() => { });
        // firebase.messaging().requestPermission().then(() => { });
        // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
        // firebase.analytics(); // call to activate
        // firebase.analytics().logEvent('tutorial_completed');
        // firebase.performance(); // call to activate
        //
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

        try {
          let app = firebase.app();
          let features = [
            'auth', 
            'database', 
            'firestore',
            'functions',
            'messaging', 
            'storage', 
            'analytics', 
            'remoteConfig',
            'performance',
          ].filter(feature => typeof app[feature] === 'function');
          loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
        } catch (e) {
          console.error(e);
          loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
        }
      });

      document.getElementById("toggle-login").addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById("login-loader").style.display= null;
      });
    </script>
  </body>
</html>

```

## Deploy di un progetto

Una volta soddisfatti del progetto, possiamo distribuire tutto il contenuto della cartella public tramite il comando:
```
firebase deploy ==> Distribuisce tutto il codice nella cartella public e restituisce l'URL della nuova versione del progetto
```
