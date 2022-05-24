import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { BusquedaTesoroComponent } from './busqueda-tesoro/busqueda-tesoro.component';
const routes: Routes = [
  { path:'mayorMenor',
    component:MayorMenorComponent
  },
  {
    path:'preguntados',
    component:PreguntadosComponent,
  },
  {
    path:'ahorcado',
    component:AhorcadoComponent
  },
  {
    path:'busquedaTesoro',
    component:BusquedaTesoroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
