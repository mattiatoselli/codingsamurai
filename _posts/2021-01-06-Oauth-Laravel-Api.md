---
layout: post
title:  "Creare delle API di autenticazione sicure con Laravel Passport"
author: mattia
categories: [ Laravel, Api, Oauth, Passport]
image: assets/images/undraw_security_o890.png
rating: 4
---

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

## Configurazione

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

Modifichiamo il AuthServiceProvider in App\Providers\AuthServiceProvider:

```
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}
```

Nel file di configurazione config/auth.php impostare l'opzione driver di autenticazione per le api su passport. Qui stiamo dicendo a Laravel di utilizzare TokenGuard di Passport durante l'autenticazione delle richieste API in arrivo.

```
'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
            'hash' => false,
        ],
    ],
```

Creiamo il controller che ci permetterà di effettuare una richiesta di autenticazione per i nostri utenti:

```
./sail artisan make:controller api/v1/LoginController
```

di seguito il codice da inserire nel controller appena creato:

```
<?php

namespace App\Http\Controllers\api\v1;

//modules
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//models
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request) {
        //validate the login request
        $login = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        //if request not valid return unauthenticated state
        if (!Auth::attempt($login)){
            return response()->json([
                'status' => '401',
                'response' => 'Credentials are invalid',
            ]);
        }
        //if login succeed issue an access token for our user
        $token = Auth::user()->createToken('Token Name')->accessToken;
        return response()->json([
            'status' => '200',
            'response' => 'Authorized',
            'token' => $token,
        ]);
    }
}
```

Trasferiamo il file api.php dentro una nuova cartella app/Resources/Routes/api/v1, questo ci permetterà di avere sempre il controllo delle versioni da attivare nelle nostre API, Se andiamo infatti nel nostro RouteServiceProvider.php, possiamo editare il file di routing a cui vengono rimandate le richieste verso certi endpoint:

```
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::prefix('api/v1')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api/v1/api.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });
    }
```

Va da se che quando decideremo di rilasciare una seconda versione delle API, ci basterà creare una cartella v2, scriverle e testarle e successivamente cambiare la cartella di riferimento nel nostro RouteServiceProvider e il prefisso degli endpoint in "api/v2" o cosa preferiamo. Modifichiamo il file api.php appena spostato:

```
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\api\v1\LoginController;


Route::prefix("/user")->group(function (){    
    Route::post('/login', [LoginController::class, 'login'])
        ->name('api.login');
});
```

ora possiamo effettuare un test tramite Postman, registriamo un utente, e successivamente effettuiamo una richiesta di questo tipo:

```
Metodo: POST
endpoint: http:localhost/api/v1/user/login
Headers[
Content-Type : application/json
]
payload: 

{
    "email" : "myname@mymail.com",
    "password" : "passssssswordddddd"
}
```

Verrà restituito questo payload:

```
{
    "status": "200",
    "response": "Authorized",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmQxZjZhNmE0ODQ1Y2FiMjM5ODA1NjIyOTliYzVmZWNmYmI4Mjg2ZGI1YjVkMTMxZTAxMjQyYTc1Y2Q3NWVmZmM2NDc0M2Y0YmY4NGU4ZTgiLCJpYXQiOiIxNjA5OTc2ODkwLjYwOTY5MyIsIm5iZiI6IjE2MDk5NzY4OTAuNjA5NzAwIiwiZXhwIjoiMTY0MTUxMjg4OS40ODYxMDciLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.db9NXq6J7tVm-mq0YPtxjW0iY0z4PDTqNjQTIhCayL_yub50sidGYW8P9DozTKc1BZ1mRddEDtAzRK8b3waksd4EJQav0x7OIM5erox0j3qnOOCWXu7sPL7nKm4CAUia1X6wYPWaRspF0pNjkupY4pyWuv9rb2MqELz0F4nuYDTr4st3tvhGCYyCcJg2oWML5YL37MljHGCGQD_fYTHaeqM0XrseLUJxdGq5pun9HyozFZzg1eDKXNGIf5EHoMl8_QNwyVD4x-p5cXRpwZF8S3LIjJQRQ8wx6rhtNemZbRBzRymyzlL0SUh39l2qbo-n40xChevTs3Hjnguvj7CCeLNOiyBfH98WwlTPbWdrAoZdVIpHV0V-qVdBRUeANPU6YzLRER-PBj0XdiKgORToaH4zBdxx98H_Nx2pOv50yj8eqXwbGYKYsrqNL5yomKF54qW12xWHOrOdR-m0E00E68xUNTx4qyXy__QGV6bxJR4C6Y57V2mWCXpOntfZax7HPClJb96IytpGTXbsZdKv-sgDGAS8b5DsjDBi5LsTBF81lAlsAtHDVPn3Eb2nsJSV6fsYxBOadGIeLXcgOSdwxeJWvNenKEQ4qbBx5jNksSy05c0k-Nu4S1rrk5LjHtcH6ePHE5EYUR6ex80oLORCTkdlOZ2NUI6wPBM1yvaQgr8"
}
```


