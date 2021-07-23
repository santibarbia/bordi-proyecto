import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './src/app/components/home/home.component';
import { CatalogoComponent } from './src/app/components/catalogo/catalogo.component';
import { ContactoComponent } from './src/app/components/contacto/contacto.component';
import { LoginComponent } from './src/app/components/login/login.component';
import { ProyectoComponent } from './src/app/components/proyecto/proyecto.component';
import { CoordinadorComponent } from './src/app/components/coordinador/coordinador.component';
import { AdminComponent } from './src/app/components/admin/admin.component';
import { SeguridadGuard } from './src/app/components/servicios/seguridad.guard';
import { InicioComponent } from './src/app/components/admin/inicio/inicio.component';
import { CalendarioComponent } from './src/app/components/admin/calendario/calendario.component';
import { UsuariosComponent } from './src/app/components/admin/usuarios/usuarios.component';
import { ProyectosComponent } from './src/app/components/admin/proyectos/proyectos.component';
import { ProyectosActualesComponent } from './src/app/components/admin/proyectos/proyectos-actuales.component';
import { ProyectosTerminadosComponent } from './src/app/components/admin/proyectos/proyectos-terminados.component';
import { ProyectoLiderComponent } from './src/app/components/proyecto/proyecto-lider/proyecto-lider.component';


const APP_ROUTES: Routes = [
    {path: 'home', component:HomeComponent},
    {path: 'catalogo', component:CatalogoComponent},
    {path: 'contacto', component:ContactoComponent},
    {path: 'login', component:LoginComponent},
    {path: 'proyecto',component:ProyectoComponent,canActivate:[SeguridadGuard]},
    {path: 'proyecto-lider',component:ProyectoLiderComponent,canActivate:[SeguridadGuard]},
    {path: 'coordinador',component:CoordinadorComponent,canActivate:[SeguridadGuard]},
    {path: 'admin',component:AdminComponent,children:[
      {path:'inicio', component:InicioComponent},
      {path:'proyectos', component:ProyectosComponent,children:[
        {path:'actuales',component:ProyectosActualesComponent},
        {path:'finalizados',component:ProyectosTerminadosComponent},
        {path:'',component:ProyectosActualesComponent}
      ]},
      {path:'usuarios', component:UsuariosComponent},
      {path:'calendario', component:CalendarioComponent},
      {path:'',component:InicioComponent}
      
    ]},
    {path: '**', pathMatch:'full', redirectTo:'/home'},

];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);


@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
