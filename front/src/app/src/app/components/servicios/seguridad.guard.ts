import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuard implements CanActivate{
  constructor(private seguridad:SeguridadService,
              private router:Router){}
  canActivate():boolean {
    if( this.seguridad.autenticar()){
    this.router.navigateByUrl('/login');
    return false;
  }else{
    return true;
  }
  }
  
  
}
