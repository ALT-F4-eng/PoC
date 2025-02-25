import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NavigationService, NavLink } from '../navigation/navigation.service';
import { FormComponent } from '../form/form.component';

interface QA {
  domanda: string;
  rispostaAttesa: string;
}

@Component({
  selector: "app-lista",
  imports: [CommonModule,FormComponent,ReactiveFormsModule,NzButtonModule,NzModalModule,NzPaginationModule],//,FormComponent
  templateUrl: "./lista.component.html",
  styleUrl: "./lista.component.css",
})

export class ListaComponent {

  public loading = true;
  qaList: QA[] = [];
  paginatedQaList: QA[] = [];
  pageSize: number = 5;//
  currentPage: number = 1;

  size: NzButtonSize = 'large';

  constructor(private http: HttpClient,private modal: NzModalService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.setHeader();
    this.loadJsonData();
  }

  setHeader(): void{
    const links:NavLink[] = [
      { path: '/', label: 'Vai alla pagina del home' },
      { path: '/test', label: 'Vai alla pagina del test' },
    ];
    const pageName = "Lista";
    this.navigationService.updateNavLinks(links, pageName);
  }

  addQA(newQA: { domanda: string; risposta: string }) {
    this.qaList.push({
      domanda: newQA.domanda,
      rispostaAttesa: newQA.risposta
    });
    this.updatePaginatedList();
  }

  editQA(index: number) {
    const globalIndex = (this.currentPage - 1) * this.pageSize + index;
    const updatedQuestion = prompt("Modifica la domanda:", this.qaList[globalIndex].domanda);
    const updatedAnswer = prompt("Modifica la risposta attesa:", this.qaList[globalIndex].rispostaAttesa);
  
    if (updatedQuestion && updatedAnswer && (updatedQuestion != this.qaList[globalIndex].domanda || updatedAnswer != this.qaList[globalIndex].rispostaAttesa) ) {
      this.loading = true;
      const updatedData = {
        id: globalIndex,
        new_question: updatedQuestion,
        new_answer: updatedAnswer
      };
  
      this.http.post('http://127.0.0.1:5000/list/modify_item', updatedData).subscribe({
        next: (response) => {
          console.log('Domanda modificata con successo:', response);
          this.qaList[globalIndex] = {
            domanda: updatedQuestion,
            rispostaAttesa: updatedAnswer
          };
          this.updatePaginatedList();
        },
        error: (error) => {
          console.error('Error on modify:', error);
        },
        complete:() => {
          this.loading = false;
        }
      });
    }
  }

  deleteQA(pageIndex: number) {
    const globalIndex = (this.currentPage - 1) * this.pageSize + pageIndex;


    this.modal.confirm({
      nzTitle: 'Sei sicuro di cancellare la domanda e la risposta?',
      nzOkText: 'Sì',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.loading = true;
        this.http.get(`http://127.0.0.1:5000/list/delete_item?id=${globalIndex}`).subscribe({
          next: (response) => {
            console.log('Domanda eliminata con successo:', response);
            this.qaList.splice(globalIndex, 1);
            this.updatePaginatedList();
          },
          error: (error) => {
            console.error('Error on deleting.:', error);
          },
          complete:() => {
            this.loading = false;
          }
        });
      }
    });
  }

  loadJsonData() {
    this.loading = true;
    this.http.get<any[]>('http://127.0.0.1:5000/dataset/load')
      .pipe(
        catchError(error => {
          //console.error('Error loading JSON:', error);
          return of([]); 
        })
      )
      .subscribe({
        next:(data) => {
        this.qaList = data;
        //console.log('Loaded QA List da load json:', this.qaList);
        this.updatePaginatedList();
      },
      error: (error) => {
        console.error('Error on loading dataset:', error);
      },
      complete:() => {
        this.loading = false;
      }
    });
  }

  updatePaginatedList() {
    //console.log('Loaded currentPage:', this.currentPage);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    //console.log('Loaded startIndex:', startIndex);
    const endIndex = startIndex + this.pageSize;
    //console.log('Loaded endIndex:', endIndex);
    this.paginatedQaList = this.qaList.slice(startIndex, endIndex);
    //console.log('Loaded qaList:', this.qaList);
    //console.log('Loaded paginatedQaList List:', this.paginatedQaList);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    //console.log('Loaded page:', page);
    this.updatePaginatedList();
  }

  onQaSubmitted(data: { domanda: string; risposta: string }): void {   
    this.qaList.push({
      domanda: data.domanda,
      rispostaAttesa: data.risposta
    });
    this.updatePaginatedList();
  }

  setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
