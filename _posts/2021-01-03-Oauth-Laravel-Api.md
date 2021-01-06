---
layout: post
title:  "Creare delle API di autenticazione sicure con Laravel Passport"
author: mattia
categories: [ Laravel, Api, Oauth, Passport]
image: assets/images/undraw_security_o890.png
rating: 4
---

## Hands On

In questo articolo vedremo una metodologia di sviluppo pulita per le api di una potenziale applicazione in ambito Enterprise, vedremo come versionare delle API, 
come creare un sistema di autenticazione scalabile e sicuro, e che permetta a qualunque client di connettersi e interagire col nostro sistema. Per farlo partiremo dal presupposto 
che il lettore conosca il framework Laravel e abbia una idea generale di come vengono create e consumate delle API, e abbia in mente lo standard Oauth di autenticazione.


# Installazione di Laravel Passport

Mentre proseguiamo col nostro tutorial teniamo sempre d'occhio la documentazione. Attualmente alla versione 8. Disponibile a questo link: https://laravel.com/docs/8.x/passport.

Installiamo Passport e lanciamo una migrazione del database, inoltre genriamo le chiavi di crittazione per itoken di accesso. Nel mio caso sto utilizzando Laravel Sail per containerizzare l'applicazione in sviluppo, in caso di installazioni locali basta semplicemente rimuovere sail dal comando ed al suo posto utilizzare php.

```
./sail composer require laravel/passport
./sail artisan migrate
./sail artisan passport:install
```

Modifichiamo le prime righe del file app/models/user.php inserendo questo codice:

```
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
```
