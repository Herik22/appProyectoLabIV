import { Component, OnInit } from '@angular/core';
import {Aleatorio_} from '../../../utils/ahorcadoUtils'

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  imgAhorcado:string;
  numberImg:number;
  letras:Array<string>;
  palabrasJuego:Array<string>;
  palabraSecreta:string;
  constructor() {
    this.numberImg=0;
    this.imgAhorcado=`../../../../assets/Juegos/ahorcado/ahorcado${this.numberImg}.png`
    this.palabrasJuego=['jugar','conducir','musica','celular','puerto']
    this.palabraSecreta=this.palabrasJuego[Aleatorio_(0,4)]
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
  }

}
