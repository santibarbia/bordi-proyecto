import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../servicios/seguridad.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalesService } from '../servicios/globales.service';
import { Combo } from '../clases/combo';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  arregloVentasEnviar:FormGroup[]= [];
  arregloVentas:FormGroup[]= [];
  formVenta:FormGroup;
  fechaActual:Date = new Date();
  combos:Combo[]=[];
  nombre:string;
  formEnviar:FormGroup;
  id:number;
  sellerId:number;
  proyecId:number;
  excel:any;
  resumenVentas:any;
  cantidad:number;
  objetivos:any = {};

  constructor( private seguridad:SeguridadService,
               private fb:FormBuilder,
               private _globalService:GlobalesService) { }

  ngOnInit(): void {
     this.sellerId = Number(localStorage.getItem('idV'));
     this.proyecId = this.seguridad.proyectId;
    this.fechaActual.getTime()

    this.getMeta();
    this.crearFormulario();
    this._globalService.obtenerCombos(this.proyecId).subscribe(respuesta=>
      {
        console.log('combos', respuesta)
        this.combos = respuesta
      })
      new CampoNumerico('#cantidad');
    this._globalService.getProyecto(this.sellerId,this.proyecId).subscribe((data:any)=>{
        console.log('Excel Inicial', data);
        this.excel = data[0].Details;
      })
    this._globalService.getSellerPorVendedor(this.sellerId,this.proyecId).subscribe(respuesta=>{
      console.log('SELLER', respuesta);
      this.resumenVentas = respuesta;
    })
  }

  crearFormulario(){
    this.formVenta = this.fb.group(
      {
        vendedor:[localStorage.getItem('idV'),Validators.required],
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
        project_id:[this.proyecId,[Validators.required]]
      }
    )
  }
  calcular(){
    console.log(this.formVenta.controls['combo'])
    
    if (this.formVenta.controls['combo'].valid){
      
    for (let item of this.combos ) {
      if (this.formVenta.controls['combo'].value === item.id.toString()) {
        this.nombre = item.name
        this.id = item.id
        this.cantidad = this.formVenta.controls['cantidad'].value
       console.log('Cantidad', this.formVenta.controls['cantidad'].value);
       let precio = this.cantidad * item.price
       if (this.formVenta.controls['cantidad'].value == null){
        this.formVenta.controls['cantidad'].setValue('');
        this.formVenta.controls['precio'].setValue('')
       }else{
         this.formVenta.controls['precio'].setValue(precio)
       }
       
      }
    }
    
  }
  
  }

  cargarVenta(){
    console.log(this.arregloVentas);

    this._globalService.saveDetail(this.arregloVentasEnviar).subscribe(respuesta=>{
      console.log('Respuesta obtenida',respuesta);
      this.arregloVentas = [];
      this.arregloVentasEnviar = []
      
    },(err)=>{},()=>{
      this._globalService.getProyecto(this.sellerId,this.proyecId).subscribe((data:any)=>{
        console.log('Excel Inicial', data);
        this.excel = data[0].Details;
      });
      this._globalService.getSellerPorVendedor(this.sellerId,this.proyecId).subscribe(respuesta=>{
        console.log('SELLER', respuesta);
        this.resumenVentas = respuesta;
      });
      this.getMeta();
      
    })
  }
  agregarVenta(form:FormGroup){
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
    this._globalService.getMeta(this.proyecId).subscribe(respuesta=>{
      console.log('OBJETIVO', respuesta)
      this.objetivos = respuesta;
    })
  }
}
class CampoNumerico {
  nodo:any;
  valor:string;
  constructor(selector) {
    this.nodo = document.querySelector(selector);
    this.valor = '';
    
    this.empezarAEscucharEventos();
  }
  
  empezarAEscucharEventos() {
    this.nodo.addEventListener('keydown', function(evento) {
      const teclaPresionada = evento.key;
      const teclaPresionadaEsUnNumero =
        Number.isInteger(parseInt(teclaPresionada));

      const sePresionoUnaTeclaNoAdmitida = 
        teclaPresionada != 'ArrowDown' &&
        teclaPresionada != 'ArrowUp' &&
        teclaPresionada != 'ArrowLeft' &&
        teclaPresionada != 'ArrowRight' &&
        teclaPresionada != 'Backspace' &&
        teclaPresionada != 'Delete' &&
        teclaPresionada != 'Enter' &&
        !teclaPresionadaEsUnNumero;
      const comienzaPorCero = 
        this.nodo.value.length === 0 &&
        teclaPresionada == 0;

      if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
        evento.preventDefault(); 
      } else if (teclaPresionadaEsUnNumero) {
        this.valor += String(teclaPresionada);
      }

    }.bind(this));

    this.nodo.addEventListener('input', function(evento) {
      const cumpleFormatoEsperado = new RegExp(/^[0-9]+/).test(this.nodo.value);

      if (!cumpleFormatoEsperado) {
        this.nodo.value = this.valor;
      } else {
        this.valor = this.nodo.value;
      }
    }.bind(this));
  }

}


