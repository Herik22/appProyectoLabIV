import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  
  constructor(private afauth:AngularFireAuth,private fireStore:AngularFirestore) { }

  async login(email:string,password:string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email,password)
    }catch (error) {
  
      throw error
    }
  }
  async register(email:string,password:string){
    try {
      return await this.afauth.createUserWithEmailAndPassword(email,password)
    } catch (error) {
      console.log('ERROR REGISTER-SERVICE'+error)
      throw error
    }
  }
  
  getUserLogged(){
    return this.afauth.authState
  }
  getCurrentUser()
  {
    return this.afauth.authState;
  }

  logOut(){
    this.afauth.signOut()
  }
  generateLog(user:any){
    return this.fireStore.collection('logsUsers').add(user);
  }

  addDataCollection(nameColection:string,data:any){
    let collection = this.fireStore.collection<any>(nameColection)
    collection.add(data)
  }
  
  TraerMsjCollection(nameColectionChat:string){
    let collection = this.fireStore.collection<any>(nameColectionChat, ref => ref.orderBy('fecha', 'asc').limit(25))
    return collection.valueChanges()
  }
  
}
