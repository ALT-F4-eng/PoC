import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzI18nService, it_IT } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(it_IT);
  }
  public title = 'PoC';
}
