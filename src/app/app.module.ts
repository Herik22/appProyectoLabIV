import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { TatetiComponent } from './components/tateti/tateti.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    RegistroComponent,
    ErrorComponent,
    BienvenidaComponent,
    JuegosComponent,
    TatetiComponent,
    PreguntadosComponent,
    TopNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
