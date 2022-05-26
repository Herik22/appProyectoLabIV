import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { DataPregunta } from 'src/app/utils/preguntadosUtils';
import { FireServiceService } from 'src/app/servicios/fire-service.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  listaPaises:any=[]
  juegoIniciado:boolean=false
  paisActual:any;
  opcionesPreguntaActual:any
  contadorPregunta:number=0
  juegoFinalizado:boolean=false
  cantAciertos:number=0
  userLog:any={
    email:'',
    id:0
  };
  nameCollectionStatistics:string='estadisticasPreguntados'

  constructor(private apiCountrys:ApiService,private servicioFB:FireServiceService ) { 
    this.servicioFB.getUserLogged().subscribe(res=>{
      if(res!=null){
        console.log(res)
         this.userLog.email=res.email
         this.userLog.id=res.uid
      }
    })
    this.apiCountrys.obtenerPaises().subscribe(data=>{
      this.listaPaises = data
      this.paisActual=this.listaPaises[this.contadorPregunta]

      DataPregunta.forEach(element => {

        if(element.idPregunta==this.paisActual.cca3){
          this.opcionesPreguntaActual=element
        }
      });

    })
  }

  ngOnInit(): void {
  }
  
  siguienteRonda(){
    if(this.contadorPregunta<=4){
      //avanzo imagen pregunta 
      this.contadorPregunta++
      this.paisActual=this.listaPaises[this.contadorPregunta]
      //avanzar a las opciones de la pregunta 
      this.opcionesPreguntaActual = this.obtenerOpciones(this.paisActual.cca3)
    }else{
      this.juegoFinalizado=true
      //let rta = confirm('¿Desea volver a jugar?')
      //  !rta?this.acabarJuego():this.reiniciarJuego()

    }

    //col,pe,chl,bra,bol
    //0 max 4

  }

  obtenerOpciones(id:string){
    let rta:any = false
    DataPregunta.forEach(element => {

      if(element.idPregunta==id){
        rta=element
      }
    });

    return rta
  }
  iniciarJuego(){
    this.juegoIniciado=true
  }
  acabarJuego(){
    this.juegoIniciado=false
  }
  reiniciarJuego(){
    this.cantAciertos=0
    this.contadorPregunta=0
    this.paisActual=this.listaPaises[0]
    this.opcionesPreguntaActual = this.obtenerOpciones(this.paisActual.cca3)
  }
  seleccionarPregunta(pregunta:any){
    console.log(pregunta)
    console.log(this.opcionesPreguntaActual.idRta)
    if(pregunta.id == this.opcionesPreguntaActual.idRta){
      alert('Bien!')
      this.cantAciertos+=1
      setTimeout(() => {
        this.siguienteRonda()
      }, 500);
    }else{
      alert('Ups!')
      setTimeout(() => {
        this.siguienteRonda()
      }, 500);
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
      aciertos:this.cantAciertos,
      cantPreguntas:5
    }
    console.log(result)
    this.servicioFB.addDataCollection(this.nameCollectionStatistics,result)
    this.juegoFinalizado=false
    this.reiniciarJuego()
  }
}
