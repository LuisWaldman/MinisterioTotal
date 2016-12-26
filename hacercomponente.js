var fs = require('fs');
var hacerarchivo = require('./hacerarchivo');

hacercomponente = function(componente) {

        
if (componente.TemplateArchivoTS != undefined)
{
    TemplateArchivoTS = componente.TemplateArchivoTS;
}



var NombreArchivoTS = './sistema/app/{*nombre*}.component.ts';
TemplateArchivoHTML = 'Control {*nombre*} autodesarrollado';
NombreArchivoHTML= './sistema/templates/{*nombre*}.html';

if (componente.TemplateArchivoHTML != undefined)
{
    TemplateArchivoHTML = componente.TemplateArchivoHTML;
}



hacerarchivo(NombreArchivoTS, TemplateArchivoTS, componente );
hacerarchivo(NombreArchivoHTML, TemplateArchivoHTML, componente );


}


module.exports  = hacercomponente;