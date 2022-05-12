import { Component, OnInit } from '@angular/core';
import { FireServiceService } from 'src/app/servicios/fire-service.service';
import { Usuario } from 'src/app/clases/usuario';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 /*
 <h1 *ngIf="(paises| async) == null">cargando ... </h1>
    
    <div *ngFor="let pais of paises | async "> <!-- Renderiza tras resolverse el async-->
        <img [src]="pais.flag" alt="">
        <p> {{pais.name}} </p>
        <p>POBLACION : {{pais.population}}</p>
    </div>

*/

  paises:any=false;

  constructor(private servicioLogin:FireServiceService,private ruteo:Router,private Api:ApiService) { 


    this.paises=this.Api.obtenerPaises(); // retorna Observable  .subscribe
    

   /* ANDANDO
   this.Api.obtenerPaises() // retorna Observable  .subscribe
    .subscribe((data:any)=>{ 
      console.log(data)
      this.paises=data
    })
    */ 
    


  }

  ngOnInit(): void {}
  

  cerrarSesion(){
    this.servicioLogin.logOut()
    this.ruteo.navigate(['login'])

  }

}
