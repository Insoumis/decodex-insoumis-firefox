# Extension

Cette extension est basée sur l'extension «décodex» des décodeurs du monde.

Son but est d'informer le visiteur d'un site internet sur le ou les
propriétaires du média, quels sont ses intérêts (Construction, Armement, …)

## Test

```
sudo apt-get install npm
npm install -g web-ext
web-ext run
```

## Alternative

1) git clone https://github.com/Insoumis/decodex-firefox (ou télécharger la
derniere version et la décompresser)
2) aller sur about:debugging
3) charger l'extension temporairement (le fichier manifest.json)




-----

You'll need to develop your own backend to send data in JSON array. Alternatively, you may also modify it and store your data in the extension.
The extension updates data every 24 hours.
The extension does not store any data from user.
The extension is also likely to be updated within the first semester of 2017.
