import { Component, OnInit } from '@angular/core';
import { GlobalesService } from '../servicios/globales.service';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],

})
export class ContactoComponent implements OnInit {
contacto:FormGroup = new FormGroup({
  'nombre': new FormControl(),
  'email': new FormControl(),
  'telefono': new FormControl(),
  'pregunta': new FormControl(),
});;
error:boolean = false;
flag:boolean;
mensaje:string;
  constructor( private _globalService: GlobalesService,
                private fb :FormBuilder) {

        
   }

  ngOnInit(): void {

    this.contacto = this.fb.group({
              nombre:['',Validators.required],
              email:['',[Validators.required,Validators.email]],
              telefono:[''],
              pregunta:['',Validators.required],
              institucion:['',Validators.required]
    })

  }
  setValor(){
    
    this.flag = false
  }

  enviarContacto(form){
    console.log(form)
    if(form.invalid){
      console.log('El formulario es invalido')
      this.flag = true;
      setTimeout(()=>{
        this.flag = false;
      }, 3000) 
      return this.mensaje = 'Mensaje no enviado, verifique sus datos';
     
    }
    else{
    this._globalService.enviarMail(form).subscribe(respuesta =>{
      console.log('respuesta',respuesta)
      this.error = true;
      setTimeout(()=>{
        this.error = false;
      }, 3000) 
      this.mensaje = 'Mensaje enviado correctamente, verifique su email';
      
    },
    (err)=>{console.log(err)
      this.error = true;
      setTimeout(()=>{
        this.error = false;
      }, 3000)},()=>{
        form.reset();
      })
    }
  }

}
