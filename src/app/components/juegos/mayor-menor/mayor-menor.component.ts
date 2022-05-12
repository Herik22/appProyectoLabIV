import { Component, OnInit } from '@angular/core';
import { ApiCartsService } from 'src/app/servicios/api-carts.service';
@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent implements OnInit {
   // el juegador contara con una cantidad de intentos, en cada intento podra apostar por si la siguiente carta será mayor o menor
  // al seleccionar se mostrará la carta y se restará una oportunidad, (agregar que sucede si gana o pierde)
  // tendra un btn para empezar de nuevo.

  cantIntentos:number;
  intentosActuales:number;
  cartas:any[];
  idMazo:any=0;
  cartaActual:any={
    carta:[],
    index:0
  };
  mensajeAlert:string=''

  constructor(private apiCarts:ApiCartsService) {
    this.iniciarJuego()
    this.cantIntentos=3;
    this.intentosActuales=0;
    this.cartas=[]
    
   }
 
  reiniciarJuego(){
    this.cantIntentos=3;
    this.intentosActuales=0;
    this.cartaActual.index=0
    this.cartaActual.carta=this.cartas[0] //new array cartas
    this.mensajeAlert='Juego reiniciado !'
    this.cartaActual.carta = this.cartas[Math.round(Math.random()*15)
    ]
  }
  
  iniciarJuego(){
    
    // obtener un id
    this.apiCarts.obtenerIdMazo() 
    .subscribe(response =>{
      let rta :any = response
      this.idMazo=rta.deck_id
      this.setCartas(this.idMazo,15)
      
    })
    //obtener una baraja
  }
  setCartas(id:string,numero:number){
    this.apiCarts.obtenerCarts(id,numero)
    .subscribe(response=>{
      let rta :any = response
      console.log('CARTAS')
      console.log(rta)
      this.cartas=rta.cards
      this.cartaActual.carta=rta.cards[0]
      this.cartaActual.index=0
    })
  }
  avanzarRonda(){
    let index = this.cartaActual.index
    this.intentosActuales+=1
    this.cartaActual.carta = this.cartas[index+1]
    this.cartaActual.index=index+1
  }
  evaluarDecision(decision:number){
    let rta = true;
    if(this.intentosActuales <= this.cantIntentos){
      //0 menor   4.  7
      if(decision==0){ //eligio que la siguiente es menor        
        if(this.cartas[this.cartaActual.index+1].value < this.cartaActual.carta.value ){
          this.mensajeAlert=('GANÓ esta ronda')
        }else{
          this.mensajeAlert=('PERDIO esta ronda')
        }
        //1 mayor 
      }else if(decision==1){
        if(this.cartas[this.cartaActual.index+1].value>this.cartaActual.carta.value  ){         
          this.mensajeAlert=('GANÓ esta ronda')
        }else{
          this.mensajeAlert=('PERDIO esta ronda')     
        }
      }else if(this.intentosActuales == this.cantIntentos) {
        this.mensajeAlert=('Tiene otra oportunidad')
      }
    }else{
      this.mensajeAlert=('no tiene mas intentos')
      rta=false
    }
   return rta
    
  }

  cambiarCarta(){
    let index = this.cartaActual.index
    this.cartaActual.carta = this.cartas[index+1]
    this.cartaActual.index+=1
  }
  apostar(number:number){
    if(this.evaluarDecision(number))
    {
      this.avanzarRonda()
    }    
  }

  ngOnInit(): void {
  }

}
