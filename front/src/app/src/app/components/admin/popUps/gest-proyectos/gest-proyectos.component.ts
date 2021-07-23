import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Combo } from '../../../clases/combo';
import { GlobalesService } from '../../../servicios/globales.service';


@Component({
  selector: 'app-gest-proyectos',
  templateUrl: './gest-proyectos.component.html',
  styleUrls: ['./gest-proyectos.component.css']
})
export class GestProyectosComponent implements OnInit {
  @Output()mensajeEvent = new EventEmitter<string>()
  mensaje:string;
  formProy:FormGroup;
  vendedores:string[] =[];
  combos:Combo[] = [];
  combosOpc:Combo[] = [];
  colaboradores:any;
  constructor(private fb:FormBuilder,
              private globalService:GlobalesService) { }

  ngOnInit(): void {
    this.globalService.obtenerColaboradores().subscribe(respuesta =>{
      this.colaboradores = respuesta;
    })
    this.globalService.obtenerCombosHab().subscribe((respuesta:Combo[]) =>{
      this.combosOpc = respuesta;
    })
    this.crearFormulario();
    console.log(this.formProy)
  }

  crearFormulario(){
    this.formProy =  this.fb.group({
      nombreIns:[,[Validators.required]],
      domicilioIns:[,[Validators.required]],
      correoIns:[,[Validators.required]],
      telefonoIns:[,[Validators.required]],
      nombreRef:[,[Validators.required]],
      domicilioRef:[,[Validators.required]],
      correoRef:[,[Validators.required]],
      telefonoRef:[,[Validators.required]],
      dniRef:[,[Validators.required]],
      nombreVend:[[],[Validators.required]],
      tipoConvocatoria:[,[Validators.required]],
      objetivoConv:[,[Validators.required]],
      importe:[,[Validators.required]],
      fechaLimite:[,[Validators.required]],
      lugarEntrega:[,[Validators.required]],
      colaborador:[{},[Validators.required]],
      combosHab:[[],[Validators.required]],
      fechaHoraCierre:[,[Validators.required]]
    });
  }
  agregar(item, lista){
    console.log('Item',item);
    if(lista === 'vendedores'){
      this.vendedores.push(item);

    }else{
      for (let combo of this.combosOpc) {
        if (item == combo.id){
          this.combos.push(combo);
        }
      }
      
    };
  }
  borrar(indice,lista){
    console.log('indice', indice);
    if(lista == 'vendedores'){
      for (let i = 0; i < this.vendedores.length; i++) {
        this.vendedores.splice(indice,1); 
        this.formProy.controls['nombreVend'].reset();
      }
    }else{
      for (let i = 0; i < this.combos.length; i++) {
        this.combos.splice(indice,1);
        this.formProy.controls['combosHab'].reset();  
      }
    };
  }
  cancelar(form){
    form.reset()
  }
  guardar(form:FormGroup){
  if(form.valid && form.status == 'VALID'){
  for(let colaborador of this.colaboradores){
      console.log('html', form.get('colaborador'))
      console.log('',colaborador)
    if(form.controls['colaborador'].value == colaborador.id){
      
      form.controls['colaborador'].setValue(colaborador);
    }
  }
    form.controls['combosHab'].setValue(this.combos)
    form.controls['nombreVend'].setValue(this.vendedores)
    console.log('Formulario de creacion', form.value);
    this.vendedores = [];
    this.combos = [];
    this.globalService.gestionProyecto(form.value).subscribe(respuesta=>{
      console.log(respuesta)
      },(err)=>{
        this.mensaje = "No se pudo crear el proyecto, verifique sus datos";
        this.mensajeEvent.emit(this.mensaje)
      },()=>{
        this.mensaje = "El proyecto se creo con exito";
        this.mensajeEvent.emit(this.mensaje)
      })
    }else{
      this.mensaje = "No se pudo crear el proyecto, verifique sus datos";
      this.mensajeEvent.emit(this.mensaje)
    }
  }
}
