---
layout: post
title:  "Creare una pipeline di sviluppo con Github, Beanstalk e CodePipeline"
author: mattia
categories: [ Laravel, Api, continuous integration, continuous deployment]
image: assets/images/undraw_good_team_m7uu.png
rating: 2
---

In questo articolo andremo a creare una pipeline di sviluppo molto semplice utilizzando alcuni servizi di AWS e Github. Sebbene questo tutorial faccia uso di laravel, è possibile utilizzarlo per qualunque altro ambiente di sviluppo.
Ci rifaremo alla configurazione utilizzata in questo <a href="https://mattiatoselli.github.io/codingsamurai/Laravel-Beanstalk-deploy/">precedente articolo</a>.

In questa pipeline ci collegheremo ad un repository Github privato e utilizzeremo il servizio CodePipeline di AWS per effettuare gli aggiornamenti del codice in tempo reale. Ogni volta che eseguiamo un push tramite Git sul branch scelto come main, il servizio scarica il codice, ci chiede una autorizzazione manuale, in seguito alla sua approvazione lo aggiorna su tutte le istanze EC2 di beanstalk senza tempi di downtime per gli utenti.


## Creazione della pipeline di sviluppo

Dalla console di AWS scegliamo CodePipeline creiamo una nuova Pipeline, assegnamo un nome e lasciamo le impostazioni di default per creare un nuovo ruolo, selezioniamo Github 1 come provider di codice e Github webhooks come opzioni di rilevamento, dovremo anche assegnare un repository e un branch a cui fare riferimento.

Nella fase 2 saltiamo la fase di compilazione, mentre nella terza fase dobbiamo dare al sistema una piattaforma di deploy del codice, ci basterà selezionare Beanstalk e l'ambiente su cui vogliamo collegare la Pipeline. Se ora effettuiamo un push sul branch scelto tramite git, vedremo che la pipeline viene avviata e nel giro di poco tempo il codice verrà aggiornato sulla nostra applicazione.

Come passo aggiuntivo, una volta che la Pipeline è pronta, possiamo anche aggiungere una approvazione manuale tra il passo di presa del codice e deploy, in questo modo potremo configurare un sistema che ci permetta prima di revisionare i cambiamenti ed effettuare il deploy solo dopo autorizzazione.

Il vantaggio di codepipeline è proprio quello di poter effettuare modifiche alla Pipeline in maniera dinamica senza effetti sulla nostra applicazione.
