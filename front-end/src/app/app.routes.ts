import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './chartstest/test.component';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'form', component: FormComponent},
  { path: 'list', component: ListaComponent }
];