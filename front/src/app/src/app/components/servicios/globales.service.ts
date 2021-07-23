import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMBOS, URL_GLOBAL, HISTORIES, PAGINAS, COMBOS_DESTACADOS, VENTAS, PROYECTO_ID, PROYECTO, GEST_PROY, COLABORADORES, COMBOS_HABILITADOS, GET_SELLER, GEST_USERS, META, STATISTICS, COMBOS_DISPONIBLES, MODIFICAR_VENTAS, USUARIOS, BORRAR_VENTAS, CARGAR_IMAGENES, CONTAINER, GET_EVENT } from './globales.constantes';
import { Observable } from 'rxjs';

import { Combo } from '../clases/combo';
import { SeguridadService } from './seguridad.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
  
})
export class GlobalesService {
  private url = 'api/ToContacts/registeryMenssage';
  userToken:string;
  arreglo:Object[] = [];
  itemArreglo:Object;
  constructor(private _http:HttpClient,
              private seguridad:SeguridadService,
              private date:DatePipe) { 
      this.userToken = this.seguridad.userToken
  }


  getCombos():Observable<Combo[]>{

      return this._http.get<Combo[]>(`${PAGINAS}`);

  }
  obtenerCombos(project):Observable<Combo[]>{

    return this._http.get<Combo[]>(`${COMBOS_DISPONIBLES}?filter[where][and][0][availability]=true&filter[where][and][1][projectId]=${project}`);

}
  combos(){
    return this._http.get(`${COMBOS}?filter[where][status]=ACTIVO`)
  }
  historias(){
    return this._http.get(`${HISTORIES}?filter[where][status]=ACTIVO`)
  }
  proyectosActivos(){
    return this._http.get(`${PROYECTO}?filter[where][status]=ACTIVO`)
  }
  proyectosFinalizado(){
    return this._http.get(`${PROYECTO}?filter[where][status]=FINALIZADO`)
  }
  modificarCombos(combo){
    return this._http.patch(COMBOS,combo)
  }

  modificarHistorias(historia){
    
    return this._http.patch(HISTORIES,historia)
  }

  getDestacados(pag):Observable<Combo[]>{
    return this._http.get<Combo[]>(`${COMBOS_DESTACADOS}?filter[limit]=2&filter[skip]=${pag}`);
  }
  
  getCatalogo(pag):Observable<Combo[]>{
    if(window.screen.width <= 425)
    {
      return this._http.get<Combo[]>(`${COMBOS}?filter[limit]=9&filter[skip]=${pag}&filter[include]=Files&filter[where][status]=ACTIVO`)
    }
    else{
    return this._http.get<Combo[]>(`${COMBOS}?filter[limit]=9&filter[skip]=${pag}&filter[include]=Files&filter[where][status]=ACTIVO`)
    }
  }

  getHistoriesWithFiles(){
    return this._http.get(HISTORIES+'?filter[limit]=4&filter[include]=Files&fiter[where][status]=ACTIVO');
  }

  // filter[where][and][0][name][like]=%${palabra}%&filter[where][and][1][status]=ACTIVO&filter[order]=price%20ASC&filter[include]=Files
  search(filtro,palabra){
    let filter = '';
    switch(parseInt(filtro)){
      case 2:
        if(palabra) {
          filter = `filter[where][and][0][typeFood][like]=%${palabra}%&filter[where][and][1][status]=ACTIVO&filter[include]=Files`;
        } else {
          filter = `filter[where][status]=ACTIVO&filter[include]=Files`;
        }
        break;

      case 3:
        if(palabra) {
          filter = `filter[where][and][0][name][like]=%${palabra}%&filter[where][and][1][status]=ACTIVO&filter[order]=price%20ASC&filter[include]=Files`;
        } else {
          filter = `filter[where][status]=ACTIVO&filter[order]=price%20ASC&filter[include]=Files`;
        }
        break;

      case 4:
        if(palabra) {
          filter = `filter[where][and][0][name][like]=%${palabra}%&filter[where][and][1][status]=ACTIVO&filter[order]=price%20DESC&filter[include]=Files`;
        } else {
          filter = `filter[where][status]=ACTIVO&filter[order]=price%20DESC&filter[include]=Files`;
        }
        break;

      case 5:
        if(palabra) {
          filter = `filter[where][and][0][brand][like]=%${palabra}%&filter[where][and][1][status]=ACTIVO&filter[include]=Files`;
        } else {
          filter = `filter[where][status]=ACTIVO&filter[include]=Files`;
        }
        break;

      case 6:
        if(palabra) {
          filter = `filter[where][and][0][name][like]=%${palabra}%&filter[where][and][1][status]=ACTIVO&filter[order]=elements%20DESC&filter[include]=Files`;
        } else {
          filter = `filter[where][status]=ACTIVO&filter[order]=elements%20DESC&filter[include]=Files`;
        }
        break;

      default:
        if(palabra) {
          filter = `filter[where][and][0][name][like]=%${palabra}%&filter[where][and][1][status]=ACTIVO&filter[include]=Files`;
        } else {
          filter = `filter[where][status]=ACTIVO&filter[include]=Files`;
        }
        break;
      }

      return this._http.get(`${COMBOS}?${filter}`);
  }

  saveDetail(arreglo){
    
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    const body = [...arreglo]
    
    
    return this._http.post(VENTAS,body,{headers})
  }
  getProyecto(seller,proyecto){
    
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(`${PROYECTO_ID}?sellerId=${seller}&projectId=${proyecto}`,{headers})
  }

  getProyectId(ID){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(`${PROYECTO_ID}/?projectId=${ID}`,{headers})
  }

  enviarMail(form){
    console.log('Formulario',form.value);
    const BODY={
      nameContact:form.value['nombre'],
      menssage:form.value['pregunta'],
      institucion:form.value['institucion'],
      contacts:{
        email:{typeContact:'email',
          valueContact:form.value['email']},
        tel:{typeContact:'tel',
        valueContact: form.value['telefono'] == '' ? 0 : form.value['telefono']}
        
      }
    }
    return this._http.post(`${URL_GLOBAL}${this.url}`,
    BODY)
  }
  obtenerCombosHab(){
    
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(COMBOS_HABILITADOS,{headers})
  }
  obtenerColaboradores(){

    const headers = {
      Authorization: this.userToken
    };
    return this._http.get<Combo[]>(COLABORADORES,{headers})
  }


  getSellerPorVendedor(seller, project){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(`${GET_SELLER}?sellerId=${seller}&projectId=${project}`,{headers})
  }
  getSellerPorProyecto(project){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(`${GET_SELLER}?projectId=${project}`,{headers})
  }

  getUsuariosAdmin(){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(`${GEST_USERS}?filter[where][and][0][typeRole]=ADMIN&filter[where][and][1][status]=ACTIVO&filter[where][and][2][username][neq]=superroot`,{headers})
  }
  getUsuariosColaborador(){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(`${GEST_USERS}?filter[where][and][0][typeRole]=COLABORADOR&filter[where][and][1][status]=ACTIVO`,{headers})
  }
  gestionProyecto(form){
    const headers = {
      Authorization: this.userToken
    };
    const body = form;
    return this._http.post(GEST_PROY,body,{headers});
  }
  borrarProyecto(id){
    const headers = {
      Authorization: this.userToken
    };
    
    return this._http.delete(`${PROYECTO}/softDelete/${id}`,{headers});
  }
  gestUsuarios(form){
    const headers = {
      Authorization: this.userToken
    };
    const body = {...form};
    return this._http.post(GEST_USERS,body,{headers})
  }

  getMeta(id){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(`${META}?projectId=${id}`,{headers});
  }

  getStatistics(){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.get(STATISTICS,{headers})
  }
  modificarUser(id, user){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.patch(`${USUARIOS}/${id}`,user,{headers})
  }
  modificarVenta(venta){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.patch(MODIFICAR_VENTAS,venta,{headers})
  }
  borrarVentas(id){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.delete(`${BORRAR_VENTAS}/${id}`,{headers})

  }
  borrarUser(id){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.delete(`${USUARIOS}/softDelete/${id}`,{headers})
  }

  cargarCombo(combo){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.post(COMBOS,combo,{headers})
  }
  borrarCombo(id){
    const headers = {
      Authorization: this.userToken
    };
    return this._http.delete(`${COMBOS}/softDelete/${id}`,{headers})
  }
  async cargarFoto(
    archivo: File,
    tipo:'Histories'|'Combo',
    id:string
    ){
      
      const headers = {
        Authorization: localStorage.getItem('token')
      };
    try {
      const url = `${CARGAR_IMAGENES}/${CONTAINER}/upload`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      formData.append('tipo',tipo);
      formData.append('id',id)

      const respuesta = await fetch(url,
        { method:'POST', 
          headers:headers, 
          body:formData
        });
        console.log(respuesta);
        return true;
    } catch (error) {
      console.log(error);
      return false;

    }
  }
  cargarHistorias(histories){
    
    return this._http.post(HISTORIES,histories);
  }

  borrarHistorias(id){
    return this._http.delete(`${HISTORIES}/softDelete/${id}`)
  }
  proyectoModificar(id){
    return this._http.get(`${PROYECTO}/getProjectToModal/${id}`)

  }

  modificarProyecto(form){
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    return this._http.patch(`${PROYECTO}/saveChangesDetails`,form,{headers})
  }

  getCalendarEvent(){
    this.arreglo=[]
    return this._http.get(GET_EVENT).pipe(map((resp:any)=>
     { 
       for (const item of resp) {
         let date = new Date(item.date)
         let fecha = date.getDate()+1;
         console.log(fecha)
          this.itemArreglo = {
            date:this.date.transform(item.date,"yyyy-MM-")+fecha,
            title:item.title,
            description:item.description,
            id:item.id,
            projectId:item.projectId 
          }
          
          if(this.itemArreglo != undefined){
            this.arreglo.push(this.itemArreglo)
          }
          
     }
     console.log('Observar',this.arreglo)
     return this.arreglo
    }
      
      ))
  }
  crearEvent(form){

    return this._http.post(GET_EVENT,form)
  }
  modificarEvent(form){
    return this._http.patch(`${GET_EVENT}/${form.id}`,form)
  }
  borrarEvent(id){
    return this._http.delete(`${GET_EVENT}/${id}`);
  }

  checkProyect(){
    return this._http.patch(`${PROYECTO}/checkProject/${this.seguridad.proyectId}`,null)
  }
  tuttiListo(){
    return this._http.patch(`${PROYECTO}/checkProject/${this.seguridad.proyectId}`,null)
  }

  sendControlMail(){
    return this._http.post(`${PROYECTO}/sendControlMail/${this.seguridad.proyectId}`,null)
  }
}
