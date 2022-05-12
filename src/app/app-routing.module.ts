import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'quienSoy', component:QuienSoyComponent},
  {path:'chat', component:ChatComponent},
  {path: 'juegos',loadChildren:()=> import('./components/juegos/juegos.module').then(m=>m.JuegosModule)},
  {path:"",redirectTo:'/login',pathMatch:'full'}, //si la ruta no existe redirige al Login
  {path:'**',component:ErrorComponent }, //pantalla si sucede un erro.
  
]//rutas

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { } 
