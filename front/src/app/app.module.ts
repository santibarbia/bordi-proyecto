import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe, HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './src/app/components/home/home.component';
import { CatalogoComponent } from './src/app/components/catalogo/catalogo.component';
import { ContactoComponent } from './src/app/components/contacto/contacto.component';
import { ProyectoComponent } from './src/app/components/proyecto/proyecto.component';
import { CoordinadorComponent } from './src/app/components/coordinador/coordinador.component';
import { AdminComponent } from './src/app/components/admin/admin.component';
import { LoginComponent } from './src/app/components/login/login.component';
import { NavbarComponent } from './src/app/components/navbar/navbar.component';
import { GlobalesService } from './src/app/components/servicios/globales.service';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';

import { APP_ROUTING } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './src/app/components/admin/inicio/inicio.component';
import { ProyectosComponent } from './src/app/components/admin/proyectos/proyectos.component';
import { CalendarioComponent } from './src/app/components/admin/calendario/calendario.component';
import { UsuariosComponent } from './src/app/components/admin/usuarios/usuarios.component';
import { SidebarComponent } from './src/app/components/admin/sidebar/sidebar.component';
import { ProyectosActualesComponent } from './src/app/components/admin/proyectos/proyectos-actuales.component';
import { ProyectosTerminadosComponent } from './src/app/components/admin/proyectos/proyectos-terminados.component';
import { ProyectoLiderComponent } from './src/app/components/proyecto/proyecto-lider/proyecto-lider.component';
import { GestProyectosComponent } from './src/app/components/admin/popUps/gest-proyectos/gest-proyectos.component';
import { GestUsuariosComponent } from './src/app/components/admin/popUps/gest-usuarios/gest-usuarios.component';
import { TokenInterceptorService } from './src/app/components/servicios/token-interceptor.service';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogoComponent,
    ContactoComponent,
    ProyectoComponent,
    CoordinadorComponent,
    AdminComponent,
    LoginComponent,
    NavbarComponent,
    InicioComponent,
    ProyectosComponent,
    CalendarioComponent,
    UsuariosComponent,
    SidebarComponent,
    ProyectosActualesComponent,
    ProyectosTerminadosComponent,
    ProyectoLiderComponent,
    GestProyectosComponent,
    GestUsuariosComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
    
  ],
  providers: [
    GlobalesService,
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptorService,
     multi: true},
     DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
