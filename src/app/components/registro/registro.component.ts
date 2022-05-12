import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireServiceService } from 'src/app/servicios/fire-service.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  email:string;
  password:string;
  msjErrorFire:boolean|string;

  forma:FormGroup;


  constructor(private servicioLogin:FireServiceService,private ruteo:Router,private fb:FormBuilder) { 
    this.email='';
    this.password='';
    this.msjErrorFire=false;
    this.forma = this.fb.group({
      'email':['',[Validators.required,Validators.email,this.spaceValidator]],
      'password':['',Validators.required]
    })
    
  }

  ngOnInit(): void {
   
  }

  private spaceValidator (control:AbstractControl):object|null{
    const nombre= <String>control.value;
    const spaces = nombre.includes(' ')

    return spaces?{containSpaces:true}:null

  }



  registrarUsuario(){
    
    this.servicioLogin.register(this.forma.value.email,this.forma.value.password)
    .then(res=>{
      console.log(res)
      this.ruteo.navigate(['home'])
    })
    .catch(err=>{
      console.log(err.code)
      switch(err.code)
        {
          case 'auth/email-already-in-use':
            this.msjErrorFire= 'Email ya registrado.';
            break;
          case 'auth/invalid-email':
            this.msjErrorFire= 'Email invalido.';
            break;       
          case 'auth/operation-not-allowed':
            this.msjErrorFire= 'Operacion no valido xd';
            break;      
          case 'auth/weak-password ':
            this.msjErrorFire='La contrasenia debe tener al menos 6 caracteres'  
            break;    
          case 'auth/internal-error':
            this.msjErrorFire='La contraseña esta vacía'
            break
            default:
              this.msjErrorFire='ha ocurrido un error, intente despues.'
              break;

        }
    })
     
  }

 


}
