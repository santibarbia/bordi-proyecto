import { Component, OnInit } from '@angular/core';
import { GlobalesService } from '../servicios/globales.service';
import { Combo } from '../clases/combo';
import { isNullOrUndefined } from 'util';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  ancho: number;
  bandera:boolean = true;
  opcionesGral:FormControl;
  search:FormControl;
  pagina: number[]= [];
  catalogo: Combo[]=[];
  destacados: Combo[] = [];

  constructor(private _globalService:GlobalesService) { 
    this.catalogo = []
    
  }

  ngOnInit(): void {
    
    let cantidad = 0;
    let pagina;
    this._globalService.getCombos().subscribe((respuesta:any)=>{
      
      this.ancho = window.screen.width
      if(this.ancho <= 425){
          cantidad = respuesta.count;
        pagina = Math.ceil(cantidad / 2);
        for (let i = 0; i < pagina; i++) {
          this.pagina.push(i);
        }
      }
      else{

        cantidad = respuesta.count;
        pagina = Math.ceil(cantidad / 9);
        for (let i = 0; i < pagina; i++) {
          this.pagina.push(i);
        }
      }
      console.log('Cantidad de paginas', this.pagina);
    });
    this.obtenerDestacados(0);
    this.obtenerCatalogo(0);
    
  }
 

  obtenerCatalogo(pag){
    let page = 9*pag;
    this._globalService.getCatalogo(page).subscribe(respuesta=>{
      console.log('pagina',page);
      console.log('Mirar Catalogo',respuesta);
      this.catalogo = respuesta;
    })
  }

  obtenerDestacados(pag){
    console.log(pag)
    this._globalService.getDestacados(pag).subscribe(respuesta =>{
      console.log('destacados', respuesta)
      this.destacados = respuesta
    })
  }

  banderas(id){
    if (isNullOrUndefined(this.catalogo[0]['bandera'])){
      for (let combo of this.catalogo){
        combo['bandera']=false;
      }
    }
    for (let combo of this.catalogo){
      if (id == combo.id){ 
         if(combo['bandera']==true){
        combo['bandera']=false
        } else{
        combo['bandera']=true
      }
        
      }
    }
    console.log(this.catalogo)
  }

  buscador(){
    this.catalogo = [];
   console.log('Opcion elegida',this.opcionesGral);
   console.log('palabra elegida',this.search);
   this._globalService.search(this.opcionesGral,this.search).subscribe(
     (respuesta:any) =>{
       console.log(respuesta);
       this.catalogo = respuesta
     }
   )
  }

  controlAncho(){
    if (this.ancho > 485){
      return false;
    }else{
      return true;
    }
  }

}
