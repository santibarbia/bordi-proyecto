import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalesService } from '../../../servicios/globales.service';


@Component({
  selector: 'app-gest-usuarios',
  templateUrl: './gest-usuarios.component.html',
  styleUrls: ['./gest-usuarios.component.css']
})
export class GestUsuariosComponent implements OnInit {
  @Input() gestUsuario:FormGroup;
  @Output()mensajeEvent = new EventEmitter<string>()
  mensaje:string;
   

  constructor( private fb:FormBuilder,
               private _globalService:GlobalesService) { }

  ngOnInit(): void {
    this.crearFormulario();
    
  }

  

  crearFormulario(){
    this.gestUsuario = this.fb.group({
        realm:[,Validators.required],
        address: [,Validators.required],
        dni_cuil:[,Validators.required],
        username:[,Validators.required],
        email: [],
        emailVerified: [false],
        typeRole: [,Validators.required]
    })
  }
  crear(form){
    this._globalService.gestUsuarios(form.value).subscribe(respuesta =>{
      console.log('respuesta', respuesta);
      this.mensaje = "El usuario se creo con exito";
      this.mensajeEvent.emit(this.mensaje)
    },(err)=>{
      this.mensaje = "El usuario no se creo, hubo un error";
      this.mensajeEvent.emit(this.mensaje)
    },()=>{
      ($('#gestUsuario') as any).modal('hide');
    })
    console.log('crear usuario',form.value);
  }
}
