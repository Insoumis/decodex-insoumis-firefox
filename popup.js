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

function bulleStore(e){
    var infobulles;
    var id = parseInt(this.id.replace("check-alert", ""));
    var checked = this.checked;
    browser.storage.local.get('infobulles', function(results){
        infobulles = results.infobulles;
        if(checked) {
            infobulles[id] = true;
        }
        else {
            infobulles[id] = false;
        }
        browser.storage.local.set({
            'infobulles': infobulles,
            }
        );
    });
}

function main() {
    var messages = [
        "Attention, nous n&rsquo;avons pas encore &eacute;valu&eacute; ce site, il n&rsquo;est pas ind&eacute;pendant &agrave; proprement parler ou sa soumission est trop variable pour entrer dans nos crit&egrave;res. Cela ne signifie pas que ces informations sont fausses, mais nous vous conseillons de chercher des sources suppl&eacute;mentaires, peut &ecirc;tre d&rsquo;un bord oppos&eacute; &agrave; ce site.",
        "Attention, il s'agit d'un site satirique ou parodique qui n'a pas vocation &agrave; diffuser de vraies informations. A lire au second degr&eacute;.",
        "Ce site diffuse r&eacute;guli&egrave;rement des informations biais&eacute;es (orient&eacute;es trop &agrave; gauche ou trop &agrave; droite). Il se peut m&ecirc;me que certaines informations soient fausses ou que le titre raccoleur soit en contradiction avec le contenu de l&rsquo;article. Restez vigilant et cherchez d&rsquo;autres sources plus fiables. Si possible, remontez &agrave; l&rsquo;origine de l&rsquo;information, ou cherchez l&rsquo;information sur un m&eacute;dia d&rsquo;un bord oppos&eacute;.",
        "Ce site peut r&eacute;guli&egrave;rement diffuser des informations orient&eacute;es (&agrave; gauche ou &agrave; droite), impr&eacute;cise voir sans v&eacute;ritable sources. Il est &eacute;galement possible que certains journalistes s&rsquo;auto-censurent, soient soumis ou de mauvaise foi, ou souffrent de l&eacute;gers biais de confirmation (ce qui n&rsquo;est pas grave, cela nous arrive &agrave; tous.",
        "Ce site est en principe plutôt ind&eacute;pendant, voir non soumis &agrave; a une grande fortune ou un parti politique. Mais n’hésitez pas à confirmer l’information en cherchant d’autres sources fiables en remontant à son origine, ou encore a lire ce que des m&eacute;dias moins ind&eacute;pendants pensent de cette information."
    ]
    var colors = [
        "#A2A9AE", "#129AF0", "#D50303", "#F5A725", "#468847"
    ];

    var background = browser.extension.getBackgroundPage();
    if(background.debunker == true) {
        document.querySelector(".content #site-name").innerText = background.site_actif;
        document.querySelector("#notule").innerText = background.notule;
        document.querySelector("#our-opinion").style["color"] = colors[background.soumis];
        document.querySelector("#our-opinion").innerText = messages[background.soumis];
        document.querySelector("#decodex-window").style.display = "block";
        document.querySelector("#verif").classList.remove("active");
        document.querySelector("#decodex-window").classList.add('active');
        document.querySelector("#more-info").href = "http://decodex.insoumis.online/about.html";
    }
    else {
        document.querySelector("#verif").style.display = "block";
        document.querySelector("#decodex-window").classList.remove('active');
        document.querySelector("#verif").classList.add("active");
        document.querySelector("#decodex-window").style.display = "none";

    }

    var params = document.querySelector("#params");
    params.addEventListener("click", function(){
        var parameters = document.querySelector("#parameters");
        if(params.classList.contains("active-p")){
            params.classList.remove("active-p");
            parameters.style.display = "none";
            document.querySelector(".active").style.display = "block";
        }
        else {
            params.classList.add("active-p");
            document.querySelector(".active").style.display = "none";
            parameters.style.display = "block";
        }
    });
    browser.storage.local.get('infobulles', function(results){
        for(var i=0;i<5;i++){
                if(results.infobulles[i] == true){
                    document.getElementById("check-alert" + i).checked = true;
                }
                else {
                    document.getElementById("check-alert" + i).checked = false;
                }
            }
    });
    document.querySelector('#more-info').addEventListener('click', function(e){
        if(e.target.href!==undefined){
            browser.tabs.create({url:e.target.href});
        }
        e.preventDefault();
        window.close();
    });
    for(var i=0;i<5;i++){
        document.querySelector("#alert"+i).style.color = colors[i];
    }
}

document.addEventListener('DOMContentLoaded', function () {
    main();
    for(var i=0;i<5;i++){
        document.querySelector('#check-alert'+i).addEventListener('click', bulleStore);
    }
});

