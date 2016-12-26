import { Component } from '@angular/core'; 
import { Login } from './Login'; 
import { KeyValue } from './KeyValue'; 
import { ProvinciaService } from './ProvinciaService'; 
import { MunicipioService } from './MunicipioService'; 
import { Persona } from './Persona'; 


@Component({
  selector: 'DatosPersona',
  templateUrl: './templates/DatosPersona.html'
})
export class DatosPersonaComponent {
      model:Login = new Login();
    Provincias:KeyValue[] = [];
    objProvinciaService:ProvinciaService = new ProvinciaService();
    Municipios:KeyValue[] = [];
    objMunicipioService:MunicipioService = new MunicipioService();
    objPersona:Persona = new Persona();

  
  ngOnInit() { 
this.Provincias = this.objProvinciaService.Get();
this.Municipios = this.objMunicipioService.Get();
} 
cambio_Provincia() { 
this.Municipios = this.objMunicipioService.GetByProvincia(this.objPersona.Provincia);
} 

}
