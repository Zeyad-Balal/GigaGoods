import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../Core/services/auth-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../Core/services/my-translate.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent {
 readonly _AuthService = inject(AuthServiceService);
 private readonly _MyTranslateService = inject(MyTranslateService);
 readonly _TranslateService = inject(TranslateService);


 changLanguage(lang:string):void{

  this._MyTranslateService.changeLang(lang);
 }


}

