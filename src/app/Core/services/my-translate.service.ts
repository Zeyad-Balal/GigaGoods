import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _TranslateService
    = inject(TranslateService);

  private readonly _PLATFORM_ID
    = inject(PLATFORM_ID);

  private readonly _Renderer2
    = inject(RendererFactory2).createRenderer(null, null);
  constructor() {

    if (isPlatformBrowser(this._PLATFORM_ID)) {
      /* WORDS TRANSLATION LOGIC */
      //1. get the current language from local storage
      //let local_storae_language = localStorage.getItem('lang');

      //2. set default language
      this._TranslateService.setDefaultLang('en');

      /* DIRECT TRANSLATION LOGIC */
      this.setLang();
      
    }
  }

  //change the language function
  changeLang(lang: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {

      localStorage.setItem('lang', lang);
      this.setLang();
      
    }
  }


  setLang(): void {
    let local_storae_language = localStorage.getItem('lang');

    if (local_storae_language !== null) {
      //3. get the current language from local storage
      this._TranslateService.use(local_storae_language!);
    }

    if (local_storae_language === 'en') { //dir ltr

      //document.documentElement.dir = 'ltr';
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');



    }

    else if (local_storae_language === 'ar') { //dir rtl
      //document.documentElement.dir = 'rtl';
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');



    }
  }
}
