import { Component, EventEmitter, Output } from '@angular/core';
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
 
  @Output() qaSubmitted = new EventEmitter<{ domanda: string; risposta: string }>();

  form = new FormGroup({
    domanda: new FormControl(''),
    risposta: new FormControl(''),
  });
  

  //qui c'è la domanda e la risposta del form
  submitForm(): void {
    if (this.form.valid) {
      this.qaSubmitted.emit({
        domanda: this.form.value.domanda ?? '',
        risposta: this.form.value.risposta ?? ''
      });
      this.form.reset();
    }
  }
}
