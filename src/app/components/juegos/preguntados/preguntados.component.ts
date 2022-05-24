import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { DataPregunta } from 'src/app/utils/preguntadosUtils';

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

  constructor(private apiCountrys:ApiService) { 
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
      let rta = confirm('¿Desea volver a jugar?')
      !rta?this.acabarJuego():this.reiniciarJuego()

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
    this.contadorPregunta=0
    this.paisActual=this.listaPaises[0]
    this.opcionesPreguntaActual = this.obtenerOpciones(this.paisActual.cca3)
  }
  seleccionarPregunta(pregunta:any){
    console.log(pregunta)
    console.log(this.opcionesPreguntaActual.idRta)
    if(pregunta.id == this.opcionesPreguntaActual.idRta){
      alert('acertaste!')
      setTimeout(() => {
        this.siguienteRonda()
      }, 500);
    }else{
      alert('error!')
    }
    
  }
}
