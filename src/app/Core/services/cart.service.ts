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

  
}
