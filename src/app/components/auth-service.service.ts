import { HttpClient } from '@angular/common/http';
import { Injectable ,inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient: HttpClient) { }
 
  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
  }
}
