import { Component, OnInit } from '@angular/core';
import { ErrorFactory } from '@firebase/util';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { FireServiceService } from 'src/app/servicios/fire-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  listadoUsuarios: Usuario[] ;
  newUsuario:Usuario;
  msjErrorFire:boolean|string;
  email:string;
  password:string;

  constructor(private servicioLogin:FireServiceService,private ruteo:Router) { 
    //console.info("usuario",this.prueba.usuario);
    this.listadoUsuarios=[
      {dni:95889316,apellido:'Uribe',nombre:'Herik',email:'hh@gmail.com',password:"123"},
      {dni:92993343,apellido:'Sanchez',nombre:'Herik',email:'hh@gmail.com',password:"123"},
      {dni:43554646,apellido:'Osorio',nombre:'Herik',email:'hh@gmail.com',password:"123"},
      {dni:34656065,apellido:'Ramos',nombre:'Herik',email:'hh@gmail.com',password:"123"},
    ]
    
    this.msjErrorFire=false;
    this.email = '';
    this.password='';
    this.newUsuario = new Usuario('ramos',"juan",9383834,'mail@mail.com',"321")
  }

  ngOnInit(): void {
  }
  createLogUser(){
    this.servicioLogin.generateLog({
      email:this.email,
      date:new Date()
    })
    .then(res=>{
      console.log('res LOGS USERS')
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  logearUsuario(){
    this.servicioLogin.login(this.email,this.password)
    .then(res =>{
      this.ruteo.navigate(['home'])
      this.createLogUser()
    })
    .catch(err =>{
      switch(err.code)
      {
        case 'auth/invalid-email':
         this.msjErrorFire= 'Email invalido.';
          break;     
        case 'auth/user-disabled':
          this.msjErrorFire= 'Usuario deshabilitado.';
          break;
        case 'auth/user-not-found':
          this.msjErrorFire= 'Usuario no encontrado.';
          break;       
        case 'auth/wrong-password':
          this.msjErrorFire= 'Contrasenia incorrecta.';
          break;  
        case 'auth/user-not-found':
          this.msjErrorFire='Usuario no encontrado.';
          break;
      }
    })
    
  }
  logInvitado(numero:number){
    if(numero==1){
      this.email='herik@herik.com'
      this.password='123456'
    }else{
      this.email='m@m.com'
      this.password='123456'
    }
  }
  registrarUsuario(){
    this.servicioLogin.register(this.email,this.password)
    .then(res =>{
      console.log('en el res LOGIN.COMPONENT')
      console.log(res)
      alert('registrado')
      this.ruteo.navigate(['home'])
    })
    .catch(err =>{
      console.log('en el error LOGIN.COMPONENT')
      console.log(err.code)
    })
  }
  verngModel(ngModal:any){
    console.log(ngModal)
  }


}
