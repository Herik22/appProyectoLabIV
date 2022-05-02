import { Component, OnInit } from '@angular/core';
import { FireServiceService } from 'src/app/servicios/fire-service.service';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  userLog:any={
    email:''
  };
  constructor(private servicioLogin:FireServiceService,private ruteo:Router) { 
    this.servicioLogin.getUserLogged().subscribe(res=>{
      if(res!=null){
        this.userLog.email = res.email
      }else{
        this.userLog.email=false
      }
      
    })
  }

  ngOnInit(): void {
  }
  
  cerrarSesion(){
    this.servicioLogin.logOut()
    this.ruteo.navigate(['login'])

  }

}
