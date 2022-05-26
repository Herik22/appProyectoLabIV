import { Component, OnInit } from '@angular/core';
import { FireServiceService } from 'src/app/servicios/fire-service.service';


@Component({
  selector: 'app-busqueda-tesoro',
  templateUrl: './busqueda-tesoro.component.html',
  styleUrls: ['./busqueda-tesoro.component.scss']
})
export class BusquedaTesoroComponent implements OnInit {
// click handler
map:any = document.querySelector('#map');
distance:any = document.querySelector('#distance');
clicks:any = 0;
msjTesoro:string='¡Empieza a Buscar!'
WIDTH:number = 500;
HEIGH:number = 500; 
target:any = {
    x: this.getRandomNumber(this.WIDTH),
    y: this.getRandomNumber(this.HEIGH)
  };
juegoFinalizado:boolean=false
userLog:any={
  email:'',
  id:0
};
nameCollectionStatistics:string='estadisticasBusquedaTesoro'

  constructor(private servicioFB:FireServiceService) { 
    this.servicioFB.getUserLogged().subscribe(res=>{
      if(res!=null){
        console.log(res)
         this.userLog.email=res.email
         this.userLog.id=res.uid
      }
    })
  }

  ngOnInit(): void {
  /* 
   document.querySelector('#map')?.addEventListener('click',(e:any)=>{
      console.log('click');
      this.clicks++;
      let distance = this.getDistance(e, this.target); 
      console.log('distance');
      console.log(distance);
      let distanceHint = this.getDistanceHint(distance);
      console.log('distanceHint');
      console.log(distanceHint);

      //this.distance.innerHTML = `<h1>${distanceHint}</h1>`;
      this.msjTesoro=distanceHint

      if (distance < 20 ) {
        alert(`Found the treasure in ${this.clicks} clicks!`);
        location.reload();
      }
    
    });
    */ 
  }



clickImg(event:any){
  console.log('click');
  this.clicks++;
  let distance = this.getDistance(event, this.target); 
  console.log('distance');
  console.log(distance);
  let distanceHint = this.getDistanceHint(distance);
  console.log('distanceHint');
  console.log(distanceHint);

  //this.distance.innerHTML = `<h1>${distanceHint}</h1>`;
  this.msjTesoro=distanceHint

  if (distance < 20 ) {
    
    //alert(`Found the treasure in ${this.clicks} clicks!`);
    this.juegoFinalizado=true
    
  }
} 

reiniciarJuego(){
  location.reload();
}
// generate a random Number
getRandomNumber(size:number){
  return Math.floor(Math.random() * size);
}
// get the Distance of two points
getDistance(e:any, target:any){
  let diffX = e.offsetX - target.x; // obtengo la posicion del clik en el eje X y se lo resto al ancho del x para obtener una diferencia 
  let diffY = e.offsetY - target.y;
  return Math.sqrt((diffX * diffX) + (diffY * diffY));
}

// return an String depending on the distances 
  getDistanceHint(distance:number){ 
  if (distance < 30) {
    return "estas a un paso!";
  } else if (distance < 40) {
    return "Realmente cerca";
  } else if (distance < 60) {
    return "cerca!";
  } else if (distance < 100) {
    return "te estas acercando";
  } else if (distance < 180) {
    return "Frío ...";
  } else if (distance < 360) {
    return "bastante frío";
  }  else if (distance < 360) {
    return "Nada que buscar por ahí ...";
  } else {
    return "Ni ahí,estas perdido amigo !";
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
    clicks:this.clicks,
  }
  console.log(result)
  this.servicioFB.addDataCollection(this.nameCollectionStatistics,result)
  this.juegoFinalizado=false
  setTimeout(() => {
    this.reiniciarJuego()
  }, 1500);
  //
}
}

