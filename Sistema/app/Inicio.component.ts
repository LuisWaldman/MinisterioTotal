import { Component } from '@angular/core'; 
import { Factura } from './Factura'; 


@Component({
  selector: 'Inicio',
  templateUrl: './templates/Inicio.html'
})
export class InicioComponent {
      model:Factura = new Factura();

  
  
}
