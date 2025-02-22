import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ListaComponent } from './lista/lista.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      AppComponent,
      FormComponent
      ListaComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,  
      NzFormModule,
      ReactiveFormsModule       
    ],
    providers: [],
    bootstrap: [FormComponent, ListaComponent]
  })
  export class AppModule { }