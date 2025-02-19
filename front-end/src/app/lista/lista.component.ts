import { Component } from "@angular/core";
import { CommonModule } from '@angular/common'; 
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormComponent } from "../form/form.component";

interface QA {
  domanda: string;
  rispostaAttesa: string;
}

@Component({
  selector: "app-lista",
  imports: [CommonModule,NzButtonModule,NzModalModule,NzPaginationModule,FormComponent],
  templateUrl: "./lista.component.html",
  styleUrl: "./lista.component.css",
})

export class ListaComponent {
  qaList: QA[] = [];
  paginatedQaList: QA[] = []; // Elementi della pagina corrente
  pageSize: number = 5; // Numero di elementi per pagina
  currentPage: number = 1; // Pagina corrente

  size: NzButtonSize = 'large';

  constructor(private http: HttpClient,private modal: NzModalService) {
   this.loadJsonData();
  }

  addQA(newQA: { domanda: string; risposta: string }) {
    this.qaList.push({
      domanda: newQA.domanda,
      rispostaAttesa: newQA.risposta
    });
    this.updatePaginatedList();
  }

  editQA(index: number) {
    const updatedQuestion = prompt(
      "Modifica la domanda:",
      this.qaList[index].domanda
    );
    const updatedAnswer = prompt(
      "Modifica la risposta attesa:",
      this.qaList[index].rispostaAttesa
    );

    if (updatedQuestion && updatedAnswer) {
      this.qaList[index] = {
        domanda: updatedQuestion,
        rispostaAttesa: updatedAnswer,
      };
      this.updatePaginatedList();
    }
  }

  deleteQA(pageIndex: number) {
    const globalIndex = (this.currentPage - 1) * this.pageSize + pageIndex;
    this.modal.confirm({
      nzTitle: 'Sei sicuro di cancellare la domanda e la risposta',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.qaList.splice(globalIndex, 1);
        this.updatePaginatedList();
      }
    });
  }

  loadJsonData() {
    this.http.get<any[]>('/dataset.json')
      .pipe(
        catchError(error => {
          //console.error('Error loading JSON:', error);
          return of([]); 
        })
      )
      .subscribe(data => {
        this.qaList = data;
        //console.log('Loaded QA List da load json:', this.qaList);
        this.updatePaginatedList();
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
  
}
