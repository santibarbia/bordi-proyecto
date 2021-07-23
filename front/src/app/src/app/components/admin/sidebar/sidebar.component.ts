import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  rol:any;

  constructor( private seguridad:SeguridadService,
               private router: Router) {
    this.rol = seguridad.rol
   }

  ngOnInit(): void {
  }
  logout(){
    this.seguridad.logout().subscribe(resp=>{
      },(err)=>{},()=>{
      this.router.navigateByUrl('home')
    });
  } 
}
