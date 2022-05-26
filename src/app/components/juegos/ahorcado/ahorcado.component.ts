import { Component, OnInit } from '@angular/core';
import { FireServiceService } from 'src/app/servicios/fire-service.service';
import {Aleatorio_} from '../../../utils/ahorcadoUtils'

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  
  numeroFoto:number=0;
  imgAhorcado:string=`../../../../assets/Juegos/ahorcado/ahorcado${this.numeroFoto}.png`
  letras:Array<string>;
  palabras:Array<string>;
  palabraSecreta:string;
  gano:boolean=true
  
   intentosRestantes : number = 6; 
   cantidadLetrasPalabra : string[] = [];
   estaJugando : boolean = false;
   mensajeJugador : string='';
   puntaje : number=0; 
   usuarioLog : any={
     email:'',
     id:0
   }
   userLog:any={
    email:'',
    id:0
  };
  nameCollectionStatistics:string='estadisticasAhorcado'
  constructor(private servicioFB:FireServiceService) {
    this.servicioFB.getUserLogged().subscribe(res=>{
      if(res!=null){
        console.log(res)
         this.userLog.email=res.email
         this.userLog.id=res.uid
      }
    })
    this.imgAhorcado
    this.palabras=['jugar','conducir','musica','celular','puerto']
    this.palabraSecreta=this.palabras[Aleatorio_(0,4)]
    this.letras=[
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
    ]
   }
  ngOnInit(): void {
    this.comenzarJuego()
  }

  comenzarJuego(){
    this.puntaje=0;
    this.intentosRestantes = 6;
    this.numeroFoto = 0;
    this.cantidadLetrasPalabra = Array(this.palabraSecreta.length).fill('_');
    this.estaJugando = true;
  }
  reiniciarJuego(){
    location.reload();
  }

  acabarJuego(){
    this.estaJugando = false;
    this.puntaje=0;
    setTimeout(() =>{
      this.mensajeJugador='El juego ha terminado.';
      //this.reiniciarJuego();
    }, 1000);

  }
  statusJuego(){
    
    for (const i of this.cantidadLetrasPalabra) {
      if(i == "_"){
        this.gano=false;
        // this.msjLog='perdio';
        // this.comenzar=false;
      }
    }
    if(this.gano)
    { 
      setTimeout(() =>{
        this.mensajeJugador='Ganaste!😎'
        this.estaJugando=false
      }, 1000);
    }

  }
  letraElegida(letraApretada : string){
    if(this.estaJugando)
    {
      let flag : boolean = false;
      for(let i = 0; i < this.palabraSecreta.length; i++){
        if(letraApretada.toLowerCase() == this.palabraSecreta[i]){
          this.cantidadLetrasPalabra[i] = letraApretada;
          this.puntaje++;
          flag = true;
        }
      }
  
      if(!flag){
        this.intentosRestantes--;
        if(this.intentosRestantes == 0){
         // this.numeroFoto+=1;
          this.acabarJuego();
        }else{
          this.numeroFoto+=1;
          this.mensajeJugador='ups!💀'
        }
      }else{
        this.mensajeJugador='Nice!😎'
      }
      this.imgAhorcado=`../../../../assets/Juegos/ahorcado/ahorcado${this.numeroFoto}.png`
      setTimeout(()=>{
        this.statusJuego();
      },1000)
      

    }
  }
  generarResultados(){
    //usuario, fecha, puntaje, etc..
    let fecha = new Date();
    let hoy = fecha.toLocaleDateString();
    let result = {
      user:this.userLog,
      fechaCorta:hoy,
      fecha:fecha,
      intentosRestantes:this.intentosRestantes,
      cantIntentos:6,
      gano:this.gano
    }
    console.log(result)
    this.servicioFB.addDataCollection(this.nameCollectionStatistics,result)
    setTimeout(() => {
      this.reiniciarJuego()
    }, 1500);
    //
  }
}
