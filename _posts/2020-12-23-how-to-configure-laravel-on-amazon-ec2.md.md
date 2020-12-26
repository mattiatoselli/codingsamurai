---
layout: post
title:  "Creare una applicazione Laravel su AWS con Amazon EC2"
author: mattia
categories: [ AWS, tutorial, EC2, Laravel ]
image: assets/images/laravel-aws.png
featured: true
rating: 4.5
---
In questo articolo partiremo da alcuni presupposti. Per poterlo completare, avremo bisogno di creare un account su AWS e collegargli una carta di credito valida. Si tratta di un passaggio necessario per poter accedere ai servizi offerti, non verranno effettuati addebiti di alcun tipo, tutto ciò che faremo è disponibile all'interno del tier gratuito offerto da AWS.


## Amazon EC2

Amazon EC2 è un servizio di cloud computing che permette di eseguire server virtuali per far girare applicazioni e servizi web come in un tradizionale data center.

A differenza di quest’ultimo però, offre il vantaggio di poter effettuare il provisioning di server e risorse immediatamente in base alle proprie esigenze. Questo servizio introduce una serie di concetti che vanno approfonditi per comprenderne il funzionamento complessivo, in primo luogo istanze ed AMI. 

AMI sta per Amazon Machine Image, e si tratta di template che contengono il software necessario per dare vita ad un server virtuale. Nello specifico, ogni template contiene:

- Sistema operativo.
- Application server.
- Software aggiuntivi.

Le istanze EC2 sono copie di una AMI eseguite su una determinata configurazione hardware. In altre parole, l’istanza è il vero e proprio ambiente virtuale fatto di CPU, memoria, storage e banda internet che esegue il nostro pacchetto software, ovvero la nostra AMI.


## Laravel

Laravel è un framework PHP per la creazione di qualsiasi cosa, dalle applicazioni di piccole dimensioni a quelle di enterprise. Laravel è stato creato da Taylor Otwell nel giugno 2011 con l'obiettivo di avere una sintassi del codice semplice ed espressiva, che offre il vantaggio di avere un'applicazione Web che è facile da usare e codice gestibile.

È interessante notare che Laravel è stato visto migliorare di anno in anno. Ogni anno vengono implementate nuove funzionalità oltre alla correzione dei bug, tutto grazie alla sua disponibilità come framework PHP open source e alla comunità degli sviluppatori su GitHub.


## Stack

Ci sono alcune possibilità quando si sceglie un server web per PHP in Linux. Le più popolari sono Nginx e Apache. In questo caso useremo Apache.


## Creazione della EC2

Accediamo alla console del nostro account AWS e dopo esserci posizionati nela region di nostra scelta, selezioniamo il servizio EC2. Per prima cosa dobbiamo scegliere la AMI, nel nostro caso selezioniamo Amazon Linux 2 LTS. Tale AMI è disponibile per il free tier e quindi fa esattamente al caso nostro. Come tipologia sceglieremo la t2.micro.

Nel terzo passo possiamo lasciare tutto secondo impostazioni standard, verrà creata una VPC pubblica di default. Negli step successivi assegnamo lo storage di default e i tag che riteniamo opportuni. Infinev assegnamo un gruppo di sicurezza con i permessi di accesso per i protocolli SSH, HTTP ed HTTPS. 

Ricordiamoci di generare una chiave SSH per l'accesso alla istanza, in alternativa potremo già usare una di quelle che già abbiamo, se per qualche motivo su AWS ne abbiamo generata una. La chiave di accesso non deve essere persa, una volta generata non sarà possibile per alcun motivo generarne un'altra. Lanciamo l'istanza e attendiamo che parta.


## Installazione dei software

Apriamo un terminale Linux sul nostro PC e forniamo i giusti permessi alla chiave per la connessione ssh.

```bash
sudo chmod 400 laravel-coding-samurai.pem
```

Accediamo alla nostra istanza. Il nome dell'utente di default per le istanze Amazon Linux è "ec2-user" (nel caso di Ubuntu è "ubuntu" per esempio), l'indirizzo IP della macchina è disponibile nella visuale di dettaglio della stessa l'indirizzo ip nell'esempio seguente è completamente inventato.

```bash
ssh ec2-user@86.232.212.99 -i laravel-coding-samurai.pem
```

Aggiorniamo i pacchetti e installiamo Apache, poi lo avviamo.

```bash
sudo yum update -y
sudo yum install -y httpd httpd-tools mod_ssl
sudo systemctl enable httpd 
sudo systemctl start httpd 
```

Se visitiamo ora l'indirizzo IP della macchina dovremmo vedere la pagina di benvenuto di Apache. Attiviamo i pacchetti extras di Amazon Linux.

```bash
sudo yum install amazon-linux-extras -y
```

Controlliamo quali siano le versioni di PHP disponibili e installiamo l'ultima stabile disponibile, successivamente i pacchetti richiesti.

```
sudo amazon-linux-extras | grep php
sudo amazon-linux-extras enable php7.4 
sudo yum clean metadata 
sudo yum install php php-common php-pear 
sudo yum install php-{cgi,curl,mbstring,gd,mysqlnd,gettext,json,xml,fpm,intl,zip}
```

## Creazione del progetto Laravel e configurazione di Apache

A questo punto avremo bisogno di Git, Composer e successivamente di Laravel per poter partire col nostro progetto, avremo anche bisogno di aprire il file di configurazione di Apache con Nano.

```
yum install git -y
cd /var/www/html
git clone https://github.com/laravel/laravel.git
nano /etc/httpd/conf/httpd.conf
```

Alla fine del file copiamo questa configurazione.

```
Alias / /var/www/html/laravel/public/
<Directory "/var/www/html/laravel/public">
        AllowOverride All
        Order allow,deny
        allow from all
</Directory>
```

Modifichiamo il file .htaccess.

```
nano /var/www/html/laravel/public/.htaccess
```

Aggiungiamo la direttiva "RewriteBase /" sotto "RewriteEngine On".

copiamo il file di esempio delle configurazioni di ambiente, ed editiamolo:

```
cd /var/www/html/laravel
mv .env.example .env
nano .env
```

Il file di configurazione si presenterà così:

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=sqlite
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=database
BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

Dobbiamo anche creare il nostro database locale sqlite, riavviare Apache e installare Composer e le dipendenze di Laravel. Dobbiamo anche accordare i permessi nella cartella storage e nella cartella del DB.

```
cd /var/www/html/laravel/database
touch database.sqlite
service httpd restart
cd /var/www/html/laravel
yum install wget -y
wget https://getcomposer.org/composer.phar
php composer.phar
php composer.phar install
sudo chmod -R 775 database
sudo chmod -R 755 storage
```

infine, generiamo la chiave dela app e migriamo il database.

```
php artisan generate:key
php artisan migrate
```
