import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Interf{
  links:NavLink[],
  name:string
}

export interface NavLink {
  path: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  private navLinksSource = new BehaviorSubject<Interf>({links:[], name:"Home"});

  navLinks$ = this.navLinksSource.asObservable();

  updateNavLinks(newLinks: NavLink[], pageName: string) {
    this.navLinksSource.next({links:newLinks, name:pageName});
  }
}
