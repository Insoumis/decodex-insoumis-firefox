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
            'infobulles': infobulles,
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

        for(var i=0;i<5;i++){
            if(results.infobulles[i] == true){
                document.getElementById("check-alert" + i).checked = true;
            }
            else {
                document.getElementById("check-alert" + i).checked = false;
            }
        }

    });
}
document.addEventListener('DOMContentLoaded', function () {

    for(var i=0;i<5;i++){
        var selector = document.querySelector('#check-alert'+i).addEventListener('click', bulleStore);
    }
    main();
});
