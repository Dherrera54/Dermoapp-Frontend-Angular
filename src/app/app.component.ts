import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dermoAppWeb';
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['es', 'en']);
    const lang =translate.getBrowserLang()
    translate.setDefaultLang('es');
    if (lang!=="es"&&lang!=="en"){
      translate.setDefaultLang('en');
    }
  }

}
