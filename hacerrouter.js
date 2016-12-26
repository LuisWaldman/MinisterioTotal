var hacerarchivo = require('./hacerarchivo');

module.exports  = function(Pantallas) 
{
  imports += "import {  " + pantalla.nombre + "Component }     from './" + pantalla.nombre + ".component';\r\n";
  var ContenidoArchivo = "import { NgModule }             from '@angular/core';\r\n";
ContenidoArchivo += "import { RouterModule, Routes } from '@angular/router';\r\n";
ContenidoArchivo += "\r\n";
ContenidoArchivo += "\r\n";
ContenidoArchivo += "{*imports*}\r\n";
ContenidoArchivo += "\r\n";
ContenidoArchivo += "const routes: Routes = [\r\n";
ContenidoArchivo += "  { path: '', redirectTo: '/Inicio', pathMatch: 'full' },\r\n";
ContenidoArchivo += "  {*paths*}\r\n";
ContenidoArchivo += "];\r\n";
ContenidoArchivo += "\r\n";
ContenidoArchivo += "@NgModule({\r\n";
ContenidoArchivo += "  imports: [ RouterModule.forRoot(routes) ],\r\n";
ContenidoArchivo += "  exports: [ RouterModule ]\r\n";
ContenidoArchivo += "})\r\n";
ContenidoArchivo += "export class AppRoutingModule {}\r\n";






    var imports = ''; 
    var paths = ''; 

    for (var p in Pantallas)
    {
        
        pantalla = Pantallas[p].$
        imports += "import {  " + pantalla.nombre + "Component }     from './" + pantalla.nombre + ".component';\r\n";
        paths += '{ path: "'+ pantalla.nombre + '", component: '+ pantalla.nombre + 'Component },'
    }


    hacerarchivo('./sistema/app/app-routing.module.ts',ContenidoArchivo,
    {
        imports: imports,
        paths: paths
    });
}