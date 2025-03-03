import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavigationService, NavLink } from '../navigation/navigation.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule],//
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent{

  @Output() qaSubmitted = new EventEmitter<{ domanda: string; risposta: string }>();
  @Output() loadingChange = new EventEmitter<boolean>();

  form = new FormGroup({
    domanda: new FormControl(''),
    risposta: new FormControl(''),
  });

  loading = false;
  
  constructor(private http: HttpClient, private navigationService: NavigationService) {}  

  submitForm(): void {
    if (this.form.valid) {
      const formData = {
        domanda: this.form.value.domanda ?? '',
        risposta: this.form.value.risposta ?? ''
      };
      this.loadingChange.emit(true);
      this.http.post('http://localhost:5000/form/save', formData).subscribe({
        next: (response) => {
          console.log('Dati salvati con successo:', response);
          this.qaSubmitted.emit(formData);
          this.form.reset();
        },
        error: (error) => {
          console.error('Errore nell’invio:', error);
        },
        complete: () => {
          this.loadingChange.emit(false);
        }
      });
    }
  }
}
