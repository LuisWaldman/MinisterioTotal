/*Actualizado 2*/
var parseString = require('xml2js').parseString;
var fs = require('fs');
var hacerarchivo = require('./hacerarchivo');
var hacercomponente = require('./hacercomponente');
var HacerAppModule = require('./HacerAppModule');
var Hacerrouter = require('./Hacerrouter');
var hacermenu = require('./hacermenu');

var hacerPaginaHTML = require('./hacerPaginaHTML');
var hacermodelo = require('./hacermodelo');
var hacerclases = require('./hacerclases');

var AdmClases = require('./AdmClases');
var TagHtml = require('./TagHtml');
var Componente = require('./Componente');
var ComponenteTS = require('./ComponenteTS');


var ArchivoSistema = 'ArchivoSistema.xml';
fs.readFile(ArchivoSistema, 'utf8', function(err, data) {
  
  parseString(data, function (err, result) {
      if (err != null)
        console.log(err);
    if (!result)
    {
        console.log('XML mal formado');
        return;
    }        
        
    HacerSistema(result.sistema);
  });
});

function HacerSistema(Sistema)
{ 
    /*Crea la estructura de directorios*/
    var Menu = Sistema.menus[0];
    var Pantallas = Sistema.pantallas[0];

    HacerAppModule(Pantallas.pantalla);
    Hacerrouter(Pantallas.pantalla);
    
    fs.writeFile("./sistema/app/KeyValue.ts","export class KeyValue { constructor(public Key: string, public Value: any) {}}");

    hacerarchivo(
        './sistema/app/main.js',
        '"use strict"; \r\n' +
'var platform_browser_dynamic_1 = require(\'@angular/platform-browser-dynamic\'); \r\n' +
'var app_module_1 = require(\'./app.module\'); \r\n' +
'platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule); \r\n' +
'//# sourceMappingURL=main.js.map`,{}); \r\n', {});

    var htmlMainApp = TagHtml('div',{},
    [
        TagHtml('cabecera'),
        hacermenu(Menu),
        TagHtml('router-outlet'),
        TagHtml('pie'),
    ]);
    htmlMainApp.tagInteriores[0].autocierre = false;
    htmlMainApp.tagInteriores[2].autocierre = false;
    htmlMainApp.tagInteriores[3].autocierre = false;
    Componente('app', htmlMainApp, ComponenteTS('app', 1)).GenerarArchivo();


    var pieH = TagHtml('b');
    pieH.innerHTML = 'Desarrollado por LW.'
    Componente('pie', pieH, ComponenteTS('pie', 1)).GenerarArchivo();
  
    var cabeceraH = TagHtml('h1');
    cabeceraH.innerHTML = 'La aplicacion'
    Componente('cabecera', cabeceraH, ComponenteTS('cabecera', 1)).GenerarArchivo();
    

    var admclases = AdmClases();
    for (var c in Pantallas.pantalla)
    {
        var nombre = Pantallas.pantalla[c].$.nombre
        
        if (Pantallas.pantalla[c].control) 
        {
            var TS = ComponenteTS(nombre, 1);
            var html = hacerPaginaHTML(Pantallas.pantalla[c], TS);
            var comp = Componente(nombre, html, TS);
            hacerclases(Pantallas.pantalla[c], admclases);
            comp.GenerarArchivo();
        }
        else
        {            
            var auto = TagHtml('b');
            auto.innerHTML = nombre + ' autogenerado'
            Componente(nombre, auto, ComponenteTS(nombre, 1)).GenerarArchivo();
        }
    }
    admclases.GuardarClasesTS();
}
