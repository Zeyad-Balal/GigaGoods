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
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  readonly _CartService = inject(CartService);

  cartSubscribe!: Subscription;
  cartProducts: ICart | null = null; // to avoid reload HTML before data loaded
  //
  ngOnInit(): void {
    this.cartSubscribe = this._CartService.getProductsFromCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProduct(id: string) {
    this._CartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = res.data; // to re-load the new set of products in cart view (override on cart data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateQuantity(id: string , new_count:number) {
    if(new_count > 0) {
    this._CartService.updateCartProductQuantity(id , new_count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = res.data; // to re-load the new set of products in cart view (override on cart data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  }

  clearAllCart(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if(res.message == 'success') {
        //this.cartProducts = res.data; // to re-load the new set of products in cart view (override on cart data)
        this.cartProducts = null;
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  ngOnDestroy(): void {
    this.cartSubscribe?.unsubscribe();
  }
}
