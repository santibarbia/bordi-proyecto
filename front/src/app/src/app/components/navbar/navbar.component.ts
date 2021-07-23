import { Component, OnInit, Output, Input } from '@angular/core';
import { SeguridadService } from '../servicios/seguridad.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  ancho:number;
  screen:any;
  
  constructor( public seguridad:SeguridadService) { }

  ngOnInit(): void {
    this.ancho = window.screen.width
    
  }
  logout(){
    this.seguridad.logout().subscribe();
  }  
}
