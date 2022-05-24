import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JuegosRoutingModule } from './juegos-routing.module';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { BusquedaTesoroComponent } from './busqueda-tesoro/busqueda-tesoro.component';


@NgModule({
  declarations: [
    MayorMenorComponent,
    PreguntadosComponent,
    AhorcadoComponent,
    BusquedaTesoroComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HttpClientModule
  ]
})
export class JuegosModule { }
