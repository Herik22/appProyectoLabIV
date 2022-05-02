import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceService } from 'src/app/servicios/fire-service.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  isLogged:boolean=false;
  emailUser:string|null='';
  
  constructor(private servicioLogin:FireServiceService,private ruteo:Router) { 
   this.servicioLogin.getUserLogged().subscribe(res=>{
     if(res!=null){
        this.isLogged=true
        this.emailUser=res.email
     }else{
      this.isLogged=false
      this.emailUser=''
     }
   })
  }

handleisLog(value:boolean){
  this.isLogged=value
}

  goLogin(){
    this.ruteo.navigate(['login'])
  }
  ngOnInit(): void {
  }

}
