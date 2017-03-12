/*          DECODEX INSOUMIS
            LES INSOUMIS NUMERIQUES
            VERSION 1 / MARS 2017
            REMERCIEMENT A L'EQUIPE LES DECODEURS DU MONDE


                           ;#+###.
                        '#+##+###++
                     `#++##########:
                    ##+'++##########
                  +###+'+####+######
                 #####;++####+###+'#
                ######:++#++++#####:        .,,.
               +;#####+'+###+'+####      +++######:
              +'+++#+#;'+ +#++####:    #++######'+##
             ##+#######. +########   '##++######++###
            :'+'+###++   +###+###   ####+++####++#####
            ###+#####    ####+##   ###########++++#####
           '+++'''''      ###+#   ######++;###+#''+####'
           ++##'#++        #++   ;+##++++++,   +++######
          ;++++':+               +++++++''      `##+#####
          +##+#+++              ++++++++;        ,##+##++
         .''''';'               ++++++++          ##++#++;
         +#++#+'+              ########            #++++##
         +''+++'               ##+++++;            ##+#+#+
         #++##++              ,##::###             ;#+#++#
         '+++++'              ###:;##'              ######;
        ,++##++;              ###+###               ###+###
        '+##+#+.             .#######               #######
        #######              ####'##:               ###'###
        #+#####              +######                #######
        #+#####              +###++#                ###+###
        #+#+###             ,+###+++                +######
        '+'####.            #####:;`                +##;###
        ,+#####;            #'+##::                ,#+#+##;
         +++###+            #+###+#                ##+#'##
         ######+            #######                ##+#;##
         '+++++'           .#+###+'                ##+#:##
         ;+#####+          +#+####.               #++##+#'
          '+++#+#          ##+####                #+#+#;#
          +####+##         #######               +#######
          .''''+##.        ##+####              ;#####+:`
           ####+###        ##+###+              ++####++
           `'+'''++#       #######             #++##+++
            ###+#####      ##+####            ####+++++
             ##+######`   .##+###+          ,###++####
             `######@@#'  '##+###;         #####'+###
              ;+####++'##,#######:       ';####++###.
               '#######+#####+###,    ,#########++#,
                +#####++#####+###::#####+#####+#++.
                 :#####+#########';#####+++#####+
                   ##########+###++#####++######
                    '#+''+++#'###+'+#+++++;++#,
                      '++####+###:;####++++#;
                        :#######++'####+++
                          :##+###+++##;
                           ##+###'
                           #######
                           ##+####
                           ##+++##
                           ##++###
                           +#+####.
                           .++####'
                            #+#####
                            +####+#
                            #+#####
                            '+####+
                             +#####
                             ######
                             .####+
                               ,:`
*/

var browser = browser || chrome;

var _debug = 0; // 0=quiet, 1=verbose, 2=more verbose, 3= very very verbose
if (_debug) {
    console && console.info("DEBUG LEVEL", _debug);
}

let col_note_decodex = 0;
let col_desc         = 1;
let col_nom          = 2;
let col_slug         = 3;
let col_soumission   = 4;
let col_pub          = 5;
let col_subventions  = 6;
let col_sources      = 7;

let col_proprietaire1 =  8;
let col_fortune1      =  9;
let col_marque1       = 10;
let col_influence1    = 11;

let col_proprietaire2 = 12;
let col_fortune2      = 13;
let col_marque2       = 14;
let col_influence2    = 15;

let col_proprietaire3 = 16;
let col_fortune3      = 17;
let col_marque3       = 18;
let col_influence3    = 19;

let messages = [
    // gris
    "Nous n'avons pas encore évalué ce média selon nos critères, ou nous n'avons pas pu trouver d'information suffisamment fiable pour l'indiquer.",
    // rouge
    "Selon les critères retenus, ce média n'est pas indépendant. Cette catégorie regroupe les médias appartenant a de grands groupes industriels ou puissance financières qui peuvent influencer le traitement de l'information ou la ligne éditoriale. Quoi qu'il en soit, nous vous conseillons de chercher une ou plusieurs source alternative à l'information que vous lisez, voir opposée, en particulier si cette presse confirme vos idées.en particulier si cette presse confirme vos idées.",
    // jaune
    "Selon les critères retenus, ce média n'est pas vraiment indépendant. Cette catégorie regroupe les médias gérés par l'état français ou un état étranger. Ce type de média est en général moins soumis aux sphères financières, mais cela ne veut pas dire qu'il ne faut pas chercher une ou plusieurs source alternative à l'information que vous lisez, en particulier si cette presse confirme la version officielle de l'état concerné.",
    // bleu
    "????",
    // vert
    "Selon les critères retenus, ce média est insoumis, indépendant ! Il appartient en majorité à ses rédacteurs (et/ou abonnés) et ne fait pas ou très peu de recettes publicitaires ! Ces médias bénéficient en général d'assez peu de subventions publicitaires. L'indépendance éditoriale est nécessaire pour une information de qualité. Merci à eux, et merci à vous de les lire ! N'hésitez pas à comparer le traitement de l'information qu'en fait un autre média, plus soumis à l'oligarchie ou au capital… vous pourriez être surpris !",
    // insoumis !
    "Hé hé, on va pas vous mentir hein : Vous êtes sur un site clairement partisan des Insoumis ! Donc de notre point de vue, c'est un chouette site, vous pouvez lire tout ce que vous y trouvez, et comparer les informations avec des sites un peu plus soumis à l'oligarchie pour voir la différence de traitement !"
];
let icones = [
    // gris
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAH1SURBVHjapNRLiM5hFMfxz5jXzMLKYhYsXCaXIsMkt+xGWYwlRhxKaoopY2M2ysLGwrBhIRuXzEOTDCVlZTVNUSgbSkLJJZeUjcZlbJ63Hn/vzChnc57b+Z7fczlP08TEhEaWUurADnRhPh5hb0R8MIXVGoBacQL70VJMzcFq3JkK2FQqTCnNwjC25KG3aMuJX2N5Vrwb7fiMixExVGfMqCQ4XsBOZpU1/EAfjuIGtqITm3A5pXTwL2BKaWUOgrMRMYDbOJRVrcfh+jy2YST3B1NKK6oK9xRbOwIR8TMiTuMlBvK6UxHRFxHXsRMP0Zp38wdwY/Y3I+JL5Sj6MRNvcKw+GBHjuFLGl8D27J9Wbr2G7iLZ10qyF9nPrQKbs/9eCViIxbk90uCl1OMmqsB3xXsrrTNv9wseNwAuKeNL4Gj23ZWANcXWPlaOoxnbc/d+FTiUZa9NKfUW4wuyfx4R1Trtw0r8woU/gBExmqsEzqSUenK7rQ6sqAsM1sVExFijWu7HMnRgOKW0GYvy3KeUUgs24ED+OOBefvx/13LOPC/L76oke4VvWFqM3UJvRLyfFFgc9r6sZBWaiulxPMC5iLg05W/TAFzDWL7pazifL+fZP31fk0CH0YOrEbHLNDbD9PYk+3X5Uv4beDd/pDXMnm7x7wEA2Vudl/vKGmcAAAAASUVORK5CYII=',
    // rouge
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIESURBVHjapNRLiI9RGMfxz5g/FlYWFizcciliSO9BdqMsWLwLt4SSUkwZGzbKwsbCZcNCNi6RmmQ4SVlZSXnfUDaUhJJLLk3ZiGFszr+Od/7+Fs7mObfn+/zO5Xl6xsbGdGpVWSzFVvRjFh5jV4j1R11aqwNoMo5jLyZlS9OxAne6AXtyhVVZTMEQNqSpd5iWAr/B4qR4B+biCy6GWF9pMyY0AhzLYCeTyhZGMYAjuIGNWI61uFyVxf5xwKos+pITnA2xPoTbOJBUrcLB9jo2YTiNT1RlsaSpcGd2tMMQYv0zxPo0XuFQ2ncqxHogxPo6tuERJqfT/AFck+zNEOuRxlUMYiLe4mh7MsT6O67m/jlwbrLPGq/ewvos2NdGsJfJzmgCe5P90XCYg/mpP9zhp7T9xprA99l/y9vydNwRPOkAXJD758B7ya5vOBTZ0T41rqMXm9vDJvBKkh2qstiTzc9O9kWIdTNPB9CHX7jwBzDE+l7KEjhTlcWW1J/WBjbUbceJtpgQ6/udcnkQi7AUQ1VZrMO8tPa5KotJWI19qXDAg/T5x+dyijwzye9vBHuNb1iYzd3CnhDrD38FZpe9OylZhp5s+Tse4lyI9aWu1aYDuIX76aWv4Xx6nOd/85nQrbaFWI9mmTAaYn2nG+yfwNSeJrsyPYr/Bd5NhbSFqf/a/HsAGnieeoDVMFcAAAAASUVORK5CYII=",
    // jaune
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAH8SURBVHjapNQ7aFRREMbx303WWNhokULBV/AByk0UiSKCRQqR2AkqqIUIAY0QGys7W00jQYKNDwhCEESxSaONIaAYhL2FgoiI4gMfBGw0Bo/FHtezN5tN4YFl7p3Z+c93ztw5WQhB01Vk3TiCPqzFM5yQh89arEoT0FJcxCl0JJGV2IGJVsCsQWGRLcM4DkTPB3TGwu+wNSo+ji58ww15GFsIeBlD8W0Yj3APcziIvTjXRNiQPIw0AousB0+jmlF5GFRk7TgTz28/zkfAKB7gaCz0E73yUAgh1H5Vw6EqhKq3oWp53V+LrQ5VszE+nPg7QtV09F8JIWhLZO+J9q48zMzbEkvwHhfq3jzM4laanwK7on1R6noF/Umx76Vir6NdVQa2R/urlLAeG+PznSYN+ZsXysCPyfeWru1xuzOoNgFuSvNT4GS0/aWE3mRrX0rH0Y5D8e1JGTgWZe9UZAOJf120r+Tz5nQQPfiN643APEzGKYERRXY4PnfWgY3qjuFSXUwepprN8hC2oBvjimwfNsTYV0XWgd04HS8OeIyzzUevVnlNlN9XKvYGP7A58d3HgDx8Whj477BPRiXbkCXRWUzjqjzcbH3bzAdXMBU7fRvXYnNeLpTS1upuk4e5ZBLm5GGiFWxxYG09j3ZXbIr/BT6MF2kFKxb7858BAMnDvzDzyJQxAAAAAElFTkSuQmCC",
    // bleu
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIHSURBVHjapNQ9iJVHFMbx3+veaJEqxRZJoWaJCkr8mOBHCFhsIYx2wSiSBIKwYLbYNNqks3W1UIslTaKwCIsoCSFcKxtlIYKvYGMghCQQYoIaFmzErI7NWZh9vXstnObM1/mfZ+bMmaaUYlBr+u1WHMY41uEOvig5PTCk9QaA1uAUjmF1tfQ2PsC1YcCmVtj02zcxhwMxdR+jEfgvbAnFn2EM/+FCyWl2JeBZTMXwNG7gByziY+zF8QHCpkpO52FVBduGyRjOlJxO4Cd8Far2VLAZHMTVGE83/fb9ZUB8Xh3tayg5PSs5ncMfOBH7zpScJktOV3AELdbEnS8DfhT2+5LTQvdIeAN/4+TSZMnpKS7V/jVwLOwvnaz3sL8K9rgT7Pew73SBI2H/7zi8iw3RvzogIUt+pQv8p3pvddsRx13A3QHAjbV/DbwZdn/HYWd1tIed6xjBJzG81QXOhuxdTb+dqObXh/2t5NSt00lsw3N8twxYcroZVQLnm357KPqjS8COuk8xvSSm5DQ/qJansBlbMdf02314L9YeNf12NT7El/FxwM/x+F8uvYi8NuSPd4L9iSfYVM39iImS078rAqvLPhpKtqOplp/iNr4pOV0c+tsMAPcwH5m+jG8jOb+u5LNq2N9WclqsKmGx5HRtGOyVwGj3wu6OpHhd4PX4SHt461WbXwwABPGiThCuZUYAAAAASUVORK5CYII=",
    // vert
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIQSURBVHjapNQ/aJ5VFMfxz5O8pi84OWTQwT9BKygkirQigkOGInETarG2IOUGbApxaZdsXasdaocgvNgWghBEUbpk0cUQsKgFOyiU0hZKtbSWgMs1jb0u54WbxzdvBu9ynvvnfM/v3vOc05RSDBrdXjOJA5jGU7iM93Mqdw0ZnQGgXTiFDzBWbT2OV7AyDNjUCru95lEs461Y+h3jEfgWXgzFhzCB+zifU1naDngG8zH9GN/jG2zibbyB4wOEzedUzm4BdnvNFH4MNYs5lblurxnFsXi/N7EQgEV8i4MR6G/syalcGamiHK6utgA5lX9yKp/gBk7EudM5lbmcypd4Fz9jV7y5Gvh62K9zKuvtK+ER3MbJ/mJOZQOf1/41cCLsb62sdzBTBfurFex62CfawNGwD1oOz+C5+P5qQEL6fqUN/KP63+rxclx3Hb8MAO6u/WvgatiZlsOe6mr3Ws8xiv0xvdQGLoXsvd1eM1utPx32Wk7/qdM5TOEhzm0B5lRWo0rgbLfXvBPf431gS917+KgvJqeyNqiW5/ECJrHc7TX78Gzs/dntNWN4DUejccAP+HBg6UXkJ0P+dCvYTWQ8X61dxGxO5c62wOqxj4SSl9BU2xv4CZ/mVC4M7TYDwB2sRaa/wGeRnKvb+YwM6205lc2qEjZzKivDYDsCY/wa9tVIiv8L/C4aaQeP7XT43wEAbqCsQF3eczAAAAAASUVORK5CYII=",
    // vert
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIQSURBVHjapNQ/aJ5VFMfxz5O8pi84OWTQwT9BKygkirQigkOGInETarG2IOUGbApxaZdsXasdaocgvNgWghBEUbpk0cUQsKgFOyiU0hZKtbSWgMs1jb0u54WbxzdvBu9ynvvnfM/v3vOc05RSDBrdXjOJA5jGU7iM93Mqdw0ZnQGgXTiFDzBWbT2OV7AyDNjUCru95lEs461Y+h3jEfgWXgzFhzCB+zifU1naDngG8zH9GN/jG2zibbyB4wOEzedUzm4BdnvNFH4MNYs5lblurxnFsXi/N7EQgEV8i4MR6G/syalcGamiHK6utgA5lX9yKp/gBk7EudM5lbmcypd4Fz9jV7y5Gvh62K9zKuvtK+ER3MbJ/mJOZQOf1/41cCLsb62sdzBTBfurFex62CfawNGwD1oOz+C5+P5qQEL6fqUN/KP63+rxclx3Hb8MAO6u/WvgatiZlsOe6mr3Ws8xiv0xvdQGLoXsvd1eM1utPx32Wk7/qdM5TOEhzm0B5lRWo0rgbLfXvBPf431gS917+KgvJqeyNqiW5/ECJrHc7TX78Gzs/dntNWN4DUejccAP+HBg6UXkJ0P+dCvYTWQ8X61dxGxO5c62wOqxj4SSl9BU2xv4CZ/mVC4M7TYDwB2sRaa/wGeRnKvb+YwM6205lc2qEjZzKivDYDsCY/wa9tVIiv8L/C4aaQeP7XT43wEAbqCsQF3eczAAAAAASUVORK5CYII="
];
let bandeau_msgs = [
    "Inconnu",
    "Média carrément soumis !",
    "Média plutôt soumis",
    "Média plutôt insoumis",
    "Média Insoumis : Bravo !",
    "France Insoumise  \\o/"
];

// vars to show in prefs
var colors = [
    "#A2A9AE", // gris
    "#D50303", // rouge
    "#F5A725", // jaune
    "#129AF0", // bleu
    "#468847", // vert
    "#468847"  // INSOUMIS AUSSI :D
];
let decodex_colors = [
    "#A2A9AE", "#129AF0", "#D50303", "#F5A725", "#468847"
];
let decodex_descs = [
    "inclassable", "parodique", "pas fiable du tout", "peu fiable", "fiable"
];

var base_url = "http://decodex.insoumis.online/database.json";
var always_refresh = false;
var urls = "";
var note = null;
var soumission = null;
var notule = ""
var active_url = "";
var has_info = false;
var clean_url = "";

var proprietaires = '';
var fortunes      = '';
var marques       = '';
var influences    = '';
var proprietaires = '';
var interets      = '';
var conflits      = '';
var subventions   = '';
var publicite     = '';
var sources       = [];

var note          = '';
var decodex_note  = '';
var color         = '';
var decodex_color = '';
var decodex_desc  = '';
var message       = '';
var bandeau_msg   = '';
var icone         = '';

function onInstall() {
    if (1 <= _debug)
        console && console.log("Le Décodex insoumis est installé");
    loadData();
    var last_update = new Date();
    browser.storage.local.set(
            {
                'infobulles': [false, true, true, true, true, true],
                "installed" : true,
                'last_update': last_update.getTime(),
            }
            );
    browser.tabs.create({url: "install.html"});
}


browser.storage.local.get(['installed'], function(results){
    var install = results.installed;
    if (install != true) {
        onInstall();
    }
});


function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    if (4 <= _debug) {
                        console && console.info("raw json");
                        console && console.log(xhr.responseText);
                    }
                    success(JSON.parse(xhr.responseText));
                }
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}


function loadData(){

    if (1 <= _debug) {
        console && console.info('start loadData()');
        //console && console.info('NO DEBUG');
    }
    browser.storage.local.get('last_update', function(results){
        var new_update = new Date();
        if (2 <= _debug) {
            console && console.log("found last update : ", results, "base url=", base_url+"?"+new_update.getTime());
        }
        loadJSON(base_url+"?"+new_update.getTime(),
                function(data) {
                    if (2 <= _debug) {
                        console && console.info("storing urls...", data['urls']);
                    }
                    browser.storage.local.set({'urls': data['urls']}, function() {
                    });
                    if (2 <= _debug)
                        console && console.info("set sites to", data['sites']);
                    browser.storage.local.set({'sites': data['sites']}, function() {
                    });
                    if (3 <= _debug)
                        console && console.info("set last_update to", new_update.getTime());
                    browser.storage.local.set({'last_update': new_update.getTime()}, function() {
                    });

                },
                function(data) {
                    console && console.error("error on loadJSON", data);
                }
                );
    });
}


function lastSlash(u){
    if(u.lastIndexOf('/') == u.length-1) {
        return u.substring(0, u.length-1);
    }
    else {
        return u;	
    }
}


function url_cleaner(url){
    return url
        .replace("http://", "")
        .replace('www.', "")
        .replace("https://", "")
        .replace("\n", "");
}

function youtubeChannel(u){
    var elms = u.split('/');
    if(elms.length > 2){
        return elms[0] + '/' + elms[1] + "/" + elms[2];
    }
    else{
        return u;
    }
}


function debunkSite(u, t, d){
    if (3 <= _debug)
        console && console.log('debunk site ', u);

    browser.storage.local.get(['urls', "sites", "already_visited", "infobulles", "last_update"], function(results){
        if (3 <= _debug) {
            console && console.info("debunkSite : var results");
            console && console.log(results);
        }

        if ("urls" in results) {
            if (_debug > 4) {
                console && console.log("urls is in results");
            }
            try {
                urls = results.urls;
                sites = results.sites;
                has_info = urls.hasOwnProperty(u);
                if (has_info == true) {
                    site_id = urls[u];
                    if (2 <= _debug) {
                        console && console.log('site FOUND ! ', site_id);
                    }
                    try {
                        site_actif     = sites[site_id][col_nom];                    // nom du site
                        decodex_note   = parseInt(sites[site_id][col_note_decodex]); // note decodex
                        soumission     = parseInt(sites[site_id][col_soumission]);   // note insoumis
                        notule         = sites[site_id][col_desc];                   // description originale
                        slug           = sites[site_id][col_slug];                   // nom normalisé

                        var proprietaire1 = sites[site_id][col_proprietaire1];      // propriétaires
                        var fortunes1      = sites[site_id][col_fortune1     ];      // propriétaires
                        var marque1        = sites[site_id][col_marque1      ];      // propriétaires
                        var influence1     = sites[site_id][col_influence1   ];      // propriétaires

                        var proprietaire2 = sites[site_id][col_proprietaire2];      // propriétaires
                        var fortunes2      = sites[site_id][col_fortune2     ];      // propriétaires
                        var marque2        = sites[site_id][col_marque2      ];      // propriétaires
                        var influence2     = sites[site_id][col_influence2   ];      // propriétaires

                        var proprietaire3 = sites[site_id][col_proprietaire3];      // propriétaires
                        var fortunes3      = sites[site_id][col_fortune3     ];      // propriétaires
                        var marque3        = sites[site_id][col_marque3      ];      // propriétaires
                        var influence3     = sites[site_id][col_influence3   ];      // propriétaires

                        proprietaires = [proprietaire1, proprietaire2, proprietaire3];
                        fortunes      = [fortunes1    , fortunes2    , fortunes3    ];
                        marques       = [marque1     , marque2       , marque3      ];
                        influences    = [influence1  , influence2    , influence3   ];

                        subventions    = sites[site_id][col_subventions];            // Montant des subventions d'état
                        publicite      = sites[site_id][col_pub];                    // Pub ?

                        var raw_sources = sites[site_id][col_sources];                // Nos sources (urls séparés par virgule et/ou espace)

                        if (3 <= _debug) {
                            console && console.info("sources avant markdown", sources);
                        }
                        // Markdown style
                        var regex = new RegExp(/\[([^\]]*?)\]\(([^\)]*?)\)[, ]{0,2}/gm);
                        match = regex.exec(raw_sources);
                        sources = [];
                        while (match != null) {
                            title = match[1];
                            url   = match[2];
                            sources.push({"url":url, "title":title});
                            match = regex.exec(raw_sources);
                        }

                        if (3 <= _debug) {
                            console && console.log("sources apres markdown", sources);
                        }

                        // URL toute seule
                        var regex = new RegExp(/^(http[s]?:\/\/([^/]+)\/[^" ,]+)[^"]{1,2}$/g);
                        match = regex.exec(raw_sources);
                        while (match != null) {
                            url   = match[1];
                            title = match[2];
                            sources.push({"url":url, "title":title});
                            match = regex.exec(raw_sources);
                        }

                        if (3 <= _debug) {
                            console && console.log("sources apres urls simples", sources);
                        }

                        note          = soumission;
                        color         = colors[soumission];
                        message       = messages[soumission];
                        decodex_color = decodex_colors[decodex_note];
                        decodex_desc  = decodex_descs[decodex_note];
                        bandeau_msg   = bandeau_msgs[soumission];
                        icone         = icones[soumission];

                        if (2 <= _debug) {
                            console && console.group("tout s'est bien passé");
                            console && console.log('site_actif     =',site_actif     );
                            console && console.log('decodex_note   =',decodex_note   );
                            console && console.log('soumission     =',soumission     );
                            console && console.log('notule         =',notule         );
                            console && console.log('slug           =',slug           );
                            console && console.log('proprietaires  =',proprietaires  );
                            console && console.log('interets       =',interets       );
                            console && console.log('conflits       =',conflits       );
                            console && console.log('subventions    =',subventions    );
                            console && console.log('sources        =',sources        );
                            console && console.groupEnd();

                        }
                    } catch(e) {
                        if (1 <= _debug) {
                            console && console.error("ERREUR has_info");
                            console && console.error(e);
                            console && console.log(sites[site_id]);
                        }
                    }

                    browser.browserAction.setIcon({
                        path: "img/icones/icon" + (soumission) + ".png", // note
                        tabId: t
                    });

                    if(results.infobulles[soumission] == true && d == true){  // note
                        browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            // sendMessage to the content.js listener
                            browser.tabs.sendMessage(tabs[0].id, {
                                show_popup  : true,
                                note        : soumission,
                                color       : colors[soumission],
                                message     : messages[soumission],
                                bandeau_msg : bandeau_msgs[soumission],
                                icone       : icones[soumission],
                            }, function(response) { // note
                            });
                        });
                    }
                }
                else {
                    if (2 <= _debug) {
                        console && console.info("site non trouvé", u);
                        console && console.log(u);
                    }
                    browser.browserAction.setIcon({
                        path: "icone.png",
                        tabId: t
                    });
                    // Optional : add a badge text and badge bg with the icon
                    //browser.browserAction.setBadgeText({"text" : "Soumis :p"});
                    //browser.browserAction.setBadgeBackgroundColor({'color' : "#D50303"});
                }

                if (u.match(/youtube.com/)) {

                    if (null == soumission)
                        soumission  = 0;                             // propriétaires

                    browser.browserAction.setIcon({
                        path: "img/icones/icon" + (soumission) + ".png", // note
                        tabId: t
                    });

                    if ("" == proprietaires)
                        proprietaires  = "Youtube est une propriété de la Holding Alphabet (Google)";                             // propriétaires
                    if ("" == interets)
                        interets       = "Le groupe Alphabet(Google) a de nombreux intérêts internationnaux. Son business model est fortement basé sur la publicité et son quasi-monopole de la publicité. Google exerce de nombreuses pressions sur les états et l'Union Européenne.";                               // intérets
                    if ("" == conflits)
                        conflits       = "Youtube peut être un outil de partage de connaissances. Les vidéastes et utilisateurs de la plateforme youtube ne sont pas forcément soumis à Google, mais… ";  // exemple de conflits / complicité idéologique
                    if ("" == subventions)
                        subventions    = "";             // Montant des subventions d'état
                    if ("" == sources)
                        sources        = "";             // Nos sources (urls séparés par virgule et/ou espace)
                }
            } catch(e) {
                console && console.error(e);
            }
        }

        var today = new Date();
        if(always_refresh || (today.getTime() - results.last_update)/1000/60/60 >= 24) {

            if (1 <= _debug) {
                console && console.log("refresh every hour or refresh forced");
            }
            loadData();
        } else {
            if (2 <= _debug) {
                console && console.log("(not refresh) use data found in cache");
            }
        }
    });
}


function checkSite(do_display){
    browser.tabs.query({currentWindow: true, active: true}, function(tabs){
        if (!tabs.length) {
            return;
        }
        var tab;
        for (active_tab of tabs) {
            tab = active_tab;
        }
        active_url = lastSlash(tab.url);
        if (_debug > 5) {
            console && console.warn("active url", active_url);
        }

        if(active_url.indexOf("chrome-extension://") == 0) {
            return;
        }
        // YOUTUBE
        if(active_url.indexOf("youtube.com/") > -1){
            if(active_url.indexOf("channel") == -1){
                browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    browser.tabs.sendMessage(tabs[0].id, {text: 'report_back'}, function(response){
                        clean_url = response.farewell.replace('https://www.', "");
                        debunkSite(clean_url, tab.id, do_display);
                    });
                });
            }
            else {
                clean_url = youtubeChannel(url_cleaner(active_url));
                debunkSite(clean_url, tab.id, do_display);
            }
        }
        // SOCIAL NETWORKS HOMEPAGE
        else if(active_url == 'https://www.facebook.com' || active_url == 'https://twitter.com' || active_url == 'https://www.youtube.com'){
            clean_url = url_cleaner(active_url);
        debunkSite(clean_url, tab.id, do_display);
    }
    // OTHER URLS
        else {
            matches = []

            clean_url = url_cleaner(active_url);
            find_url = urls[clean_url];
            if (4 <= _debug) {
                console && console.log("all urls", urls);
                console && console.log("active_url",  active_url);
                console && console.log("clean_url",   clean_url);
                console && console.log("find_url urls[\""+clean_url+"\"]", urls[clean_url]);
            }

            if (find_url) {
                matches.push(find_url);
                console && console.warn("URL MATCHES !!!!", find_url);
            }
            else {
                if (4 <= _debug) {
                    console && console.group("for key in urls");
                }
                for (var key in urls) {
                    if (!urls.hasOwnProperty(key)) {
                        if (4 <= _debug) {
                            console && console.info("this url «key» has not ownProperty", key);
                        }
                        continue;
                    }
                    var index = active_url.indexOf(key);
                    if(index != -1) {
                        if (4 <= _debug) {
                            console && console.info("url FOUND !", key, index);
                        }
                        if((
                            active_url.indexOf('http://www.'+ key) == 0
                            || active_url.indexOf('https://www.'+ key) == 0
                            || active_url.indexOf('http://'+ key) == 0
                            || active_url.indexOf('https://'+ key) == 0
                           )
                           && index != 0
                           && (active_url[index-1] == "/" || active_url[index-1] == ".")
                           && key != "facebook.com"
                           && key != "twitter.com") {
                            matches.push(key);
                            if (_debug > 4) {
                                console && console.warn("URL MATCHES !!!!");
                            }
                        }
                    }
                }
                if (4 <= _debug) {
                    console && console.groupEnd();
                }
            }
            tampon = "";
            if (4 <= _debug) {
                console && console.group("start foreach tampon");
            }
            for(var url_i=0;url_i<matches.length;url_i++){
                if(matches[url_i].length > tampon.length){
                    tampon = matches[url_i];
                    if (4 <= _debug) {
                        console && console.log("tampon is now", tampon);;
                    }
                }
            }
            if (4 <= _debug) {
                console && console.groupEnd();;
                //clean_url = tampon;
                console && console.log("call debunkSite");
                console && console.log("clean_url", clean_url);
                console && console.log("tab id",  tab.id);
                console && console.log("do display", do_display);
            }
            debunkSite(clean_url, tab.id, do_display);
        }
    });
}


browser.tabs.onActivated.addListener(function (tabId, tab) {
    checkSite(false);
});

browser.windows.getCurrent(function (tabId, tab) {
    checkSite(false);
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    checkSite(changeInfo.status && changeInfo.status == "complete");
});

browser.windows.onFocusChanged.addListener(function (tabId, tab) {
    checkSite(false);
});


browser.browserAction.onClicked.addListener(function (tabId, tab) {
    checkSite(false);
});

browser.tabs.onCreated.addListener(function (tabId, tab) {
    checkSite(true);
});
