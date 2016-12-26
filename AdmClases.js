var fs = require('fs');
var Cfuncion = require('./Cfuncion');

function NuevaClase(nombre) {
    return {
        nombre: nombre,
        atributos: [],
        AddAtributo: function(nombre, tipo)
        {
            var Encontro = false;
            for (var i in this.atributos)
                Encontro = Encontro || (this.atributos[i].nombre == nombre)
                
            if (!Encontro)
                this.atributos[this.atributos.length] = { nombre:nombre, tipo:tipo}
        },        
        funciones: [],
        AddFuncion: function(funcion)
        {
            var Encontro = false;
            for (var i in this.funciones)
                Encontro = Encontro || (this.funciones[i].nombre == funcion.nombre)
                
            if (!Encontro)
                this.funciones[this.funciones.length] = funcion;
        },
        imports: [],
        AddImport: function(nombre) 
        {
            var Encontro = false;
            for (var i in this.imports)
                Encontro = Encontro || (this.imports[i].import == nombre)
                
            if (!Encontro)
                this.imports[this.imports.length] = { import: nombre, target: './' + nombre }
        },

        toString: function() {
            var ret = '';
            for (var i in this.imports)
            {
                ret += "import { " + this.imports[i].import  +" } from '" + this.imports[i].target  +"'; \r\n"
            }

             ret += "export class " + this.nombre + " { \r\n"
            for (var a in this.atributos)
            {
                ret += "    " + this.atributos[a].nombre + ":" + this.atributos[a].tipo + ";\r\n";
            }
            for (var a in this.funciones)
            {
                ret += this.funciones[a].toString()  + "\r\n";
            }
            ret += "} \r\n";
            return ret;
        }
    };
}

function AdmClases() 
{
    return {
        Clases: [],
        
        GetClase: function(nombre) {
            for (var c in this.Clases)
                if (this.Clases[c].nombre == nombre)
                    return this.Clases[c];
            

       var ret = NuevaClase(nombre);
        this.Clases[this.Clases.length] = ret;
        return ret; 
        },
        GuardarClasesTS: function() {
            
            for (var c in this.Clases)
            {
                var filename = "./sistema/app/"  +  this.Clases[c].nombre + ".ts";
                fs.writeFile(filename, this.Clases[c].toString());

            }
            

        }


    };

}

module.exports = AdmClases;