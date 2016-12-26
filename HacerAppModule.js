var hacerarchivo = require('./hacerarchivo');

module.exports  = function(Pantallas) {
var ContenidoArchivo = "\r\n"
ContenidoArchivo += "import { NgModule }      from '@angular/core';\r\n"
ContenidoArchivo += "import { BrowserModule } from '@angular/platform-browser';\r\n"
ContenidoArchivo += "import { FormsModule }   from '@angular/forms';\r\n"
ContenidoArchivo += "import { appComponent }  from './app.component';\r\n"
ContenidoArchivo += "\r\n"
ContenidoArchivo += "{*imports*}\r\n"
ContenidoArchivo += "\r\n"
ContenidoArchivo += "\r\n"
ContenidoArchivo += "import { cabeceraComponent }  from './cabecera.component';\r\n"
ContenidoArchivo += "import { pieComponent }  from './pie.component';\r\n"
ContenidoArchivo += "\r\n"
ContenidoArchivo += "\r\n"
ContenidoArchivo += "import { AppRoutingModule }     from './app-routing.module';\r\n"
ContenidoArchivo += "\r\n"
ContenidoArchivo += "@NgModule({\r\n"
ContenidoArchivo += "imports:      [ BrowserModule, AppRoutingModule, FormsModule ],\r\n"
ContenidoArchivo += "declarations: [ appComponent,\r\n"
ContenidoArchivo += "cabeceraComponent,pieComponent, \r\n"
ContenidoArchivo += "{*declaration*}\r\n"
ContenidoArchivo += "],\r\n"
ContenidoArchivo += "bootstrap:    [ appComponent ]\r\n"
ContenidoArchivo += "})\r\n"
ContenidoArchivo += "export class AppModule {\r\n" 
ContenidoArchivo += "}\r\n"

    var imports = ''; 
    var declaration = ''; 

    for (var p in Pantallas)
    {
        
        pantalla = Pantallas[p].$
        imports += "import {  " + pantalla.nombre + "Component }     from './" + pantalla.nombre + ".component';\r\n";

        if (declaration != '')
            declaration += ',';
            declaration += pantalla.nombre + 'Component';
    }


    hacerarchivo('./sistema/app/app.module.ts',ContenidoArchivo,
    {
        imports: imports,
        declaration: declaration
    });
}