var Cfuncion = require("./Cfuncion")

var template ="{*import*}\r\n";
template +="\r\n";
template +="@Component({\r\n";
template +="  selector: '{*nombre*}',\r\n";
template +="  templateUrl: './templates/{*nombre*}.html'\r\n";
template +="})\r\n";
template +="export class {*nombre*}Component {\r\n";
template +="  {*atributos*}\r\n";
template +="  {*modificacionesclase*}\r\n";
template +="  {*funciones*}\r\n";
template +="}\r\n";

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

module.exports  = function(nombre, modelo)
{
    this.imports = [];
    if (modelo == 1)
    {
        this.imports[this.imports.length] = { import: 'Component', target: '@angular/core' };
    }

    return {
        nombre: nombre, 
        imports: imports,
        modificacionesclase: '',
        ngOnInit: '',
        atributos: [],
        AddAtributo: function(nombre, tipo)
        {
            this.atributos[this.atributos.length] = { nombre:nombre, tipo:tipo}
        },
        clases: [],
        Funciones: [],
        agregarImport: function(nombre) 
        {
            var encontro = false;
            for (var i in this.imports)
            {
                if (this.imports[i].import == nombre)
                {
                    encontro = true;
                }
            }
            if (!encontro)
            {
                this.imports[this.imports.length] = { import: nombre, target: './' + nombre }
            }
        },
        agregarTextoAFuncion: function(nombrefuncion, texto)
        {

            var fun = null;
            for (var i in this.Funciones)
                if (this.Funciones[i].nombre == nombrefuncion)
                    fun = this.Funciones[i];
            if (fun == null)
            {
                fun = Cfuncion(nombrefuncion, [], '');
                this.Funciones[this.Funciones.length] = fun; 
            }
            fun.texto += texto;
        },
        agregarListadoKeyValue: function(clase)
        {
            this.agregarImport("KeyValue");
            this.agregarImport(clase + "Service");

            this.AddAtributo(clase + "s", 'KeyValue[]');
            this.AddAtributo("obj" + clase + "Service", clase + "Service");

            
            var texto = 'this.' + clase + 's = this.obj' + clase + 'Service.Get();\r\n';
            
            this.agregarTextoAFuncion('ngOnInit', texto);
        },
        toString: function() 
        {
            var importBlock = ""
            var funciones = "";
            var atributos = "";

            for (var i in this.clases)
            {
                this.agregarImport(this.clases[i], this.clases[i] + '.service');
            }


            for (var i in this.imports)
            {
                importBlock += "import { " + this.imports[i].import  +" } from '" + this.imports[i].target  +"'; \r\n"
            }

            for (var i in this.Funciones)
            {
                funciones+= this.Funciones[i].toString();
            }
            
            for (var a in this.atributos)
            {
                if (this.atributos[a].tipo.indexOf('[]') !== -1)
                    atributos += "    " + this.atributos[a].nombre + ":" + this.atributos[a].tipo + " = [];\r\n";
                else
                    atributos += "    " + this.atributos[a].nombre + ":" + this.atributos[a].tipo + " = new " + this.atributos[a].tipo + "();\r\n";
            }


            ret = template
                .replaceAll('{*import*}', importBlock)
                .replaceAll('{*funciones*}', funciones)
                .replaceAll('{*atributos*}', atributos)
                
                .replaceAll('{*nombre*}',this.nombre)
                .replaceAll('{*modificacionesclase*}',this.modificacionesclase);
                
            return ret;
        }
    }


};