---
layout: post
title:  "Introduzione a Docker"
author: mattia
categories: [ Container, Docker, Linux ]
image: "assets/images/docker-container.jpg"
rating: 2
---

AWS Elastic Beanstalk è un servizio di semplice utilizzo per distribuire e ridimensionare applicazioni e servizi Web sviluppati con Java, .NET, PHP, Node.js, Python, Ruby, Go e Docker su server comuni come Apache, Nginx, Passenger e IIS.

Caricando semplicemente il proprio codice, Elastic Beanstalk gestisce automaticamente l'implementazione, il provisioning di capacità, auto scaling e monitoraggio della salute dell'applicazione. Al contempo, l'utente mantiene il completo controllo sulle risorse AWS su cui si basa la sua applicazione e può accedere in qualsiasi momento alle risorse implicate.

Non vi è alcun costo aggiuntivo per Elastic Beanstalk: si paga solo per le risorse AWS necessarie per archiviare ed eseguire le proprie applicazioni.

Il vantaggio è presto detto: una volta configurato correttamente un ambiente con Amazon Elastic Beanstalk, ci si dimentica completamente dell'infrastruttura e ci si concentra unicamente sul codice, con ricadute più che positive in termini di tempo e produttività per gli sviluppatori, ed economici e di stabilità per quanto riguarda la propria applicazione.

In questo articolo effettueremo il deploy di una applicazione Laravel con database MySql su questo servizio. Daremo per assodate le conoscenze del framework e di MySql.


## Creazione dell'ambiente

Rechiamoci sulla pagina del servizio AWS dalla console e creiamo un ambiente nuovo, come piattaforma scegliamo PHP 7.4 su Amazon Linux 2, proseguiamo partendo con codice proprio. Zippiamo l'intera cartella di Laravel a partire dalla radice (dopo aver installato anche i necessari moduli PHP e aver modificato il file .env, per esempio settando a false il valore DEBUG, inserendo prod come al posto di local per APP_ENV, e avendo lanciato il necessario comando per generare la app key.

Una volta caricato il codice, selezioniamo in basso il tasto "configura ulteriori opzioni".

Nella finestra in alto abbiamo a disposizione la tipologia di ambiente e la disponibilità che desideriamo. per ambienti di produzione sarà necessario creare degli ambienti ad alta disponibilità, ma in questo caso sceglieremo istanza singola, una volta completata questa configurazione di base lanciamo la creazione dell'ambiente, che richiederà anche qualche minuto. Se ora ci rechiamo sulla pagina di dettaglio della applicazione e clicchiamo sul suo URl, verremo accolti da un poco rassicurante errore 403 di Nginx, poco male, vediamo come risolvere.


## Risoluzione errore 403 all'avvio

Il problema è dato dal fatto che la root della configurazione di base del server Nginx è /index.php per questo tipo di ambienti, mentre nei progetti Laravel tale file si trova in "public". 

Per risolvere, rechiamoci nella pagina delle configurazioni (sidebar a sinistra nella pagina di dettaglio della applicazione) e selezioniamo "software". Da qui possiamo modificare i server web del nostro ambiente, lasciamo pure Nginx, ma modifichiamo la root in /public/ alla voce Radice documento.

Se nel nostro progetto Laravel avevamo altre route, proviamo ad andarci e vedremo un altrettanto bellissimo errore 404!


## Risoluzione errore 404 sulle route diverse da /

L'errore è dovuto alla accoppiata Nginx + PHP 7.4. Si tratta sostanzialmente di un errore nel modulo di riscrittura delle route del server, per modificarlo possiamo caricare nuovamente il codice, con un file .platform/nginx/conf.d/elasticbeanstalk/laravel.conf, in cui inseriamo questo codice:

```
location / {
try_files $uri $uri/ /index.php?$query_string;
} 
```

Zippiamo nuovamente e ricarichiamo il codice.


## Installazione database

Se proviamo ad effettuare una qualunque operazione a database, l'applicazione solleverà un'altra eccezione, questa volta con tutte le ragioni del mondo. Non abbiamo collegato alcun database! Le scelte sono sostanzialmente tre:

1) Collegare un database tramite la configurazione guidata di Elastic Beanstalk, in questo caso avremo la facilità di configurazione dalla nostra, ma non avremo modo di utilizzare alcune features di Beanstalk come ad esempio il canary deployment o la possibilità di accedere al database esternamente (per esempio con un client Workbench). In verità possiamo comunque accedere al database grazie a Tinker bypassando il problema attraverso l'accesso SSH da una istanza EC2.
Dovremo recarci nel tab di sicurezza della app beanstalk ed assegnare una coppia di chiavi EC2, in qualunque momento potremo ocnnetterci tramite connessione SSh ad una delle macchine che compongono l'ambiente e lanciare una sessione di tinker tramite il classico comando PHP proprio di Laravel.

2) Collegare un database esterno (in questo caso dobbiamo passare noi le variabili di ambiente per collegarci al DB. In questa seconda casistica abbiamo alcune complicazioni in più, dobbiamo correttamente creare delle VPC e delle variabili di ambiente, il vantaggio è quello di avere maggiore libertà di accesso e gestione del database, oltre a poter usare il canary deployment. Per farlo, basta seguire la documentazione ufficiale di AWS, a questo <a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/rds-external-ec2classic.html">articolo</a>.

3) Creare un db esterno senza alcun gruppo di sicurezza e utilizzare le credenziali del database per l'accesso. Si tratta di una configurazione che in caso di dati altamente sensibili non è assolutamente da considerarsi sicura, ma per applicazioni meno importanti può comunque essere presa in considerazione, ovviamente tutta la sicurezza dell'ambiente si basa unicamente sul fatto che le credenziali del Db non vengano mai scoperte.

Dato che a noi piace fare le cose per bene, sceglieremo il secondo metodo. La documentazione fornita in questo caso è (stranamente per quella di solito fornita da AWS corretta e completa). Seguiamola fino in fondo e prepariamoci a modificare per un'ultima volta il codice e ricaricarlo al termine del processo.

Da notare come in realtà nulla vieti anche di poter accedere comunque alle macchine dell'ambiente tramite SSh, se si sceglie la seconda metodologia, basta settare una chiave di accesso.


## Configurazione finale e prima migrazione

Modifichiamo le prime righe del file app/config/database.php

```
<?php
define("RDS_HOSTNAME", $_SERVER["RDS_HOSTNAME"]);
define("RDS_USERNAME", $_SERVER["RDS_USERNAME"]);
define("RDS_DB_NAME", $_SERVER["RDS_DB_NAME"]);
define("RDS_PASSWORD", $_SERVER["RDS_PASSWORD"]);
define("RDS_PORT", $_SERVER["RDS_PORT"]);

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------*/

    'default' => env('DB_CONNECTION', 'mysql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------*/

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DATABASE_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

        'mysql' => [
            'driver' => 'mysql',
            //'url' => env('DATABASE_URL'),
            'host' => RDS_HOSTNAME,
            'port' => RDS_PORT,
            'database' => RDS_DB_NAME,
            'username' => RDS_USERNAME,
            'password' => RDS_PASSWORD,
```

Modifichiamo il nostro file app/AppServiceProvider.php per evitare problemi di compatibilità con vecchie versioni di MySql:

```
<?php

namespace App\Providers;

use Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
```


## Eseguire la prima migrazione durante il deploy

Beanstalk offre la possibilità di lanciare degli script al deploy, basta creare una cartella .ebextensions e dentro di essa dei file con sintassi yml, personalmente preferisco eseguire il tutto manualmente tramite le macchine EC2 dell'ambiente, ma è utile saperlo. Creiamo un file ./ebextensions/container_commands:

```
container_commands:
	01execute_migrations: "php artisan migrate"
```
Si tenga conto che i comandi scritti dentro questi file verranno eseguiti ogni volta che sono presenti in una distribuzione!


## nota sull'uso con Laravel Sail

Se viene utilizzato Laravel con Sail, l'unica soluazione che ho trovato è modificare il gruppo di sicurezza per accettare traffico dal nostro IP, settare manualmente le credenziali del Db, e lanciare la migrazione dal nostro ambiente, per poi copiare nuovamente AppServiceProvider.php con le variabili di ambiente settate, in futuro se dovessi elaborare nuove metodologie più automatizzate, aggiornerò l'articolo.
