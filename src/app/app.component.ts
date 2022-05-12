import { Component } from '@angular/core';
import { Usuario } from './clases/usuario';
import { FireServiceService } from './servicios/fire-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isLogged:boolean=false;
  userLog:any={
    email:''
  };
  constructor(private servicioLogin:FireServiceService, ){
    this.servicioLogin.getUserLogged().subscribe(res=>{
      if(res!=null){
         this.isLogged=true
         this.userLog.email=res.email
      }else{
       this.isLogged=false
      }
    })
  }

  title = 'ProyectoLab';

}
