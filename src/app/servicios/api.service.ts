import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  
  url:string = 'https://restcountries.com/v3.1/alpha?codes=col,pe,chl,bra,bol' //'https://restcountries.com/v2/alpha?codes=arg,af,ge,aus'
  constructor(private http:HttpClient) {

   }
  
   obtenerPaises=()=>{
     return this.http.get(this.url)
   }
}
