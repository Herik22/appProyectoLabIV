import { Component, OnInit } from '@angular/core';
import { FireServiceService } from 'src/app/servicios/fire-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  isLogged:boolean=false;
  userLog:any;
  mensaje:string='';
  mensajes:any[]=[];
  nameCollection:string = 'chatJuegos'
  constructor(private servicioLogin:FireServiceService,) {

    this.servicioLogin.TraerMsjCollection(this.nameCollection)
    .subscribe(msjs => {
      console.log(msjs)
      this.mensajes = msjs
    })
    if(this.mensajes == null){
      this.mensajes = []
    }

    this.servicioLogin.getUserLogged().subscribe(res=>{
      if(res!=null){
         this.isLogged=true

      }else{
       this.isLogged=false
      }
    })
   }

  ngOnInit(): void {
    this.servicioLogin.getCurrentUser()
    .subscribe(user=>{
      this.userLog = user


      console.info(user?.email)
    })
  }

  escribirMsj(){
    console.log('USER LOG')
    console.log(this.userLog)
    let fecha = (moment(new Date())).format('DD-MM-YYYY HH:mm:ss');
    let mensaje =  {
      usuario:{
        id: this.userLog.uid,
        // nombre: this.usuarioLogueado.nombre,
        email: this.userLog.email,
      },
      texto:this.mensaje,
      fecha: fecha
    }
    this.servicioLogin.addDataCollection(this.nameCollection,mensaje)
    this.mensaje=''
  }
}


