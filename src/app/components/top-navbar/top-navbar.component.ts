import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceService } from 'src/app/servicios/fire-service.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {

  @Input() isLogged:boolean=false;
  @Input() emailUser:string|null='';
  
  constructor(private servicioLogin:FireServiceService,private ruteo:Router) { 
   
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
