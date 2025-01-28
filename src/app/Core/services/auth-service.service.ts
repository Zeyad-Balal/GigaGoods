import { HttpClient } from '@angular/common/http';
import { Injectable ,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/env';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private _HttpClient: HttpClient) { }
 
  userData:any = null;
  //register auth API
  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  //login auth API
  setLoginForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }

  //get user data (TOKEN DECODED) 
  saveUserData():void{
    //check if token exist
    if(localStorage.getItem('USER_TOKEN') !== null){
     this.userData = jwtDecode(localStorage.getItem('USER_TOKEN')!); // ! to ignore null
    }
     /*test log user data */
    //console.log('user info' , this.userData); 
  }

}
