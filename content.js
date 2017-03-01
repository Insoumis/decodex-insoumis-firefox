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
(function decodexInfobulle(){
    'use strict';

    var infobulle;
    var removeTimeout;
    var removeAfter = 10000; // En milliseconde

    var messages = [
        "Attention, nous n'avons pas encore évalué ce site, il n'est pas indépendant à proprement parler ou sa soumission est trop variable pour entrer dans nos crittères. Cela ne signifie pas que ces informations sont fausses, mais nous vous conseillons de chercher des sources supplémentaires, peut être d'un bord opposé à ce site.",
        "Attention, il s'agit d'un site satirique ou parodique qui n'a pas vocation à diffuser de vraies informations. A lire au second degré",
        "Ce site diffuse régulièrement des informations biaisées (orientées trop à gauche ou trop à droite). Il se peut m&ecirc;me que certaines informations soient fausses ou que le titre raccoleur soit en contradiction avec le contenu de l'article. Restez vigilant et cherchez d'autres sources plus fiables. Si possible, remontez à l'origine de l'information, ou cherchez l'information sur un média d'un bord opposé.",
        "Ce site peut réguli&egrave;rement diffuser des informations orientées (à gauche ou à droite), imprécise voir sans véritable sources. Il est également possible que certains journalistes s'auto-censurent, soient soumis ou de mauvaise foi, ou souffrent de légers biais de confirmation (ce qui n'est pas grave, cela nous arrive à tous.",
        "Ce site est en principe plutôt indépendant, voir non soumis à a une grande fortune ou un parti politique. Mais n’hésitez pas à confirmer l’information en cherchant d’autres sources fiables en remontant à son origine, ou encore a lire ce que des médias moins indépendants pensent de cette information."
    ];

    var icones = [
// gris
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAH1SURBVHjapNRLiM5hFMfxz5jXzMLKYhYsXCaXIsMkt+xGWYwlRhxKaoopY2M2ysLGwrBhIRuXzEOTDCVlZTVNUSgbSkLJJZeUjcZlbJ63Hn/vzChnc57b+Z7fczlP08TEhEaWUurADnRhPh5hb0R8MIXVGoBacQL70VJMzcFq3JkK2FQqTCnNwjC25KG3aMuJX2N5Vrwb7fiMixExVGfMqCQ4XsBOZpU1/EAfjuIGtqITm3A5pXTwL2BKaWUOgrMRMYDbOJRVrcfh+jy2YST3B1NKK6oK9xRbOwIR8TMiTuMlBvK6UxHRFxHXsRMP0Zp38wdwY/Y3I+JL5Sj6MRNvcKw+GBHjuFLGl8D27J9Wbr2G7iLZ10qyF9nPrQKbs/9eCViIxbk90uCl1OMmqsB3xXsrrTNv9wseNwAuKeNL4Gj23ZWANcXWPlaOoxnbc/d+FTiUZa9NKfUW4wuyfx4R1Trtw0r8woU/gBExmqsEzqSUenK7rQ6sqAsM1sVExFijWu7HMnRgOKW0GYvy3KeUUgs24ED+OOBefvx/13LOPC/L76oke4VvWFqM3UJvRLyfFFgc9r6sZBWaiulxPMC5iLg05W/TAFzDWL7pazifL+fZP31fk0CH0YOrEbHLNDbD9PYk+3X5Uv4beDd/pDXMnm7x7wEA2Vudl/vKGmcAAAAASUVORK5CYII=',
// bleu OK
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIHSURBVHjapNQ9iJVHFMbx3+veaJEqxRZJoWaJCkr8mOBHCFhsIYx2wSiSBIKwYLbYNNqks3W1UIslTaKwCIsoCSFcKxtlIYKvYGMghCQQYoIaFmzErI7NWZh9vXstnObM1/mfZ+bMmaaUYlBr+u1WHMY41uEOvig5PTCk9QaA1uAUjmF1tfQ2PsC1YcCmVtj02zcxhwMxdR+jEfgvbAnFn2EM/+FCyWl2JeBZTMXwNG7gByziY+zF8QHCpkpO52FVBduGyRjOlJxO4Cd8Far2VLAZHMTVGE83/fb9ZUB8Xh3tayg5PSs5ncMfOBH7zpScJktOV3AELdbEnS8DfhT2+5LTQvdIeAN/4+TSZMnpKS7V/jVwLOwvnaz3sL8K9rgT7Pew73SBI2H/7zi8iw3RvzogIUt+pQv8p3pvddsRx13A3QHAjbV/DbwZdn/HYWd1tIed6xjBJzG81QXOhuxdTb+dqObXh/2t5NSt00lsw3N8twxYcroZVQLnm357KPqjS8COuk8xvSSm5DQ/qJansBlbMdf02314L9YeNf12NT7El/FxwM/x+F8uvYi8NuSPd4L9iSfYVM39iImS078rAqvLPhpKtqOplp/iNr4pOV0c+tsMAPcwH5m+jG8jOb+u5LNq2N9WclqsKmGx5HRtGOyVwGj3wu6OpHhd4PX4SHt461WbXwwABPGiThCuZUYAAAAASUVORK5CYII=",

// rouge
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIESURBVHjapNRLiI9RGMfxz5g/FlYWFizcciliSO9BdqMsWLwLt4SSUkwZGzbKwsbCZcNCNi6RmmQ4SVlZSXnfUDaUhJJLLk3ZiGFszr+Od/7+Fs7mObfn+/zO5Xl6xsbGdGpVWSzFVvRjFh5jV4j1R11aqwNoMo5jLyZlS9OxAne6AXtyhVVZTMEQNqSpd5iWAr/B4qR4B+biCy6GWF9pMyY0AhzLYCeTyhZGMYAjuIGNWI61uFyVxf5xwKos+pITnA2xPoTbOJBUrcLB9jo2YTiNT1RlsaSpcGd2tMMQYv0zxPo0XuFQ2ncqxHogxPo6tuERJqfT/AFck+zNEOuRxlUMYiLe4mh7MsT6O67m/jlwbrLPGq/ewvos2NdGsJfJzmgCe5P90XCYg/mpP9zhp7T9xprA99l/y9vydNwRPOkAXJD758B7ya5vOBTZ0T41rqMXm9vDJvBKkh2qstiTzc9O9kWIdTNPB9CHX7jwBzDE+l7KEjhTlcWW1J/WBjbUbceJtpgQ6/udcnkQi7AUQ1VZrMO8tPa5KotJWI19qXDAg/T5x+dyijwzye9vBHuNb1iYzd3CnhDrD38FZpe9OylZhp5s+Tse4lyI9aWu1aYDuIX76aWv4Xx6nOd/85nQrbaFWI9mmTAaYn2nG+yfwNSeJrsyPYr/Bd5NhbSFqf/a/HsAGnieeoDVMFcAAAAASUVORK5CYII=",
// jaune
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAH8SURBVHjapNQ7aFRREMbx303WWNhokULBV/AByk0UiSKCRQqR2AkqqIUIAY0QGys7W00jQYKNDwhCEESxSaONIaAYhL2FgoiI4gMfBGw0Bo/FHtezN5tN4YFl7p3Z+c93ztw5WQhB01Vk3TiCPqzFM5yQh89arEoT0FJcxCl0JJGV2IGJVsCsQWGRLcM4DkTPB3TGwu+wNSo+ji58ww15GFsIeBlD8W0Yj3APcziIvTjXRNiQPIw0AousB0+jmlF5GFRk7TgTz28/zkfAKB7gaCz0E73yUAgh1H5Vw6EqhKq3oWp53V+LrQ5VszE+nPg7QtV09F8JIWhLZO+J9q48zMzbEkvwHhfq3jzM4laanwK7on1R6noF/Umx76Vir6NdVQa2R/urlLAeG+PznSYN+ZsXysCPyfeWru1xuzOoNgFuSvNT4GS0/aWE3mRrX0rH0Y5D8e1JGTgWZe9UZAOJf120r+Tz5nQQPfiN643APEzGKYERRXY4PnfWgY3qjuFSXUwepprN8hC2oBvjimwfNsTYV0XWgd04HS8OeIyzzUevVnlNlN9XKvYGP7A58d3HgDx8Whj477BPRiXbkCXRWUzjqjzcbH3bzAdXMBU7fRvXYnNeLpTS1upuk4e5ZBLm5GGiFWxxYG09j3ZXbIr/BT6MF2kFKxb7858BAMnDvzDzyJQxAAAAAElFTkSuQmCC",
// vert
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIGSURBVHjapNQ5aBVRFMbxX/RpCiuLDGjhElxAMTGIG3YKFrFUI24gQuAaMDbayFgIg4XRRgvHxgWDEsQoiGBlFQIKKtgoiKggLuNCwEbiEpv7YDJ5SQRPc+52/ue7y7lNY2NjGlmWJ23Yhc1YiKc4kIbisyms1gDUjNMImF2amoc1uD8VsKmsMMuTORjAtjj0AS0x8TusjIr3oRXfcCUNRX+dMaOS4FQJdiaqrOEXenACt7EdHdiCa1meHJ4AzPKkPQbBhTQUx3APR6KqDThan8cODMZ+X5Ynq6oK95e2dhzSUPxOQ3EOb3AsrjubhqInDcUt7MYTNMfdjANuiv5OGoqRylH0Yhbe42R9MA3FKK6X48vA1uhfVG69hs5Ssu+VZK+jn18Fzoz+ZyVgMZbG9mCDl1KPG6sCP5beW9k64nZH8KwBcFk5vgwcir6zErC2tLUvleOYiZ2x+6gK7I+y12V50l0aXxT9qzQU1TrtQTv+4PI4YBqKoVglcD7Lk67YbqkDK+r2oq8uJg3FcKNa7sUKtGEgy5OtWBLnvmZ5MhsbcSh+HPAwPv6JtRwzL4jyN1eSvcUPLC+N3UV3GopPkwJLh30wKlmNptL0KB7jYhqKq1P+Ng3ANQzHm76JS/FyXv7T9zUJdABduJGGYo9pbIbp7Xn06+Ol/DfwQfxIa5g73eK/AwCsf5zapnlOZAAAAABJRU5ErkJggg=="
    ];
    var msg_bandeau = [
        "Attention !",
        "Attention !",
        "Attention !",
        "Attention !",
        "Informations !",
    ];

    var heights = [213, 180, 212, 203, 213];
    var colors = [
        "#A2A9AE", "#129AF0", "#D50303", "#F5A725", "#468847"
    ];

    var class_colors = ["not-a-source", "satirical", "complotist", "dubious", "trusted"]


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

        if (request.text.indexOf("soumis") != -1 ){ // debunker
            var soumis = parseInt(request.text.replace('soumis', '')); // note
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
            var currentColor = colors[soumis]; // note

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
                'top': '20px',
                'right': '20px',
                'position': 'fixed',
                'width': '215px',
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
            appendText(title, msg_bandeau[soumis]); // note
            appendText(picto, '!');
            appendText(close, 'Fermer');
            text.innerHTML = messages[soumis]; // note
            var icone = new Image();
            icone.src = icones[soumis]; // note
            css(icone, [reset, {
                'vertical-align':'middle',
                'display': 'inline-block'
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





