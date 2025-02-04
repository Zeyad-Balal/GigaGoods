import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient) { }


  

  /*payment using strip*/
  checkout(cartId: string | null , shippingDetails:object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.urlServer}`,
      {
        "shippingAddress": shippingDetails
      }
      );
  }
}
