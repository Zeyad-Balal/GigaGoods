import {HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component,inject  } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  msgError: string = "";
  isLoad: boolean = false;

  constructor(private _AuthService: AuthServiceService) { }
 
  registerForm = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10)]),
  });

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoad = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoad = false;

        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoad = false;
        }
      })
    }
  }


/*confirm pass*/
/*confrimPassword(g : AbstractControl): {
  if(g.get('password')?.value === g.get('rePassword')?.value){
    return null;
  }
  else{
    return {passwordNotMatch : true}
  }
}
*/


}




