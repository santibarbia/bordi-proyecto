import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalesService } from '../../servicios/globales.service';
import { Combo } from '../../clases/combo';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-proyectos-actuales',
  templateUrl: './proyectos-actuales.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosActualesComponent implements OnInit {
  formCombo:FormGroup = this.fb.group({
    name:[,Validators.required],
    brand:[,Validators.required],
    typeFood:[,Validators.required],
    price:[,Validators.required],
    stock:[,Validators.required],
    description:[,Validators.required],
    availability:[,Validators.required]
  });
  formComboMod:FormGroup = this.fb.group({
    name:['',Validators.required],
    brand:['',Validators.required],
    typeFood:['',Validators.required],
    price:[0,Validators.required],
    stock:[0,Validators.required],
    description:['',Validators.required],
    availability:[false,Validators.required],
    id:[,Validators.required]
  });
  formHistorias:FormGroup = this.fb.group(
    {
      name:[,Validators.required],
      title:[,Validators.required],
      description:[,Validators.required],
      text:[,Validators.required]
    }
  )
  formHistoriasMod:FormGroup = this.fb.group(
    {
      name:[,Validators.required],
      title:[,Validators.required],
      description:[,Validators.required],
      text:[,Validators.required],
      id:[,Validators.required]
    }
  )
  combos:Combo[] = [];
  historias:any = []
  mensaje:string= '';
  imagenSubir:File;
  opcionSeleccionada:any;
  verArreglo:any;
  constructor( private fb: FormBuilder,
    private _globalService:GlobalesService ) {
     }

  ngOnInit(): void {
    this._globalService.combos().subscribe((respuesta:Combo[]) =>{
      this.combos = respuesta
    });
    this._globalService.historias().subscribe((respuesta:Combo[]) =>{
      this.historias = respuesta
    });
  }
  

  modificarCombo(combo){
    console.log('Entro aca', combo)
    this.formComboMod.controls['id'].setValue(combo.id);
    for (let item of Object.keys(combo)){
      console.log(item)
      if(this.formComboMod.controls[`${item}`] != undefined){
       this.formComboMod.controls[`${item}` == null ?"":`${item}`].setValue((combo[item] == undefined ? "" : combo[item]));
      }
  };
  }

  modificarHistorias(historias){
    this.formHistoriasMod.controls['id'].setValue(historias.id);
    for (let item of Object.keys(historias)){
      if(this.formHistoriasMod.controls[`${item}`] != undefined){
       this.formHistoriasMod.controls[`${item}`].setValue(historias[item]=== null || historias[item]=== undefined ? "" : historias[item]);
        }
      };
  }
  confirmar(form){
    console.log('Form Combo', form)
    this._globalService.modificarCombos(form.value).subscribe(respuesta=>{
      console.log('Combo modificado', respuesta);
      this.combos = []
      this._globalService.combos().subscribe((respuesta:Combo[]) =>{
        this.combos = respuesta;
      })
    },(err)=>{
      return this.mensaje = 'Error al modificar el combo'
      setTimeout(
        this.mensaje = '',
        4000
      )
    },()=>{
      
      this._globalService.combos().subscribe((respuesta:Combo[]) =>{
      this.combos = respuesta
    });
    return this.mensaje = 'Se modifico el combo con exito'
      setTimeout(
        this.mensaje = '',
        4000
      )
    })
  }

  cargarImagen(file : File){
    this.imagenSubir = file
    
  }


  cargar(){
    this._globalService.cargarFoto(this.imagenSubir,this.verArreglo,this.opcionSeleccionada)
    .then((img:any)=>{console.log('Observar',img)
    if(!img){
      return this.mensaje = "Se cargo la imagen correctamente"

    }else{
      return this.mensaje = "Se cargo la imagen correctamente"
    }
    })
  }
  confirmarHistoria(form){
    this.historias = []
    this._globalService.modificarHistorias(form.value).subscribe(respuesta=>{
      console.log('historia modificado', respuesta)
      this._globalService.historias().subscribe(respuesta =>{
        this.historias = respuesta
      })
    },(err)=>{
      return this.mensaje = 'Error al modificar la historia'
      setTimeout(
        this.mensaje = '',
        4000
      )
    },()=>{ 
      this._globalService.historias().subscribe(respuesta =>{
      this.historias = respuesta
    });
      return this.mensaje = 'Se modifico la historia con exito'
      setTimeout(
        this.mensaje = '',
        4000
      )
     
      
      
    })
  }
  cargarHistorias(historia){
    this.historias = []
    this._globalService.cargarHistorias(historia.value).subscribe(respuesta=>{
      console.log('Respuesta',respuesta)
      this._globalService.historias().subscribe(respuesta =>{
        this.historias = respuesta
      })
    },(err)=>{
     return  this.mensaje = 'Error al guardar la historia'
      setTimeout(
        this.mensaje = '',
        4000
      )

    },()=>{
      return this.mensaje = 'Se guardo la historia con exito'
      setTimeout(
        this.mensaje = '',
        4000
      )
    })
  }

  cargarCombo(form){
    this.combos = []
    console.log('Combo cargado',form);
    this._globalService.cargarCombo(form.value).subscribe(respuesta=>{
      console.log('Respuesta',respuesta)
      this._globalService.combos().subscribe((respuesta:Combo[]) =>{
        this.combos = respuesta
      });
    },(err)=>{
      return this.mensaje = 'Error al guardar el combo'
      setTimeout(
        this.mensaje = '',
        4000
      )

    },()=>{
      return this.mensaje = 'Se guardo el combo con exito'
      setTimeout(
        this.mensaje = '',
        4000
      )
    })
  }

  borrarCombo(combo){
    console.log('Entro aca')
    this.combos = []
    this._globalService.borrarCombo(combo.id).subscribe(respuesta=>{
      console.log('Respuesta',respuesta);
      this._globalService.combos().subscribe((respuesta:Combo[]) =>{
        this.combos = respuesta
      });
    },(err)=>{
      return this.mensaje = 'Error al borrar el combo'
      setTimeout(
        this.mensaje = '',
        4000
      )

    },()=>{
      return this.mensaje = 'Se borro el combo'
      setTimeout(
        this.mensaje = '',
        4000
      )
    })
  }
  borrarHistorias(historia){
    this.historias = [];
    this._globalService.borrarHistorias(historia.id).subscribe(respuesta=>{
      console.log('Respuesta',respuesta);
      this._globalService.historias().subscribe(respuesta =>{
        this.historias = respuesta
      })
    },(err)=>{
      return this.mensaje = 'Error al borrar la historia'
      setTimeout(
        this.mensaje = '',
        4000
      )

    },()=>{
      return this.mensaje = 'Se borro la historia'
      setTimeout(
        this.mensaje = '',
        4000
      )
    })
  }

}
