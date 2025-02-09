import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  cartCounter:WritableSignal<number> = signal(0);
 
  /**/
  addProductToCart(id: string): Observable<any> {
    let data = {
      productId: id,
    };
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, data);
  }

  /**/
  getProductsFromCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  /* */

  removeProductFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  /**/

  updateCartProductQuantity(id: string , new_count:number): Observable<any> {
return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
  "count": new_count
} );
  }

clearCart(): Observable<any> {
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
}

}
