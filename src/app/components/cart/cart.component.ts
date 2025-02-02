import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../../Core/interfaces/icart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy{
private readonly _CartService = inject(CartService);

cartSubscribe!:Subscription;
cartProducts:ICart | null = null; // to avoid reload HTML before data loaded
//
ngOnInit(): void {
    this.cartSubscribe = this._CartService.getProductsFromCart().subscribe({
      next:(res) =>{
       this.cartProducts = res.data;
      },
      error:(err) =>{
        console.log(err);
      }
    })
}

ngOnDestroy(): void {
    this.cartSubscribe?.unsubscribe();
}

}
