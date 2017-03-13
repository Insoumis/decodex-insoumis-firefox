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

function bulleStore(e){
    var infobulles;
    var infobulles_once;
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

function main(){
    var colors = [
        "#A2A9AE", // gris
        "#F5A725", // rouge
        "#D50303", // jaune
        "#129AF0", // bleu
        "#468847", // vert
        "#468847"  // INSOUMIS AUSSI :D
    ];

    browser.storage.local.get('infobulles', function(results){

    try {
        for(var i=0;i<6;i++){
            if(results.infobulles[i] == true){
                var selector = document.getElementById('check-alert' + i);
                if (selector) {
                    selector.checked = true;
                }
            }
            else {
                var selector = document.getElementById('check-alert' + i);
                if (selector) {
                    selector.checked = true;
                }
            }
        }
    } catch(e) {
        console && console.log("error in install.js for infobulles, check-alert"+i);
        console && console.error(e);
    }

    });
}
document.addEventListener('DOMContentLoaded', function () {
    try {
        for(var i=0;i<6;i++){
            var selector = document.getElementById('check-alert' + i);
            selector.addEventListener('click', bulleStore);
        }
    } catch(e) {
        // generait des erreurs
        if (0) {
            console && console.info("error in install.js for check-alert"+i);
            console && console.error(e);
        }
    }

    try {
        for(var i=0;i<6;i++){
            var selector = document.getElementById('check-alert' + i);
            if (selector) {
                selector.addEventListener('click', bulleStore);
            }
        }
    } catch(e) {
        console && console.info("error in install.js for check-alert"+i);
        console && console.error(e);
    }
    main();
});
