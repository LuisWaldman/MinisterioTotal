var fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

module.exports  = function(nombrearchivo, template, objeto)
{
    var ContenidoArchivo = template;
    if (objeto != undefined)
    {
        for (var c in objeto)
        {
            ContenidoArchivo = ContenidoArchivo.replaceAll('{*' + c + '*}', objeto[c]);
            nombrearchivo = nombrearchivo.replaceAll('{*' + c + '*}', objeto[c]);
            
        }
    }
  
    fs.writeFile(nombrearchivo,ContenidoArchivo,function(error){
        if (error)
            console.log(error);
        
    });
};