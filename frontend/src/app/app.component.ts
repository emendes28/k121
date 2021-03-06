import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private translate: TranslateService,
    private router: Router) {
    translate.setDefaultLang('en');
  }


  switchLanguage(language: string) {
    this.translate.use(language);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
