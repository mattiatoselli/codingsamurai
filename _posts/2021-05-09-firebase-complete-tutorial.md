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
connettendoci in locale alla porta 5000 vedremo la pagina inziale. Vediamo ora la struttura dei file del progetto:

![image](https://user-images.githubusercontent.com/44556380/120886422-26df7880-c5ee-11eb-93ca-bfb5c34e355e.png)

Nella cartella public sono inclusi i file che vengono serviti agli utenti, mentre nella cartella functions è inserita la logica delle cloud functions. Il file index.html è il punto di ingresso e corrisponde alla route del nostro progetto.
Il file 404.html è quello verso cui si viee rediretti in automatico se non vi sono risorse disponibili e quindi si genera un errrore 404.
I vari file con estensione .rules e .indexes contengono le regole di accesso e gli indici dei database.

## Implementazione di un sistema di autenticazione

Firebase Autthentication permette di creare in poche righe di codice un sistema di registrazione e login sia personalizzato, sia appoggiandosi a Google, Facebook o Twitter. In questo modo sarà possibile gestire i vari profili utente in totale sicurezza.
In questo tutorial, per aiutarci, utilizzeremo anche Vue e Materialize css per aiutarci e semplificarci il lavoro. Nel file index.html creeremo il form di login e registrazione, in cui sarà possibile autenticarsi utiizzando Google, o la classica autenticazione con email e password.

Per prima cosa, dalla console del nostro progetto, attiviamo il servizio Authentication e abilitiamo Google ed Email & Password nel tab "sign methods".
Una volta fatto, possiamo creare la nostra pagina di login, creiamo un nuovo file e chiamiamolo login.html:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Drivers-poll Login</title>
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <!-- update the version number as needed -->
    <script defer src="/__/firebase/8.6.2/firebase-app.js"></script>
    <!-- include only the Firebase features as you need -->
    <script defer src="/__/firebase/8.6.2/firebase-auth.js"></script>
    <script defer src="/__/firebase/8.6.2/firebase-firestore.js"></script>
    <script defer src="/__/firebase/8.6.2/firebase-functions.js"></script>
    <script defer src="/__/firebase/8.6.2/firebase-storage.js"></script>
    <script defer src="/__/firebase/init.js?useEmulator=false"></script>
    <!--icons-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <body>
    <div class="container" id="app">
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row">
            <div class="col s4 offset-s4">
                <div class="input-field col s12">
                    <i class="material-icons prefix">email</i>
                    <input type="email" id="email" class="autocomplete" v-model="email">
                    <label for="email">Email</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s4 offset-s4">
                <div class="input-field col s12">
                    <i class="material-icons prefix">lock</i>
                    <input type="password" id="password" class="autocomplete" v-model="password">
                    <label for="password">Password</label>
                </div>
            </div>
        </div>
      
      <div v-if="!loading" class="row">
        <div class="col s8 offset-s4">
            <a class="waves-effect waves-light btn indigo" v-on:click='login()'><i class="material-icons left">login</i>login</a>
            <a class="waves-effect waves-light btn red" v-on:click="googleAuth()"><i class="material-icons left">perm_identity</i>google</a>
            <a class="waves-effect waves-light btn purple" v-on:click="register()"><i class="material-icons left">person_add</i>registrati</a>
        </div>
      </div>

      <div v-if="loading" class="row">
        <div class="col s4 offset-s4">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
      <!-- development version, includes helpful console warnings -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  </body>
</html>
```

ovviamente, questo è solo l'html, ma abbiamo già importato firebase, materialize, e vue, ora dobbiamo renderlo interattivo. L'obiettivo è quello di creare una pagina che se verifica che l'utente è già autenticato, reindirizzi verso la vera e propria applicazione, il file index.html
Per prima cosa vogliamo verificare lo stato dell'utente. Per farlo, Authentication fornisce un listener facilmente implementabile. Generalmente questo tipo di funzioni deve essere lanciato tramite l'implementazione dei life cycle hooks, per maggiori dettagli rimando alla documentazione ufficiale <a href="https://v3.vuejs.org/api/options-lifecycle-hooks.html#mounted">qui</a>.

Aggiungiamo questo script poco appena prima del tag di chiusura del body:

```
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            //after document loaded, instantiate vue, first function to be launched is mounted method
            //instantiate vuejs:
            var app = new Vue({
                el: "#app",
                data: {},
                mounted(){
                    //verify user, if logged in redirect to index.html
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            window.location.href = "/index.html";
                        } else {
                            //do nothing and wait for authentication
                        }
                    });
                }
            });
        });
    </script>
```
Il metodo onAuthStateChanged è un listener che verifica istantaneamente eventuali cambi di stato nell'autenticazione dell'utente. Una volta presente nella nostra pagina html, provvederà istantaneamente a triggerare eventuali reazioni al logout o al login.

Implementiamo ora i metodi per l'autenticazione:

```
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            //after document loaded, instantiate vue, first function to be launched is mounted method
            //instantiate vuejs:
            var app = new Vue({
                el: "#app",
                data: {
                    email: "",
                    password: "",
                    loading: false
                },
                mounted(){
                    //verify user, if logged in redirect to index.html
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            window.location.href = "/index.html";
                        } else {
                            //do nothing and wait for authentication
                        }
                    });
                },
                methods: {
                    // the actual login function, this triggers when a user tries the email-password login
                    login: function() {
                        this.loading = !this.loading;
                        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then((userCredential) => {
                            //if authentication succeed execute this code
                            var user = userCredential.user;
                            console.log(user);
                            M.toast({html: user.email + "Authenticated", classes: 'rounded teal'});
                            this.loading = !this.loading;
                        })
                        .catch((error) => {
                            //if authentication fails execute this code
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            M.toast({html: errorMessage, classes: 'rounded red'});
                            this.loading = !this.loading;
                            this.email = "";
                            this.password = "";
                        });
                    },
                    //register a user with email ad password
                    register : function() {
                        this.loading = !this.loading;
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                        .then((userCredential) => {
                            // Signed in 
                            var user = userCredential.user;
                            console.log(user);
                            M.toast({html: user.email + "Created", classes: 'rounded teal'});
                            this.loading = !this.loading;
                        })
                        .catch((error) => {
                            //some data is invalid
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            M.toast({html: errorMessage, classes: 'rounded red'});
                            this.loading = !this.loading;
                            this.email = "";
                            this.password = "";
                        });
                    },
                    //this methods is usefult to implement oogle subscription or login with a pop up
                    googleAuth: function() {
                        this.loading = !this.loading;
                        var provider = new firebase.auth.GoogleAuthProvider();
                        firebase.auth().signInWithPopup(provider)
                        .then((result) => {
                            var credential = result.credential;
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            var token = credential.accessToken;
                            // The signed-in user info.
                            var user = result.user;
                            M.toast({html: user.email + "Created", classes: 'rounded teal'});
                            this.loading = !this.loading;
                        }).catch((error) => {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // The email of the user's account used.
                            var email = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            var credential = error.credential;
                            M.toast({html: errorMessage, classes: 'rounded red'});
                            this.loading = !this.loading;
                            this.email = "";
                            this.password = "";
                        });
                    }
                }
            });
        });
    </script>

```

Questi tre metodi permettono agli utenti di iscriversi o mostrano il messaggio di errore in caso di problemi. Abbiamo creato in pochissimo tempo un sistema di autenticazione sicuro e senza alcun problema.
