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

var _debug = 0; // 0=quiet, 1=verbose, 2=more verbose, 3= very very verbose
if (_debug) {
    console && console.warn("DEBUG LEVEL", _debug);
}

var col_note_decodex = 0
var col_desc         = 1
var col_nom          = 2
var col_slug         = 3
var col_soumission   = 4
var col_pub          = 5
var col_subventions  = 6
var col_sources      = 7

var col_proprietaire1 =  8
var col_fortune1      =  9
var col_marque1       = 10
var col_influence1    = 11

var col_proprietaire2 = 12
var col_fortune2      = 13
var col_marque2       = 14
var col_influence2    = 15

var col_proprietaire3 = 16
var col_fortune3      = 17
var col_marque3       = 18
var col_influence3    = 19


var base_url = "http://decodex.insoumis.online/database.json";
var always_refresh = false;
var urls = "";
var note = null;
var soumission = null;
var notule = ""
var active_url = "";
var debunker = false;
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


function url_cleaner(u){
    return u.replace("http://", "").replace('www.', "").replace("https://", "");
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
        try {
            urls = results.urls;
            sites = results.sites;
            debunker = urls.hasOwnProperty(u);
            if (debunker == true) {
                site_id = urls[u];
                if (2 <= _debug) {
                    console && console.log('site FOUND ! ', site_id);
                }
                try {
                    site_actif     = sites[site_id][col_nom];                    // nom du site
                    note_decodex   = parseInt(sites[site_id][col_note_decodex]); // note decodex
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

                    if (2 <= _debug) {
                        console && console.group("tout s'est bien passé");
                        console && console.log('site_actif     =',site_actif     );
                        console && console.log('note_decodex   =',note_decodex   );
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
                        console && console.error("ERREUR DEBUNKER");
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
                        browser.tabs.sendMessage(tabs[0].id, {text: "soumission"+soumission}, function(response) { // note
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
                for (var key in urls) {
                    if (_debug > 4) {
                        console && console.warn("check key", key);
                    }
                    if (!urls.hasOwnProperty(key)) continue;
                    var index = active_url.indexOf(key);
                    if(index != -1) {
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
            tampon = "";
            for(var url_i=0;url_i<matches.length;url_i++){
                if(matches[url_i].length > tampon.length){
                    tampon = matches[url_i];
                }
            }
            clean_url = tampon;
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
