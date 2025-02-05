import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _TranslateService
    = inject(TranslateService);

  constructor() {

    /* WORDS TRANSLATION LOGIC */
    //1. get the current language from local storage
    let local_storae_language = localStorage.getItem('lang');

    //2. set default language
    this._TranslateService.setDefaultLang('en');


    //3. get the current language from local storage
    this._TranslateService.use(local_storae_language!);

    /* DIRECT TRANSLATION LOGIC */
    this.changeDirection();
  }

  //change the language function
  changeLang(lang:string):void{
    localStorage.setItem('lang', lang);
    this._TranslateService.use(lang);
    this.changeDirection();
  } 


  changeDirection():void{
    let local_storae_language = localStorage.getItem('lang');

    if (local_storae_language === 'en') { //dir ltr

      document.documentElement.dir = 'ltr';

    }

    else if(local_storae_language === 'ar') { //dir rtl
      document.documentElement.dir = 'rtl';

    }
  }
}
