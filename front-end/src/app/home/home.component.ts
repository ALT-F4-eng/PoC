import { Component, OnInit } from '@angular/core';
import { NavigationService, NavLink } from '../navigation/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeData: any;
  handleError: any;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.setHeader();
  }

  setHeader(): void{
    const links:NavLink[] = [
      { path: '/test', label: 'Vai alla pagina del test' },
      { path: '/form', label: 'Vai alla pagina del form' },
      { path: '/list', label: 'Vai alla pagina della lista' },
    ];
    const pageName = "Home";
    this.navigationService.updateNavLinks(links, pageName);
  }
}
