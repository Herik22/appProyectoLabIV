import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
@Injectable({
  providedIn: 'root'
})
export class ApiCartsService {

  constructor(private http:HttpClient) { }

  obtenerIdMazo=()=>{
    return this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?cards=2S,3S,4S,5S,6S,7S,8S,9S,2D,3D,4D,5D,2C,3C,4C,5C,2H,3H,4H,5H,6H,7H,8H,9H')
  }
  obtenerCarts=(deck_id:string,numeroCartas:number)=>{
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${numeroCartas}`)
  }
  reOrganizarMazo(deck_id:string){
    return this.http.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
    
  }
}
