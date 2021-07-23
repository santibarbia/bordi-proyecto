import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector:Injector ) {
    console.log("El interceptor se ejecuto")
   }
  intercept(req,next){
    let seguridadService = this.injector.get(SeguridadService);
    let tokenReq = req.clone({
      setHeaders:{
        Authorization: `${seguridadService.userToken}`
      }
    })
    return next.handle(tokenReq)
  }
  
}
