import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GestProyectosComponent } from '../popUps/gest-proyectos/gest-proyectos.component';
import { FormGroup } from '@angular/forms';
import { GlobalesService } from '../../servicios/globales.service';
import { SeguridadService } from '../../servicios/seguridad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  estadisticas:any = {};
  usuario:string;
  formProy:FormGroup;
  mensaje:string;
  constructor(private _globalService:GlobalesService,
              private _seguridad:SeguridadService) {
          this.usuario = this._seguridad.usuario;
               }

  ngOnInit(): void {
    this.getStatistics();
  }

  recibir($event){
    this.mensaje = $event
    console.log('Observar', this.mensaje)
  }
  
  getStatistics(){
    let statics
    this._globalService.getStatistics().subscribe(respuesta=>{
      console.log('ESTADISTICAS',respuesta);
      statics = respuesta;
    },(err)=>{},()=>{
      this.estadisticas = statics;
    })
  }

 
}
