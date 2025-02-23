import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ListaComponent } from './lista/lista.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      FormComponent,
      ListaComponent,
      HeaderComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,  
      NzFormModule,
      ReactiveFormsModule,
      RouterModule.forRoot([])
    ],
    
    bootstrap: [AppComponent]//FormComponent, ListaComponent, 
  })
  export class AppModule { }