import { Component } from '@angular/core'; 
import { Login } from './Login'; 


@Component({
  selector: 'Login',
  templateUrl: './templates/Login.html'
})
export class LoginComponent {
      model:Login = new Login();

  
  
}
