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

var max_notes = 6;  // (de 0 à 5 = 6 notes)

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
            'infobulles': infobulles
            }
        );
    });
}

function refreshDatabase(e){
    browser.storage.local.set({
        'last_update': ((new Date().getTime()) - 24*60*60*1000)
    });
    this.blur();
}

function linkInNewTab(a) {
	var href = a.href; // une fermeture ... sinon ça ne marche pas si le <a> contient par exemple une <img>
	a.addEventListener('click', function(e){
		if (href!==undefined) {
			browser.tabs.create({url:href});
			window.close();
		}
		e.preventDefault();
	});
	return a;
}

function createLink(toDOM,url,title) {
    var a = document.createElement("a");
	a.href = url; a.innerText = title;
	linkInNewTab(a);
	toDOM.appendChild(a);
	return a;
}

function main() {
    var background = browser.extension.getBackgroundPage();

    if(background.has_info == true) {
        // TODO afficher les infos manquantes avec popup.js et popup.html
        document.querySelector(".content #site-name").innerText = background.site_actif;
        document.querySelector("#notule").innerText = background.notule;
        document.querySelector("#our-opinion").style["color"] = background.color;
        document.querySelector("#our-opinion").innerText = background.message;


        if(background.decodex_note) {
            document.querySelector("#les-decodeurs #comment").innerText = "Les Décodeurs du Monde jugent eux ce site comme ";
            document.querySelector("#les-decodeurs #description").style["color"] = background.decodex_color;
            document.querySelector("#les-decodeurs #description").style["font-weight"] = "bold";
            document.querySelector("#les-decodeurs #description").innerText = background.decodex_desc;
        }
        else {
            document.querySelector("#les-decodeurs").innerText = "Les Décodeurs du Monde ne connaissent pas ce site";
        }

        document.querySelector("#owner-msg").innerText = background.owner_msg;
        //document.querySelector("#proprietaires span.content").innerText = background.proprietaires.join(",");

            console && console.group("la boucle proprietaire : ");
            console && console.log(background.proprietaires);
        for(var i in background.proprietaires) {
            console && console.log("proprietaire "+i);
            if (!background.proprietaires[i]) {
                document.querySelector("#proprietaire"+i).style = "display:none";
            } else {
                document.querySelector("#proprietaire"+i).style = "";
                document.querySelector("#proprietaire"+i+" td.nom").innerText = background.proprietaires[i]
            }

            if (!background.fortunes[i]) {
                document.querySelector("#proprietaire"+i+" td.detail").style = "display:none";
            } else {
                document.querySelector("#proprietaire"+i+" td.detail").innerText =
                    background.fortunes[i]
                    + background.marques[i]
                    + background.influences[i];
                document.querySelector("#proprietaire"+i+" td.detail").style = "";
            }

        }
            console && console.groupEnd();

        //document.querySelector("#fortunes span.content").innerText = background.fortunes.join(",");
        //document.querySelector("#brands span.content").innerText = background.marques.join(",");
        //document.querySelector("#influences span.content").innerText = background.influences.join(",");


        //document.querySelector("#interests span.content").innerText = background.interets;
        //document.querySelector("#conflicts span.content").innerText = background.conflits;
        //document.querySelector("#subsidies span.content").innerText = background.subventions;

		var par = document.querySelector("#sources span.content"); par.innerText = "";
        for(var i in background.sources) {
			var obj = background.sources[i];
			createLink(par,obj.url,obj.title);
        }
		
        // background.sources.forEach(function(obj, i){
        //});


        document.querySelector("#decodex-insoumis-window").style.display = "block";
        document.querySelector("#verif-insoumis").classList.remove("active");
        document.querySelector("#decodex-insoumis-window").classList.add('active');
        //document.querySelector("#more-info-insoumis").href = "https://laec.fr/section/8/la-revolution-citoyenne-dans-les-medias";
    }
    else {
        document.querySelector("#verif-insoumis").style.display = "block";
        document.querySelector("#decodex-insoumis-window").classList.remove('active');
        document.querySelector("#verif-insoumis").classList.add("active");
        document.querySelector("#decodex-insoumis-window").style.display = "none";

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
        for(var i=0;i<max_notes;i++){
            var thisCheckbox = document.getElementById("check-alert"+i);
            if (thisCheckbox) {
                if(results.infobulles[i] == true){
                    thisCheckbox.checked = true;
                }
                else {
                    thisCheckbox.checked = false;
                }
            }
        }
    });
	
	//linkInNewTab(document.querySelector(".propos-par a"));
	//linkInNewTab(document.querySelector("#more-info-insoumis"));
	
    for(var i=0;i<max_notes;i++){
        if (background.colors[i]) {
            var thisalert = document.querySelector("#alert"+i);
            if (thisalert) {
                thisalert.style.color = background.colors[i];
            }
        } else {
            //console && console.log("oups");
        }

    }
}

document.addEventListener('DOMContentLoaded', function () {
    main();
    for(var i=0;i<max_notes;i++){
            var thisCheckbox = document.querySelector("#check-alert"+i);
            if (thisCheckbox) {
                thisCheckbox.addEventListener('click', bulleStore);
            }
    }
    document.querySelector('#do-refresh-database').addEventListener('click', refreshDatabase);
});

