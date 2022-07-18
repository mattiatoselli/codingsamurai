---
layout: post
title:  "Golang: tutorial base al linguaggio di Google"
author: mattia
categories: [GOLANG]
image: "assets/images/go-gopher.png"
---

Il linguaggio è stato concettualizzato da Robert Griesemer, Rob Pike e Ken Thompson, tre ingegneri di Google.
Go (o Golang) utilizza e adatta le buone idee di vari linguaggi di programmazione, 
evitando le funzionalità che hanno portato a codice complesso, 
instabile e inaffidabile.
E' particolarmente adatto, ad esempio per lo sviluppo di infrastrutture server, servizi basati su API, o applicazioni che fanno largo uso di processi concorrenti.

## Pros
* Staticamente e rigidamente tipizzato, e compilato, di conseguenza permette di scrivere codice molto robusto.
* Comunità particolarmente attiva.
* Moltissime librerie native.
* Semplicità.
* Tempo di compilazione molto veloce, e di conseguenza tempo di debugging e testing limitato.
* Ottimo garbage collector, ma la gestione della memoria può essere gestita anche manualmente, in caso di applicazioni particolarmente critiche sotto questo punto di vista..
* Gestione della concorrenza nativo, senza bisogno di importare moduli o librerie.
* Go compila tutto l'applicativo in un singolo binario, di conseguenza non è necessario impazzire con dipendenze, Dll, moduli e cose simili.

# Hello world!
Cominciamo utilizzando il playground offerto dagli sviluppatori al link: https://go.dev/play/.

```
//tutte le applicazioni Go sono composte da "packages".
//package main sarà sempre il punto di ingresso di tutte le applicazioni Go

package main

//import permette di importare pacchetti aggiuntivi, fmt, per esempio è il pacchetto che permette di formattare stringhe
import "fmt"

// la funzione main è sempre il punto di ingresso di ogni applicativo in Go
func main() {
	//Println è la funzione del modulo fmt per stampare e andare a capo.
	fmt.Println("Hello world!")
	fmt.Println("Hello from Golang!")
}
```
