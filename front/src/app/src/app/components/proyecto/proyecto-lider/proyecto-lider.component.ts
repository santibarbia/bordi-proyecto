import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../servicios/seguridad.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GlobalesService } from '../../servicios/globales.service';
import { Combo } from '../../clases/combo';
@Component({
  selector: 'app-proyecto-lider',
  templateUrl: './proyecto-lider.component.html',
  styleUrls: ['./proyecto-lider.component.css']
})
export class ProyectoLiderComponent implements OnInit {

  arregloVentasEnviar:FormGroup[]= [];
  arregloVentas:FormGroup[]= [];
  arregloModificar:any[]=[];
  formVenta:FormGroup;
  formModificar:FormGroup;
  fechaActual:Date = new Date();
  combos:Combo[]=[];
  nombre:string;
  formEnviar:FormGroup;
  id:number;
  excel:any;
  resumenVentas:any;
  objetivos:any = {};
  proyect:any = [];
  check:any;
  boleano:boolean;
  constructor( private seguridad:SeguridadService,
               private fb:FormBuilder,
               private _globalService:GlobalesService) { 
                
               }

  ngOnInit() {

    this.fechaActual.getTime()

    this.getMeta();
    this.crearFormulario();
    
    this._globalService.obtenerCombos(this.seguridad.proyectId).subscribe(respuesta=>
      {
        console.log('combos', respuesta)
        this.combos = respuesta
      })
      this._globalService.getProyectId(this.seguridad.proyectId).subscribe(data=>{
        console.log(data);
        this.proyect = data[0];
        this.excel = data[0].Details;
        this.boleano = this.proyect.checked
      },(err)=>{},()=>{
        console.log('buleano', this.boleano)
       this.setearChek(this.boleano)
       
      })
    
    this._globalService.getSellerPorProyecto(this.seguridad.proyectId).subscribe(data=>
      {
        this.resumenVentas = data;
      });
    
    
  }


  setear(venta){
    console.log(venta);
    this.formModificar.controls['detail_id'].setValue(venta.id);
    this.formModificar.controls['seller_id'].setValue(venta.seller);
    this.formModificar.controls['cantidad'].setValue(venta.cantidad);
    
    // Formulario para agregar ventas
    this.formVenta.controls['vendedor'].setValue(venta.seller);
    this.formVenta.controls['cantidad'].setValue(venta.cantidad);
    this.formVenta.controls['combo'].setValue(venta.Combos.id);
    this.formVenta.controls['precio'].setValue(venta.subTotal);
  }

  crearFormulario(){
    this.formVenta = this.fb.group(
      {
        vendedor:[,Validators.required],
        combo:[,Validators.required],
        cantidad:[,[Validators.min(0),Validators.required,Validators.pattern("^[0-9]+")]],
        precio:[,Validators.required]
      }
    ),
    this.formEnviar= this.fb.group(
      {
        seller_id:[,Validators.required],
        combo_id:[,Validators.required],
        cantidad:[,[Validators.required]],
        project_id:[,[Validators.required]]
      }
    )
    this.formModificar= this.fb.group(
      {
        
        seller_id:[,Validators.required],
        combo_id:[,Validators.required],
        cantidad:[,[Validators.required]],
        detail_id:[,[Validators.required]]
      }
    )
  }
  calcular(){
    
    console.log(this.formVenta.controls['combo'])
    
    if (this.formVenta.controls['combo'].value != null || this.formVenta.controls['combo'].value != undefined){
      
      for (let item of this.combos ) {
       
        if (this.formVenta.controls['combo'].value == item.id.toString()) {
           console.log('item',item)
          this.nombre = item.name
          this.id = item.id
         console.log('Cantidad', this.formVenta.controls['cantidad'].value);
         let precio = this.formVenta.controls['cantidad'].value * item.price;
         this.formVenta.controls['precio'].setValue(precio)
        }
      }    
      }
  
  }

  cargarVenta(){
    console.log(this.arregloVentas);
    this._globalService.saveDetail(this.arregloVentasEnviar).subscribe(respuesta=>{
      console.log('Respuesta obtenida',respuesta)
    },(err)=>{},()=>{
      this._globalService.getProyectId(localStorage.getItem('Proyecto')).subscribe((data:any)=>{
        console.log(data);
        this.excel = data[0].Details;
      });
      this._globalService.getSellerPorProyecto(localStorage.getItem('Proyecto')).subscribe(data=>
        {
          this.resumenVentas = data;
        });
      this.getMeta();
    })
  }
  agregarVenta(form:FormGroup,tipo:string){
    if(tipo === 'CREACION'){
        this.formVenta.controls['combo'].setValue(this.nombre)
        this.arregloVentas.push(form.value)
        this.formEnviar.controls['seller_id'].setValue(this.formVenta.controls['vendedor'].value)
        this.formEnviar.controls['combo_id'].setValue(this.id)
        this.formEnviar.controls['cantidad'].setValue(this.formVenta.controls['cantidad'].value)
        form.reset();
        form.controls['vendedor'].setValue(localStorage.getItem('idV'))
        if(this.formEnviar.valid){
        this.arregloVentasEnviar.push(this.formEnviar.value);
        console.log('arreglo',this.arregloVentasEnviar)
    }else{
      this.formVenta.controls['combo'].setValue(this.nombre)
      this.arregloModificar = form.value;
        this.formEnviar.controls['seller_id'].setValue(this.formVenta.controls['vendedor'].value)
        this.formEnviar.controls['combo_id'].setValue(this.id)
        this.formEnviar.controls['cantidad'].setValue(this.formVenta.controls['cantidad'].value)
      this.formVenta.controls['combo'].setValue(this.nombre)
      this.arregloModificar = form.value;
      console.log('Arreglo', this.arregloModificar);
    }
  }
  }
  logout(){
    this.seguridad.logout().subscribe(
      respuesta=>{
        console.log(respuesta) 
        
      },()=>{},()=>{
      })
   

  }
  getMeta(){
    this._globalService.getMeta(localStorage.getItem('Proyecto')).subscribe(respuesta=>{
      console.log('OBJETIVO', respuesta);
      this.objetivos = respuesta

    })
  }
  modificarVenta(form){
    console.log('Observar aca',form.value)
    this.formModificar.controls['cantidad'].setValue(form.controls['cantidad'].value);
    this.formModificar.controls['combo_id'].setValue(this.id);
    console.log(this.formModificar.value)
    this._globalService.modificarVenta(this.formModificar.value).subscribe(respuesta=>{
      console.log('PATCH COMPLETO', respuesta);
      this._globalService.getProyectId(localStorage.getItem('Proyecto')).subscribe((data:any)=>{
        console.log(data);
        this.excel = data[0].Details;
      });
      this._globalService.getSellerPorProyecto(localStorage.getItem('Proyecto')).subscribe(data=>
        {
          this.resumenVentas = data;
        });
      this.getMeta();
    },(err)=>{},()=>{
      this._globalService.getProyectId(localStorage.getItem('Proyecto')).subscribe((data:any)=>{
        console.log(data);
        this.excel = data[0].Details;
      });
      this._globalService.getSellerPorProyecto(localStorage.getItem('Proyecto')).subscribe(data=>
        {
          this.resumenVentas = data;
        });
      this.getMeta();
    })
    
  }
  borrarVentas(id){
    this._globalService.borrarVentas(id.id).subscribe(respuesta=>{
      console.log('Respuesta borrar ventas',respuesta);
      this.getMeta();
    },(err)=>{},()=>{
      this._globalService.getProyectId(localStorage.getItem('Proyecto')).subscribe((data:any)=>{
        console.log(data);
        this.excel = data[0].Details;
      })
     this._globalService.getSellerPorProyecto(localStorage.getItem('Proyecto')).subscribe(data=>
       {
         this.resumenVentas = data;
       })
       this.getMeta();
    })
  }
  borrarForm(form:FormGroup,arreglo:any[]){
    form.reset();
    arreglo.splice(0)
  }
  async setearChek(bolean){
    console.log('setear Check');
    this.check =await document.getElementsByName('check');
       console.log(this.check);
       console.log('Entro aca',bolean)
       if(bolean){
         for (let item of this.check) {
         item.checked = bolean;
       }
       }
       
       
  }
  verificar(){
    console.log('Id del proyecto');
    var check:any = document.getElementsByName('check');
    let bandera = false
    for (let i = 0; i < check.length; i++) {
      if(check[i].checked == true){
        bandera  = true;  
      }else{
        bandera = false;
        break;   
      } 
    }
    if(bandera){
      this._globalService.checkProyect().subscribe(respuesta=>{
        console.log('Respuesta Check',respuesta);
    },(err)=>{},()=>{
      this._globalService.getProyectId(this.seguridad.proyectId).subscribe((data:any)=>{
        console.log('Respuesta ProyectId',data);
        this.proyect = data[0]
        this.excel = data[0].Details;
        console.log('Project', this.proyect)
      })
    });
    }else{
      return this.proyect.checked;
    }
    

  }

  enviarMailControl(){
    this._globalService.sendControlMail().subscribe(respuesta=>{
      console.log('Se envio el mail de control')
    })
  }

  tuttiListo(){
    this._globalService.tuttiListo().subscribe(respuesta=>{
      console.log('Tutti listo completo', respuesta)
    })
  }
}
