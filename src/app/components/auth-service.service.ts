import { HttpClient } from '@angular/common/http';
import { Injectable ,inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient: HttpClient) { }
 
  setRegisterForm(data:object){
    return this._HttpClient.post('http://ecommerce.routemisr.com/api/v1/auth/signup', data)
  }
}
