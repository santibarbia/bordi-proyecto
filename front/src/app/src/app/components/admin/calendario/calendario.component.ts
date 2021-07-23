import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalesService } from '../../servicios/globales.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  eventos1:any=[]
  
  calendar:CalendarOptions = {
    initialView: 'dayGridMonth'
  }
  
  form:FormGroup = this.fb.group({
    date:[new Date()],
    title:[''],
    id:[''],
    description:[''],
    projectId:[null]
  });
  mensaje:string
 
  
  constructor( private fb:FormBuilder,
               private _globalServices:GlobalesService,
               private date: DatePipe ) { 
       
    
                
  
  }

  ngOnInit(): void {
    this.eventos1 =[];
    this._globalServices.getCalendarEvent().subscribe((respuesta:any)=>{
      for(let item of respuesta){
          this.eventos1.push(item)
      }
      
      for(let item of this.eventos1){
        item.date = this.date.transform(item.date,"yyyy-MM-dd")
      }
      console.log(this.eventos1)
      this.cargarCalendario()
    });
    
  }
  cargarCalendario(){
    let evento = this.form;
    let funcion = this._globalServices;
    this.calendar = {
      initialView: 'dayGridMonth',
      locale:'es',
      timeZone:'local',
      weekends: true,
      events: this.eventos1,
      selectable: true,
      editable:true,
      eventDrop:function(info){
         console.log("Mirar titulo", info.event);
        evento.controls['date'].setValue(info.event.startStr);
        evento.controls['title'].setValue(info.event.title);
        evento.controls['id'].setValue(info.event.id);
        evento.controls['description'].setValue(info.event._def.extendedProps.description);
        evento.controls['projectId'].setValue(info.event._def.extendedProps.projectId);
        funcion.borrarEvent(evento.controls['id'].value).subscribe();
        funcion.crearEvent(evento.value).subscribe(respuesta=>{
          console.log(respuesta)
        },(err)=>{},()=>{
          this.eventos1 =[];
          funcion.getCalendarEvent().subscribe(respuesta=>{
            console.log(respuesta)
            this.eventos1 = respuesta
          })
          
        })
        
      },
      eventClick:function(info){
        console.log('Modificar Evento',info);
        ($('#modificar')as any).modal('show');
        evento.controls['date'].setValue(info.event.startStr);
        evento.controls['title'].setValue(info.event.title);
        evento.controls['id'].setValue(info.event.id);
        evento.controls['description'].setValue(info.event._def.extendedProps.description);
        evento.controls['projectId'].setValue(info.event._def.extendedProps.projectId);
        
      }
    }
    
  }
  agregarEvento(form){
    console.log(form)
    this.eventos1.push(form.value)
    this._globalServices.crearEvent(form.value).subscribe(respuesta=>{
      console.log(respuesta)
      this.ngOnInit();
    },(err)=>{},()=>{
      
      
    })
    
    this.form.reset()
  }
  async borrar(form){
    console.log(form)
    this._globalServices.borrarEvent(form.id).subscribe(respuesta=>{
      console.log(respuesta)
      this.ngOnInit();
    },(err)=>{},()=>{
      
    })
    
    this.form.reset();
    
  }
  cancelar(){
    this.form.reset()
  }
  recibir($event){
    this.mensaje = $event
    console.log('Observar', this.mensaje)
  }
  modificar(form){
    console.log('Formulario mod', form)
    this._globalServices.modificarEvent(form.value).subscribe(respuesta=>{
      console.log(respuesta)
      this.ngOnInit();
    },(err)=>{},()=>{
      
     
    })
    this.form.reset()
  }
 
}
