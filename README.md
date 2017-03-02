# Extension

(Work In Progress)

Cette extension est idéale pour compléter l'extension très pratique «décodex» des décodeurs du monde.

Le decodex indique la fiabilité (selon les journalistes de Le Monde / Les
Décodeurs) / Les Décodeurs) d'un site internet. Plus un site aura (dans le
passé ou le présent) indiqué de fausses informations, plus celui ci aura une
mauvaise note invitant le visiteur à vérifier les informations sur d'autres
source.

Nous fournissons son complément essentiel : le décodex insoumis, afin de
mettre en avant les puissances financières ou politique derrière un site que
vous visitez. Cela ne veut pas dire que les informations que vous y lirez sont
fausses ou incorrecte, mais peuvent influencer la ligne éditoriale générale du
site, ainsi que la présentation des informations.

Attention ! Un site indépendant n'est pas forcément plus fiable qu'un site
soumis à de grande fortune ou des capitaux financiers. Cela ne signifie pas
non plus que tous les journalistes d'un média sont forcément soumis à la
finance, corrompu, etc… . Gardez à l'esprit que la plupart des journalistes
ont une certaine éthique et une déontologique, et qu'un article partisant
n'est pas représentatif de toute la profession.

Attention aussi à ne pas tomber dans les théories complotistes du «tous
pourri» ! Si vous remarquez une information manifestement erronée ou partisane,
il est de bon ton d'appliquer <a
href="https://fr.wikipedia.org/wiki/Rasoir_d'Hanlon">le rasoir d'Hanlon</a>
qui invite à «Ne jamais attribuer à la malveillance ce que la stupidité ou
l'incompétence suffit à expliquer». Autrement dit, si un journaliste se
trompe, il est plus probable que ce soit une <a
href="https://fr.wiktionary.org/wiki/autocensure">auto-censure</a>
inconsciente ou un <a
href="https://fr.wikipedia.org/wiki/Biais_de_confirmation">biais de
confirmation</a>, qu'une réelle volontée de désinformer.

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


### Convention du numéro de version

Les 3 premiers chiffres correspondent au numéro de version du decodex original
des décodeurs. Le 4eme chiffre sera incrémenté à chaque nouvelle version du
décodex insoumis.


### Remerciements

* Le Monde Diplomatique,
qui a fait germé l'idée, grâce à http://www.monde-diplomatique.fr/cartes/ppa
* Les Décodeurs,
pour avoir créer leur extension «decodex», certe très simple, mais qui nous a
servi servi de base de départ (et aussi pour leur travail de décryptage des
informations, pas si souvent biaisée que ça :) )


Bien entendu il est impossible de citer ici tous les journalistes qui se sont
un jour trompé dans leur article, tous les journaux qui nous ont tant de fois
encouragé à faire un tel outil à travers leur une ou leur traitement de
l'information. Nous leur laisson le soin de s'y reconnaitre. S'ils souhaitent
que l'on rajoute leur nom ou celui de leur journal aux remerciement, qu'ils
n'hésitent pas à nous contacter.

-----

You'll need to develop your own backend to send data in JSON array. Alternatively, you may also modify it and store your data in the extension.
The extension updates data every 24 hours.
The extension does not store any data from user.
The extension is also likely to be updated within the first semester of 2017.
