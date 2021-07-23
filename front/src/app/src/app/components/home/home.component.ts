import { Component, OnInit, ElementRef, DoCheck } from '@angular/core';
import { getLocaleId } from '@angular/common';
import { GlobalesService } from '../servicios/globales.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit,DoCheck {
  ancho:number;
  screen:any;
  historiesArray: any[];
  constructor( private globalService:GlobalesService) {

  }

  ngOnInit(): void {
    this.ancho = window.screen.width;
    this.historiesArray = [];
    
    console.log('this.ancho', this.ancho)
    this.globalService.getHistoriesWithFiles().subscribe((respuesta:any[])=>{
      console.log('respuesta', respuesta)
      for (let j = 0; j < respuesta.length; j++) {
        let history = respuesta[j];
        const files = history.Files;
        for (let i = 0; i < files.length; i++) {
          if(files[i].principal){
            history['filePrincipal'] = files[i];
            respuesta[j] = history;
            break;
          }else{
            history['filePrincipal'] = files[0];
            respuesta[j] = history;
            break;
          }
        }
      }
      this.historiesArray = respuesta;
      console.log(this.historiesArray);
    })

  }

  ngDoCheck(){
    if(window.screen.width !== this.ancho){
      this.ancho = window.screen.width
    }
  }
  
  funcionModal(id){
    let urlImage = document.getElementById("contenedor");
    for (let i = 0; i < this.historiesArray.length; i++) {
      for (let j = 0; j < this.historiesArray[i].Files.length; j++) {
         if (id === this.historiesArray[i].Files[j].id){
          console.log(this.historiesArray[i].Files[j].url)
          console.log(this.historiesArray[i].Files[j].id)
          urlImage.setAttribute('src',this.historiesArray[i].Files[j].url);
        }
      }  
    }  
  }

  sliderAutomatico(id) { 

  }

}
