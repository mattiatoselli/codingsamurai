---
layout: post
title:  "Come sfruttare le API di Google Translate per effettuare traduzioni con Python"
author: mattia
categories: [ Python, Google, API, Machine Learning]
image: assets/images/python-logo.jpg
rating: 1
---

Python offre una serie di possibilità veramente infinite. Per un progetto di machine learning aziendale, ultimamente mi son trovato a chiedermi se per caso fosse possibile effettuare traduzioni con questo linguaggio. Ben sapendo che Python ha praticamente un modulo per qualunque cosa, mi son messo alla ricerca, ecco cosa ne ho ricavato.


## Download del modulo

Purtroppo i moduli ufficiali sulla documentazione di Python non sono più supportati, ciò è dovuto al fatto che le API di google sono cambiate. Questa azienda effettivamente ha il brutto vizio di cambiare costantemente le sue API di accesso ai servizi senza dare sufficiente preavviso della cosa. Per fortuna, ho trovato un modulo sviluppato da dei ragazzi volenterosi su <a href="https://github.com/lushan88a/google_trans_new" Github</a>.

Prima di tutto, installiamo traite pip il modulo.

```
pip install google_trans_new
```

## Utilizzo basilare

```
from google_trans_new import google_translator  
  
translator = google_translator()  
translate_text = translator.translate('Cerco un centro di gravità permanente che non mi faccia più cambiare idea sulle cose e sulla gente',lang_src='it', lang_tgt='en') 
print(translate_text)

//I'm looking for a permanent center of gravity that no longer makes me change your mind about things and people (beh Google non è proprio il significato preciso.... ma quasi!)
```

La cosa interessante, è che il parametro lang_src è completamente opzionale, in caso di mancato inserimento, il programma sfrutterà gli algoritmi di machine learning di Google per tentare di riconoscere il linguaggio di origine della frase.
