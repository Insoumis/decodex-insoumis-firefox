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
var base_url = "http://decodex.insoumis.online/decodex_data.json";
var always_refresh = true;
var urls = "";
var note = null;
var soumission = null;
var notule = ""
var active_url = "";
var debunker = false;
var clean_url = "";

var proprietaires = '';
var interets      = '';
var conflits      = '';
var subventions   = '';
var publicite     = '';
var sources       = '';


function onInstall() {
    if (1 <= _debug)
        console && console.log("Le Décodex insoumis est installé");
    loadData();
    var last_update = new Date();
    browser.storage.local.set(
            {
                'infobulles': [false, true, true, true, false],
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
                    if (3 <= _debug) {
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

    if (1 <= _debug)
        console && console.info('start loadData()');
        else {
            console && console.info('NO DEBUG');
        }
    browser.storage.local.get('last_update', function(results){
        var new_update = new Date();
        loadJSON(base_url,
                function(data) {
                    if (1 <= _debug)
                        console && console.info("set urls to", data['urls']);
                    browser.storage.local.set({'urls': data['urls']}, function() {
                    });
                    if (1 <= _debug)
                        console && console.info("set sites to", data['sites']);
                    browser.storage.local.set({'sites': data['sites']}, function() {
                    });
                    if (1 <= _debug)
                        console && console.info("set last_update to", new_update.getTime());
                    browser.storage.local.set({'last_update': new_update.getTime()}, function() {
                    });

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
    if (1 <= _debug)
        console && console.log('debunk site ', u);
    // TODO: rajouter les champs manquants
    browser.storage.local.get(['urls', "sites", "already_visited", "infobulles", "last_update"], function(results){
        if (1 <= _debug) {
            console && console.info("debunkSite : var results");
            console && console.log(results);
        }
        urls = results.urls;
        sites = results.sites;
        debunker = urls.hasOwnProperty(u);
        if (debunker == true) {
            site_id = urls[u];
            if (1 <= _debug) {
                console && console.log('site FOUND ! ', site_id);
            }
            try {
                site_actif     = sites[site_id][2];              // nom du site
                note_decodex   = parseInt(sites[site_id][0]);    // note decodex
                soumission     = parseInt(sites[site_id][4]);    // note insoumis
                notule         = sites[site_id][1];              // description originale
                slug           = sites[site_id][3];              // nom normalisé
                proprietaires  = sites[site_id][5];              // propriétaires
                interets       = sites[site_id][6];              // intérets
                conflits       = sites[site_id][7];              // exemple de conflits / complicité idéologique
                subventions    = sites[site_id][8];              // Montant des subventions d'état
                publicite      = sites[site_id][9];              // Pub ?
                sources        = sites[site_id][10];             // Nos sources (urls séparés par virgule et/ou espace)

                if (1 <= _debug) {
                    console && console.info("sources avant markdown", sources);
                }
                // Markdown style
                sources = sources.replace(/\[([^\]]*?)\]\(([^\)]*?)\)[, ]{0,2}/gm, '<a class="source-link" href="$2">$1</a>');
                if (1 <= _debug) {
                    console && console.log("sources apres markdown", sources);
                }
                // URL toute seule (a corriger)
                sources = sources.replace(/(http:\/\/[^/]+\/[^/]+)\/[^"][^ ,]{1,2}/g, '<a href="$1">$2</a><br>');
                if (1 <= _debug) {
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
            if (1 <= _debug) {
                console && console.log("site non trouvé", u);
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

        var today = new Date();
        if(always_refresh || (today.getTime() - results.last_update)/1000/60/60 >= 1) {

            if (1 <= _debug) {
                console && console.log("refresh every hour");
            }
            loadData();
        } else {
            if (1 <= _debug) {
                console && console.log("data found in cache");
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
        if(active_url.indexOf("chrome-extension://") == 0) { return;}
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
                    if (!urls.hasOwnProperty(key)) continue;
                    var index = active_url.indexOf(key);
                    if(index != -1) {
                        if((active_url.indexOf('http://www.'+ key) == 0 || active_url.indexOf('https://www.'+ key) == 0 || active_url.indexOf('http://'+ key) == 0 || active_url.indexOf('https://'+ key) == 0)
                                && index != 0
                                && (active_url[index-1] == "/" || active_url[index-1] == ".")
                                && key != "facebook.com"
                                && key != "twitter.com") {
                            matches.push(key);
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
