import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../Core/services/auth-service.service';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, HttpClientModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  msgError: string = '';
  isLoad: boolean = false;
  loginSubscribe!: Subscription;

  constructor(
    private _AuthService: AuthServiceService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}
  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{3,}$/)]],
  });

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoad = true;
      this.loginSubscribe = this._AuthService
        .setLoginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message == 'success') {
              // - SAVE TOKEN IN LOCAL STORAGE
              localStorage.setItem('USER_TOKEN', res.token);

              // decode token
              this._AuthService.saveUserData();

              // if user validate data navigate to home page
              this._Router.navigate(['/home']);
            }
            this.isLoad = false;
          },
          error: (err: HttpErrorResponse) => {
            this.msgError = err.error.message;
            console.log(err);
            this.isLoad = false;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.loginSubscribe?.unsubscribe(); /* ? to check if the observable is null or not*/
  }
}
