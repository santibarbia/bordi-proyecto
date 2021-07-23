import { Component, OnInit, Input } from '@angular/core';
import { SeguridadService } from '../servicios/seguridad.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from '../enum/rol.enum';
import * as modal from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  token:string = '';
  registroForm:FormGroup;
  error:boolean = false;
  userId:number;
  obj:any;
  usuario;
  rol;
  proyecto;
  vendedores:any;
  vendedor:any;

  bandera:boolean = true;
  constructor( private seguridad:SeguridadService,
               private fb:FormBuilder,
               private router:Router ) {
                 this.crearFormulario()
                }

  ngOnInit(): void {
    
  }

  get usuarioNoValido(){
    return this.registroForm.get('usuario').invalid && this.registroForm.get('usuario').touched;
  }

  get contrasenaNoValido(){
    return this.registroForm.get('password').invalid && this.registroForm.get('password').touched;
  }

  crearFormulario(){
    this.registroForm = this.fb.group({
      usuario:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  selogeo(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }
  seleccionar(){
    this.bandera = true;
    console.log('vendedor', this.vendedor);
    this.seguridad.guardarStorange('idV',this.vendedor);
    this.router.navigateByUrl('proyecto')
  }

  login(){
    if(this.registroForm.invalid){
      this.error = true
      setTimeout(()=>{ this.error = false}, 3000);
      return;
    }
    this.seguridad.login(this.registroForm.get('usuario').value,this.registroForm.get('password').value)
      .subscribe( (respuesta:any) => {
            this.bandera = false;
            console.log('Respuesta', respuesta);
            this.token = respuesta.id
            this.userId = respuesta.userId;
            this.rol = respuesta.currentUser.typeRole;
            this.usuario = respuesta.currentUser.user;
            this.proyecto = respuesta.projectId;
            console.log('Proyecto id', respuesta)
            this.vendedores = respuesta.sellers;
            this.obj = JSON.stringify( respuesta);
        }, (err) => {
          console.log('error',err);
          this.bandera = true;
          this.error = true
          setTimeout(()=>{ this.error = false}, 3000);
        }, () => {
          this.seguridad.guardarStorange('token',this.token);
          this.seguridad.guardarStorange('id',this.userId);
          this.seguridad.guardarStorange('obj',this.obj);
          this.seguridad.guardarStorange('Rol', this.rol);
          this.seguridad.guardarStorange('Proyecto', this.proyecto);
          if(this.rol == Rol.CLIENTE) {   
          this.router.navigateByUrl('/proyecto-lider')
          }if(this.rol == Rol.PROYECTO){
            console.log('Ingreso aca');
            ($('#modal')as any).modal({backdrop:'static',keyboard:false})
          }
          if(this.rol == Rol.ADMIN){
            this.router.navigateByUrl('/admin')
          }
          if(this.rol == Rol.COLABORADOR){
            this.router.navigateByUrl('/admin/proyectos')
          }
        }
      );
  }
}
