import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
