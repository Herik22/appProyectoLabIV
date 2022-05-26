import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FireServiceService } from 'src/app/servicios/fire-service.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  forma:FormGroup;
  userLog:any={
    email:'',
    id:0
  };
  constructor(private fb:FormBuilder,private servicioFB:FireServiceService,private ruteo:Router) {
    this.servicioFB.getUserLogged().subscribe(res=>{
      if(res!=null){
        console.log(res)
         this.userLog.email=res.email
         this.userLog.id=res.uid
      }
    })
    this.forma = this.fb.group({
      'nombre':['',[Validators.required]],
      'apellido':['',[Validators.required]],
      'edad':['',[Validators.required, Validators.min(18), Validators.max(99)]],
      'telefono':['',[Validators.required, Validators.min(1000000000),Validators.max(9999999999),Validators.pattern("^[0-9]*$")]],
      'pais':['',[Validators.required]] ,
      'news':['',[Validators.requiredTrue]] 
    });
    
   }

  ngOnInit(): void {
  }

  guardarEncuesta(){
    let {apellido,edad,news,nombre,pais,telefono} = this.forma.value
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let body={
      apellido: apellido,
      edad: edad,
      news: news,
      nombre: nombre,
      pais: pais,
      telefono: telefono,
      idUser:this.userLog.id,
      fechaCorta:hoy,
      fecha:fecha,
    }
    this.servicioFB.addDataCollection('encuestas',body)
    alert('Gracias por contestar!')
    this.ruteo.navigate(['home'])
    //console.log(body)
  }

}
