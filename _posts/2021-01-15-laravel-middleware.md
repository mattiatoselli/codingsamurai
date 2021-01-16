---
layout: post
title:  "Creare un middleware custom su Laravel"
author: mattia
categories: [ Laravel, Api, middleware, php]
image: assets/images/undraw_security_o890.png
rating: 2.5
---


In questo articolo creeremo un middleware per Laravel per verificare che un utente che effettua una richiesta verso le API di backend sia un admin.
Se l'utente non è loggato, o se non è un admin, la richiesta non verrà soddisfatta. Per la creazione di un servizio di autenticazione e di consumo di API con Laravel, 
si rimanda a questo <a href="https://mattiatoselli.github.io/codingsamurai/Oauth-Laravel-Api/">precedente articolo</a>.
