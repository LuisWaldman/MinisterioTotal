var TagHtml = require('./TagHtml');

HacerMenu = function (Menu)
{
    var Menus = [];    
    var cont = 0;
    for (var menu in Menu.menu) 
    {
        
        var nuevoMenu = null;
        var MiMenu = Menu.menu[menu];
        if (MiMenu.submenu != undefined)
        {

            var Fila = MiMenu.$;
            nuevoMenu = TagHtml("li", { "class":"dropdown" });
            
            var tagA = TagHtml("a", { ref: "#","class":"dropdown-toggle","data-toggle":"dropdown","role":"button","aria-haspopup":"true","aria-expanded":"false" });
            tagA.innerHTML = Fila.texto;

            var nuevoSpan = TagHtml("span", { "class":"caret" });
            nuevoSpan.autocierre = false;
            var tagUL = TagHtml("ul", { class:"dropdown-menu"});

            tagA.tagInteriores[0] = nuevoSpan;
            nuevoMenu.tagInteriores[0] = tagA;
            nuevoMenu.tagInteriores[1] = tagUL;
            

            var ContSubMenu = 0;
            for (var submenu in MiMenu.submenu)
            {

                var Submenu = MiMenu.submenu[submenu]
                var Fila = Submenu.$;                

                var tagAc = TagHtml('a',{routerLink: Fila.pantalla, routerLinkActive: "active" });
                tagAc.innerHTML = Fila.texto;
                
                var nuevoli = TagHtml('li',{class:"nav navbar-nav"});
                nuevoli.tagInteriores[0] = tagAc;

                tagUL.tagInteriores[ContSubMenu] = nuevoli;
                ContSubMenu++;


            }
            
        }
        else
        {
            var pantalla = MiMenu.$.pantalla;
            var tagAc = TagHtml('a',{routerLink: pantalla, routerLinkActive: "active" });
            tagAc.innerHTML = MiMenu.$.texto;
            
            nuevoMenu = TagHtml('li',{class:"nav navbar-nav"});
            nuevoMenu.tagInteriores[0] = tagAc;
            
        }
        Menus[cont] = nuevoMenu;
        cont++;
    }


    var retMenu = TagHtml('nav',{class:"navbar navbar-default", role:"navigation"});
    var retUl = TagHtml('ul',{class:"nav navbar-nav"},Menus);
    retMenu.tagInteriores[0] = retUl;
    return retMenu;
}


module.exports  = HacerMenu;