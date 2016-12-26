import { Component } from '@angular/core'; 
import { KeyValue } from './KeyValue'; 
import { ProvinciaService } from './ProvinciaService'; 
import { MunicipioService } from './MunicipioService'; 
import { LocalidadService } from './LocalidadService'; 
import { Persona } from './Persona'; 


@Component({
  selector: 'AcercaDe',
  templateUrl: './templates/AcercaDe.html'
})
export class AcercaDeComponent {
      Provincias:KeyValue[] = [];
    objProvinciaService:ProvinciaService = new ProvinciaService();
    Municipios:KeyValue[] = [];
    objMunicipioService:MunicipioService = new MunicipioService();
    Localidads:KeyValue[] = [];
    objLocalidadService:LocalidadService = new LocalidadService();
    model:Persona = new Persona();

  
  ngOnInit() { 
this.Provincias = this.objProvinciaService.Get();
this.Municipios = this.objMunicipioService.Get();
this.Localidads = this.objLocalidadService.Get();
} 
cambio_Provincia() { 
this.Municipios = this.objMunicipioService.GetByProvincia(this.model.Provincia);
} 
cambio_Municipio() { 
this.Localidads = this.objLocalidadService.GetByMunicipio(this.model.Municipio);
} 

}
