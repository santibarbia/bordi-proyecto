import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  mensaje:string;
  constructor() { }

  ngOnInit(): void {
  }
  recibir($event){
    this.mensaje = $event
    console.log('Observar', this.mensaje)
  }

}
