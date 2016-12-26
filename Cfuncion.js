module.exports = function(nombre, parametros, texto) {
    return {
        nombre: nombre,
        parametros: parametros,
        texto : texto,
        toString: function() {
            var ret = "";

            ret += nombre + "(";
            var par = "";
            for (var c in this.parametros)
            {
                if (par != "")
                    par += ","
                par += this.parametros[c];
            }
            ret += par + ") { \r\n";
            ret += this.texto;
            ret += "} \r\n"




            return ret;
        }

    }

}