import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzI18nService, it_IT } from 'ng-zorro-antd/i18n';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(it_IT);
  }
  public title = 'PoC';
}
