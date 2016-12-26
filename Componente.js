var TagHtml = require('./TagHtml');
var fs = require('fs');


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

Componente = function(nombre, tags, logica)
{
    return {
        nombre: nombre,
        tags: tags,
        logica: logica,
        NombreArchivoHTML: './sistema/templates/{*nombre*}.html',
        NombreArchivoTS: './sistema/app/{*nombre*}.component.ts',
        GenerarArchivo: function() 
        {

            var ArchivoTemplateHTML = this.NombreArchivoHTML.replaceAll("{*nombre*}", this.nombre)
            fs.writeFile(ArchivoTemplateHTML, tags.toString());

            var NombreArchivoTS = this.NombreArchivoTS.replaceAll("{*nombre*}", this.nombre)
            fs.writeFile(NombreArchivoTS, logica.toString());

        }


    };
};

module.exports = Componente;