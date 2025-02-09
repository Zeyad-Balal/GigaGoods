import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../Core/services/auth-service.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../Core/services/my-translate.service';
import { CartService } from '../../Core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthServiceService);
  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);
  readonly _CartService = inject(CartService);

  cartNumber: number = 0;

  changLanguage(lang: string): void {

    this._MyTranslateService.changeLang(lang);
  }
  ngOnInit(): void {

this._CartService.getProductsFromCart().subscribe({
  next: (res) => {
   this._CartService.cartCounter.next(res.numOfCartItems)
  },
})

    this._CartService.cartCounter.subscribe({
      next: (data) => { // data carry data from behav sub.
        this.cartNumber = data;
      },
    })


  }
}
