/*          DECODEX
            LES DECODEURS / LE MONDE
            VERSION 1 / FEVRIER 2017

              ▄▓▄
            ▄▓▓█       ▄▄▄▓▓▓▓▄╦          ▄▓▄               ▄▓▄▄
           ▓▓▓▓▄,,▄▄▓▓▓▓▓▓▓▓▓▓▓▓▓╕    ╓▄▓▓▓▓▓▓▓▄        ,▄▓▓▓▓▓▓▓▓▄╦
       ╒▌ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄  ▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄▄▄▄▄▓▓▌
       ╫▓ ╙▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▀Γ ▀█▓▓▓▓▓▓▓▓▓▓▓▓▓█▀  ▀█▓▓▓▓▓▓▓▓▓▓▓▓▓▓█▀Γ
        █▓▄ Γ▀▀▀▀▀ΓΓ ,  █▓▓▓▓▓▓▓▓▓▌  Σ▓▄,╙█▓▓▓▓▓▓▓▓▓▌   ▀█▓▄,Γ▀█▓▓▓▓▓▓▓▓█
                     ▐▓ ▐▓▓▓▓▓▓▓▓▓▌    ╙▓Q ▓▓▓▓▓▓▓▓▓▌       ▀█▌  ▓▓▓▓▓▓Γ
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌          ▄▓▓▓▓▓▓▓
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌       ⌐ ▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌      ▓ ╟▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▐▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓µ     ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ]▓▓▓▓▓▓▓▓▓      ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ]▓ ╟▓▓▓▓▓▓▓█       ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                     ▐▀ ▓▓▓▓▓█▀         ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                      ╓▓▓▓█Γ            ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
                      █▀                ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▌
               ▄▄▓▓▓▓▓▓▓▓▓▓▓▄╦          ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▓
          ,▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄▄▓▓▌   ▓▌ ▓▓▓▓▓▓▓▓▓▌     ▓▌ ▓▓▓▓▓▓▓▓▓▓▄,,▄▓╕
       ╓▄▓▓▓▓▓▓██████▓▓▓▓▓▓▓▓▓▓▓▓█▀     ▓▌ ▓▓▓▓▓▓▓▓▓▀     ▓▓ █▓▓▓▓▓▓▓▓▓▓▓▓█▀
     ▄▓▓██▀Γ     ≈4▄▄, ▀▓▓▓▓▓█▀Γ        ▓▌ ▓▓▓▓▓█▀Γ        ▓▌ ▀█▓▓▓▓▓▓█▀Γ
   ╙▓█Γ              █▓▄ ██▀            ▓▌ ██▀Γ             ▀█▄╦ ▀██▀
                      ╙▀                ▀`                     ▀▀
 */
var base_url = "http://decodex.insoumis.online/decodex_data.json";
var urls = "";
var note = null;
var soumis = null;
var notule = ""
var active_url = "";
var debunker = false;
var clean_url = "";

function onInstall() {
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
                    //console && console.info("raw json");
                    //console && console.log(xhr.responseText);
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
    browser.storage.local.get('last_update', function(results){
console && console.log('updating datas');
        var new_update = new Date();
        loadJSON(base_url,
             function(data) {
                browser.storage.local.set({'urls': data['urls']}, function() {
                });
                browser.storage.local.set({'sites': data['sites']}, function() {
                });
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
    console && console.log('debunk site ', u);
    browser.storage.local.get(['urls', "sites", "already_visited", "infobulles", "last_update"], function(results){
        urls = results.urls;
        sites = results.sites;
        debunker = urls.hasOwnProperty(u);
        if(debunker == true){
            site_id = urls[u];
            site_actif = sites[site_id][2];
            note_decodex = parseInt(sites[site_id][0]);
            soumission = parseInt(sites[site_id][4]);
            notule = sites[site_id][1];
            slug = sites[site_id][3];
            proprietaires = sites[site_id][5];
            interets = sites[site_id][6];
            influences = sites[site_id][7];
            subventions = sites[site_id][8];
            sources = sites[site_id][9];

            browser.browserAction.setIcon({
                path: "img/icones/icon" + (soumission) + ".png", // note
                tabId: t
            });
            if(results.infobulles[soumis] == true && d == true){  // note
                browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    browser.tabs.sendMessage(tabs[0].id, {text: "soumis"+soumission}, function(response) { // note
                    });
                });
            }
        }
        else {
            browser.browserAction.setIcon({
                path: "icone.png",
                tabId: t
            });
        }
        var today = new Date();
        if(true || (today.getTime() - results.last_update)/1000/60/60 >= 24) {
			console && console.log("refresh everytime (change me for prod)"):
            loadData();
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
