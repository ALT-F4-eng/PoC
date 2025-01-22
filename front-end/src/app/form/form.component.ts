import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent{
 
  form = new FormGroup({
    domanda: new FormControl(''),
    risposta: new FormControl(''),
  });
  

  //qui c'è la domanda e la risposta del form
  submitForm(): void {
    console.log('submit', this.form.value);
  }


}
