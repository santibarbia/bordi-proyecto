import { Component, OnInit } from '@angular/core';
import { GlobalesService } from '../../servicios/globales.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Combo } from '../../clases/combo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-proyectos-terminados',
  templateUrl: './proyectos-terminados.component.html',
  styleUrls: ['./proyectos.component.css'],
  providers:[DatePipe]
})
export class ProyectosTerminadosComponent implements OnInit {
  finalizados:any=[];
  activos:any=[];
  error:boolean = null;
  mensaje:string = '';
  proyMod:FormGroup =this.fb.group({
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
    fechaHoraCierre:[,[Validators.required]],
    id:[,Validators.required]
  });
  colaboradores: any;
  combosOpc: Combo[];
  vendedores: any = [];
  combos: any = [];
  constructor(private globalesService:GlobalesService,
              private fb:FormBuilder,
              public date:DatePipe) { }

  ngOnInit(): void {
    this.globalesService.proyectosActivos().subscribe(respuesta =>{
      console.log('ACTIVOS',respuesta)
      this.activos = respuesta
    });
    this.globalesService.proyectosFinalizado().subscribe(respuesta =>{
      console.log('FINALIZADOS',respuesta)
      this.finalizados = respuesta
    });
    this.globalesService.obtenerColaboradores().subscribe(respuesta =>{
      this.colaboradores = respuesta;
    })
    this.globalesService.obtenerCombosHab().subscribe((respuesta:Combo[]) =>{
      this.combosOpc = respuesta;
    })
  }

  agregar(item, lista){
    console.log('Item',item);
    if(lista == 'vendedores'){
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
        this.proyMod.controls['nombreVend'].reset();
      }
    }else{
      for (let i = 0; i < this.combos.length; i++) {
        this.combos.splice(indice,1);
        this.proyMod.controls['combosHab'].reset();  
      }
    };
  }

  borrarProyecto(proyecto){
    this.activos = [];
    this.globalesService.borrarProyecto(proyecto.id).subscribe(respuesta =>{
        console.log('respuesta borrado', respuesta)
        this.globalesService.proyectosActivos().subscribe(respuesta =>{
          console.log('ACTIVOS',respuesta)
          this.activos = respuesta
        });
    },(err)=>{
      this.error = true
      this.mensaje = 'Error al borrar el proyecto'
      setTimeout(
        this.error = null,
        4000
      )

    },()=>{
      this.error = false
      this.mensaje = 'Se borro el proyecto'
      setTimeout(
        this.error = null,
        4000
      )
    })
  }
  modificarProyecto(form){
    this.vendedores = [];
    this.combos = [];
    this.activos = [];
    this.globalesService.proyectoModificar(form.id).subscribe(respuesta=>{
      console.log('Proyecto a modificar 1',respuesta);
      this.proyMod.controls['id'].setValue(form.id);
      for (let item of Object.keys(respuesta)){
      
          for(let itemForm in this.proyMod.controls){
            if(item == 'fechaLimite'){
                let fechaString = new Date(respuesta[item])
                let fecha = this.date.transform(fechaString,"yyyy-MM-dd")
                
                this.proyMod.controls['fechaLimite'].setValue(fecha)
              }
              if(item == 'fechaHoraCierre'){
                let fechaString = new Date(respuesta[item])
                let fecha = this.date.transform(fechaString,"yyyy-MM-ddThh:mm")
                this.proyMod.controls['fechaHoraCierre'].setValue(fecha)

              }
            if(item == itemForm){
              
              
              if(itemForm == 'nombreVend'){
                console.log(respuesta[item]);
                for (let i = 0; i < respuesta[item].length; i++) {
                  this.vendedores.push(respuesta[item][i])    
                }
              }else{
                if(itemForm == 'combosHab'){
                  for (let i = 0; i < respuesta[item].length; i++) {
                    this.combos.push(respuesta[item][i])    
                  }
                }else{
                  if(itemForm == 'colaborador'){
                   let html = document.getElementById('colaborador');
                  html.setAttribute("value",respuesta[itemForm]);
                  this.proyMod.controls[itemForm].setValue(respuesta[itemForm]);
                  
                  }
               
                }
              
              }
              if(itemForm !=='combosHab'&& itemForm !=='nombreVend'){
              this.proyMod.controls[itemForm].setValue(respuesta[item]===null || respuesta[item]===null? "" : respuesta[item]);
              }
            } 
          
          }
            
            
        };
        this.globalesService.proyectosActivos().subscribe(respuesta =>{
          console.log('ACTIVOS',respuesta)
          this.activos = respuesta
        });
    },(err)=>{
      this.globalesService.proyectosActivos().subscribe(respuesta =>{
        console.log('ACTIVOS',respuesta)
        this.activos = respuesta
      });
    })
    
  }
  cancelar(form){
    console.log('entro aca');
    this.vendedores = [];
    this.combos = []
    form.reset()
  }
  enviar(form){
    console.log(form)
    if((form.valid || form.status == 'VALID')|| form.touched){
      for(let colaborador of this.colaboradores){
        if(form.controls['colaborador'].value == colaborador.id){
          
          form.controls['colaborador'].setValue(colaborador);
        }
      }
      this.activos = [];
        form.controls['combosHab'].setValue(this.combos)
        form.controls['nombreVend'].setValue(this.vendedores)
        console.log('Formulario de creacion', form.value);
        this.globalesService.modificarProyecto(form.value).subscribe(respuesta=>{
          console.log(respuesta)
          this.globalesService.proyectosActivos().subscribe(respuesta =>{
            console.log('ACTIVOS',respuesta)
            this.activos = respuesta
          });
          },(err)=>{
            this.mensaje = "No se pudo crear el proyecto, verifique sus datos";
            setTimeout(() => {
              this.mensaje = "";
            }, 4000);
            this.globalesService.proyectosActivos().subscribe(respuesta =>{
              console.log('ACTIVOS',respuesta)
              this.activos = respuesta
            });
            
          },()=>{
            this.activos = []
            this.mensaje = "El proyecto se creo con exito";
            this.globalesService.proyectosActivos().subscribe(respuesta =>{
              console.log('ACTIVOS',respuesta)
              this.activos = respuesta
            });
            form.reset();
            this.vendedores = [];
            this.combos = []
            
          })
        }else{
          this.mensaje = "No se pudo crear el proyecto, verifique sus datos";
          
        }
  }
}
