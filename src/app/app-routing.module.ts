import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { LoginComponent } from './components/login/login.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TatetiComponent } from './components/tateti/tateti.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'home', component:HomeComponent},
  {path:'juegos', component:JuegosComponent,
  children:[
    {path:'tateti', component:TatetiComponent},
    {path:'preguntados', component:PreguntadosComponent},
  ]},




  {path:"",redirectTo:'/home',pathMatch:'full'},
  {path:'**',component:ErrorComponent },
  
]//rutas

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { } 
