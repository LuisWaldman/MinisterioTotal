
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { appComponent }  from './app.component';

import {  InicioComponent }     from './Inicio.component';
import {  DatosPersonaComponent }     from './DatosPersona.component';
import {  AcercaDeComponent }     from './AcercaDe.component';
import {  SalirComponent }     from './Salir.component';
import {  DatosGeneralesComponent }     from './DatosGenerales.component';
import {  LoginComponent }     from './Login.component';



import { cabeceraComponent }  from './cabecera.component';
import { pieComponent }  from './pie.component';


import { AppRoutingModule }     from './app-routing.module';

@NgModule({
imports:      [ BrowserModule, AppRoutingModule, FormsModule ],
declarations: [ appComponent,
cabeceraComponent,pieComponent, 
InicioComponent,DatosPersonaComponent,AcercaDeComponent,SalirComponent,DatosGeneralesComponent,LoginComponent
],
bootstrap:    [ appComponent ]
})
export class AppModule {
}
