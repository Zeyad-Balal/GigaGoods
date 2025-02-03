import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  myHeaders: any = { token: localStorage.getItem('USER_TOKEN') };
  /**/
  addProductToCart(id: string): Observable<any> {
    let data = {
      productId: id,
    };
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, data, {
      headers: this.myHeaders,
    });
  }

  /**/
  getProductsFromCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: this.myHeaders,
    });
  }

  /* */

  removeProductFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: this.myHeaders,
    });
  }

  /**/

  updateCartProductQuantity(id: string , new_count:number): Observable<any> {
return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
  "count": new_count
} ,{ headers: this.myHeaders });
  }

clearCart(): Observable<any> {
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
    headers: this.myHeaders,
  });
}

}
