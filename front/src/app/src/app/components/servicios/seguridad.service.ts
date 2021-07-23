import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LOGIN, LOGOUT } from './globales.constantes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SeguridadService {
  loggedIn:boolean = null;
  userToken:string = '';
  userId:number;
  usuario:string;
  proyectId:number;
  rol:string = '';
  constructor(private http:HttpClient) {
    
  }

  login(usr,pass){
      let body = {
        username:usr,
        password:pass
      }
      this.loggedIn = true;

      return this.http.post<any>(LOGIN,body).pipe(
        map((respuesta:any)=>{
        
          this.userToken = respuesta.id;
          this.userId = respuesta.userId;
          this.proyectId = respuesta.projectId;
          this.usuario = respuesta.currentUser.username
          this.rol = respuesta.currentUser.typeRole;
          return respuesta;
        })
      );
  }  
   
  logout(){
    const tokenToSend = localStorage.getItem('token');
    const headers = {
      Authorization: tokenToSend
    };
    const response = this.http.post(`${LOGOUT}`,null,{headers});
    if (response) {
      this.loggedIn = null;
      this.userToken = ''
      this.borrarStorange('token');
      this.borrarStorange('id');
      this.borrarStorange('obj');
    }
    return response;
  }
  autenticar(){
    if(this.userToken.length < 2){
      this.loggedIn = null
      return true;
    }else{
    const objeto =JSON.parse(localStorage.getItem('obj'));
    let dateCreacion = new Date(objeto.created);
    let dateCaducidad = dateCreacion.getTime() + 3600000;
    
    if (dateCaducidad < new Date().getTime()){
      this.logout();
      this.loggedIn = null;
      return true;
    }else{
      return false;
    }
  }
    
    
    
  }

  guardarStorange(key,valor){
    localStorage.setItem(key,valor)
  }

  borrarStorange(key){
    localStorage.removeItem(key)
  }
}
