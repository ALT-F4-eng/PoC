import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';
import { NavLink } from '../navigation/navigation.service'; // Assicurati di importare l'interfaccia

@Component({
  selector: 'app-header', // Deve corrispondere al tag usato in app.component.html
  imports:[CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public navLinks: NavLink[] = [];
  public pageName: string = "Home";

  constructor(private navigationService: NavigationService) {}

  ngOnInit() {
    // Sottoscriviti agli aggiornamenti dei link
    this.navigationService.navLinks$.subscribe(item => {
      this.navLinks = item.links;
      this.pageName = item.name;
    });
  }
}