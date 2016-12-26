import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {  InicioComponent }     from './Inicio.component';
import {  DatosPersonaComponent }     from './DatosPersona.component';
import {  AcercaDeComponent }     from './AcercaDe.component';
import {  SalirComponent }     from './Salir.component';
import {  DatosGeneralesComponent }     from './DatosGenerales.component';
import {  LoginComponent }     from './Login.component';


const routes: Routes = [
  { path: '', redirectTo: '/Inicio', pathMatch: 'full' },
  { path: "Inicio", component: InicioComponent },{ path: "DatosPersona", component: DatosPersonaComponent },{ path: "AcercaDe", component: AcercaDeComponent },{ path: "Salir", component: SalirComponent },{ path: "DatosGenerales", component: DatosGeneralesComponent },{ path: "Login", component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
