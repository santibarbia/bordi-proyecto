import { Component, OnInit } from '@angular/core';
import { GlobalesService } from '../../servicios/globales.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  admin:any;
  colaborador:any;
  mensaje:string = '';
  usuario:FormGroup;
  userMod:FormGroup = this.fb.group({
    realm:[,Validators.required],
    address: [,Validators.required],
    dni_cuil:[,Validators.required],
    username:[,Validators.required],
    email: [],
    emailVerified: [false],
    typeRole: [,Validators.required],
    id:[,Validators.required]
});

  constructor(private _globalService:GlobalesService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
    this._globalService.getUsuariosAdmin().subscribe(respuesta=>{
      this.admin = respuesta;
    })
    this._globalService.getUsuariosColaborador().subscribe(respuesta=>{
      this.colaborador = respuesta;
    })
    
  }
  crearFormulario(){
    this.usuario = this.fb.group({
      realm:[,Validators.required],
      address: [,Validators.required],
      dni_cuil:[,Validators.required],
      username:[,Validators.required],
      email: [],
      emailVerified: [false],
      typeRole: [,Validators.required]
  });
  this.userMod = this.fb.group({
    realm:[,Validators.required],
    address: [,Validators.required],
    dni_cuil:[,Validators.required],
    username:[,Validators.required],
    email: [],
    emailVerified: [false],
    typeRole: [,Validators.required],
    id:[,Validators.required]
})
  }
   modificarUsuario(form){
    
    console.log(form)
    for (let item of Object.keys(form)){
      console.log(form[item])
      if(this.userMod.controls[`${item}`] != null){
       this.userMod.controls[`${item}`].setValue((isNullOrUndefined(form[item]) ? "" : form[item]));
      }
  };
  
  }
  recibir($event){
    this.mensaje = $event;
    console.log('Observar', this.mensaje);
    this.admin = [];
    this.colaborador = []
    this._globalService.getUsuariosAdmin().subscribe(respuesta=>{
      this.admin = respuesta;
    })
    this._globalService.getUsuariosColaborador().subscribe(respuesta=>{
      this.colaborador = respuesta;
    })
  }

  confirmar(form){

    this._globalService.modificarUser(form.controls['id'].value,form.value).subscribe(respuesta=>{
      console.log('Respuesta modificar', respuesta)
    },(err)=>{
      this.mensaje = "Complete todos los campos"
      setTimeout(() => {
        this.mensaje = ''
      }, 4000);
    },()=>{
      this._globalService.getUsuariosAdmin().subscribe(respuesta=>{
        this.admin = respuesta;
      })
      this._globalService.getUsuariosColaborador().subscribe(respuesta=>{
        this.colaborador = respuesta;
      })
      this.mensaje = "El usuario se modifico con exito"
      setTimeout(() => {
        this.mensaje = ''
      }, 4000);
      
    })
      console.log('Usuario form',form)
  }

  borrarUsuario(usuario){

    this._globalService.borrarUser(usuario.id).subscribe(respuesta=>{
      console.log('Respuesta borrado', respuesta)
      this._globalService.getUsuariosAdmin().subscribe(respuesta=>{
        this.admin = respuesta;
      })
      this._globalService.getUsuariosColaborador().subscribe(respuesta=>{
        this.colaborador = respuesta;
      })
    },(err)=>{},()=>{
      this.mensaje = "El usuario ha sido borrado"
      this._globalService.getUsuariosAdmin().subscribe(respuesta=>{
        this.admin = respuesta;
      })
      this._globalService.getUsuariosColaborador().subscribe(respuesta=>{
        this.colaborador = respuesta;
      })
    })
    
  }

  


}
