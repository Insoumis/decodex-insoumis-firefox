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

(function decodexInfobulle(){
    'use strict';

    var infobulle;
    var removeTimeout;
    var removeAfter = 20000; // En milliseconde (avant : 10 secondes)

    var heights = [213, 180, 212, 203, 213];

    var class_colors = ["not-a-source", "satirical", "complotist", "dubious", "trusted", "trusted"]


    // Helpers function
    function closeInfoBulle(){
        clearTimeout(removeTimeout);
        infobulle.style.opacity = 0;
        infobulle.style.transform = 'translate(0,-100%)';
        removeTimeout = setTimeout(function(){
            removeElement(infobulle);
        }, 1000);
    }

    function clearRemoveTimeout(){
        clearTimeout(removeTimeout);
    }

    function removeAterTime(){
        removeTimeout = setTimeout(closeInfoBulle, removeAfter);
    }

    function removeElement(elem){
        if(elem) elem.parentNode.removeChild(elem);
    }

    function forEach(arr, fn){
        for(var i = 0, l = arr.length; i<l; i++)
            fn.call(arr, arr[i], i, l);
    }

    function createChild(parent, tag){
        var elem = document.createElement(tag);
        parent.appendChild(elem);
        return elem;
    }

    function appendText(parent, text){
        var elem = document.createTextNode(text);
        parent.appendChild(elem);
        return parent;
    }

    function isVisible(elem){
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ); // Merci jquery
    }

    function css(elem, styles, important){
        var i, l;
        var merged = {};
        styles = [].concat(styles);
        for(i = 0, l = styles.length; i<l; i++)
            for(var style in styles[i])
                merged[style] = styles[i][style] + ((important) ? ' !important' : '');

        var balise = '';
        for(var attr in merged)
            balise += attr+':'+merged[attr]+';';

        elem.setAttribute('style', balise);
        return elem;
    }


    browser.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        // Supprimer infobulle si existant
        clearRemoveTimeout();
        removeElement(infobulle);

        if (request.show_popup){ // debunker
            // Ajout du contenu

            forEach(document.querySelectorAll('body *'), function(elem){
                var style = window.getComputedStyle(elem);
                if(style.position != 'static' && style.zIndex == '2147483647')
                    elem.style.zIndex = '2147483646';
            });

            var body = document.querySelector('body');

            // Création de la structure du popup
            infobulle = createChild(body, 'div');
                var header = createChild(infobulle, 'header');
                    var title = createChild(header, 'h1');
                        var picto = createChild(title, 'span');
                    var close = createChild(header, 'div');
                var content = createChild(infobulle, 'div');
                    var text = createChild(content, 'div');
                    var more = createChild(content, 'p');

            // Ajout du style
            var forceImportant = true;
            //var currentColor = colors[soumission]; // note
            var currentColor = request.color; // note

            var reset = {
                'display': 'block',
                'position': 'static',
                'box-sizing': 'border-box',
                'margin': '0',
                'padding': '0',
                'width': 'auto',
                'height': 'auto',
                'min-height': '0',
                'min-width': '0',
                'max-height': 'auto',
                'max-width': 'auto',
                'background': 'transparent',
                'z-index': 'auto',
                'transform': 'none',
                'top': 'auto',
                'bottom': 'auto',
                'left': 'auto',
                'right': 'auto',
                'border': 'none',
                'outline': '0',
                'float': 'none',
                'opacity': '1',
                'border-radius': '0'
            };

            var resetText = {
                'font-family': 'Helvetica, Arial, sans-serif',
                'color': '#2e3942',
                'font-size': '13px',
                'line-height': '1.38',
                'font-weight': 'normal',
                'font-style': 'normal',
                'font-variant': 'normal',
                'text-decoration': 'none',
                'text-align': 'left',
                'text-indent': '0',
                'text-transform': 'none',
                'letter-spacing': 'normal',
                'direction': 'ltr',
                'world-spacing': '0'
            };

            css(infobulle, [reset, {
                'top': '60px', // changement insoumis
                'right': '20px',
                'position': 'fixed',
                'width': '255px',  // changement insoumis
                //'width': '215px',
                'border-radius': '2px',
                'background-color': '#fafbfc',
                'box-shadow': '0 0 10px 0 #5d666d',
                'transition': 'all .5s ease',
                'opacity': '1',
                'transform': 'translate(0,0)',
                'overflow': 'hidden',
                "z-index": "2147483647"
            }], forceImportant);

            css(header, [reset, {
                'padding': '10px',
                'overflow': 'hidden',
                'background': currentColor
            }], forceImportant);

            css(title, [reset, resetText, {
                'font-size': '15px',
                'float': 'left',
                'line-height': '20px',
                'color': '#fff'
            }], forceImportant);

            css(picto, [reset, resetText, {
                'display': 'inline-block',
                'width': '22px',
                'height': '22px',
                'border': 'solid 2px #ffffff',
                'border-radius': '20px',
                'vertical-align': 'top',
                'text-align': 'center',
                'line-height': '18px',
                'margin': '-1px 10px -1px 0',
                'color': '#fff'
            }], forceImportant);

            css(close, [reset, resetText, {
                'float': 'right',
                'overflow': 'hidden',
                'width': '15px',
                'height': '20px',
                'background': 'url(data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2013%2013%22%3E%0A%3Cstyle%20type%3D%22text/css%22%3E%0A%09.st0%7Bfill%3A%23FFFFFF%3B%7D%0A%3C/style%3E%0A%3Cpolygon%20id%3D%22_x2B_%22%20class%3D%22st0%22%20points%3D%220.7%2C1.9%205.5%2C6.6%200.7%2C11.4%201.9%2C12.5%206.6%2C7.7%2011.4%2C12.5%2012.5%2C11.4%207.7%2C6.6%2012.5%2C1.9%2011.4%2C0.7%0A%096.6%2C5.5%201.9%2C0.7%20%22/%3E%0A%3C/svg%3E) center no-repeat',
                'text-indent': '100%',
                'white-space': 'nowrap',
                'overflow': 'hidden',
                'cursor': 'pointer'
            }], forceImportant);

            css(content, [reset, {
                'padding': '10px'
            }], forceImportant);

            css(text, [reset, resetText, {
                'margin': '0 0 5px 0'
            }], forceImportant);

            css(more, [reset, resetText, {
                'font-weight': 'bold',
                'color': '#16212c'
            }], forceImportant);

            // Ajout du contenu
            appendText(title, request.bandeau_msg); // note
            // le picto= un carré avec border-radius + un caractere
            appendText(picto, '!');
            appendText(close, 'Fermer');
            text.innerText = request.message; // no html
            var icone = new Image();
            icone.src = request.icone; // note
            css(icone, [reset, {
                'vertical-align':'middle',
                'display': "inline-block"
            }], forceImportant);
            more.innerHTML = "<span style='vertical-align:middle;'>+ d'infos en cliquant sur &nbsp;</span>";
            more.appendChild(icone);
            // Bind des event au clique

            close.addEventListener('click', closeInfoBulle);
            infobulle.addEventListener('mouseenter', clearRemoveTimeout);
            infobulle.addEventListener('mouseleave', removeAterTime);
            removeAterTime();
        }
        else {
            if (request.text == 'report_back') {
               sendResponse({farewell: document.querySelector(".yt-user-info").getElementsByTagName('a')[0].href});
               //console.log("URL CHANNEL ---> " + document.querySelector(".yt-user-info"));
            }

        }
      });

    /*browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg.text === 'report_back') {
            sendResponse({farewell: document.getElementsByClassName("yt-user-info")[0].getElementsByTagName('a')[0].href});
            //console.log("URL CHANNEL ---> " + document.getElementsByClassName("yt-user-info")[0].getElementsByTagName('a')[0].href);
        }
    });*/

})();





