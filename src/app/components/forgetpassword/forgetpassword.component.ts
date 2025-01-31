import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServiceService } from '../../Core/services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent implements OnDestroy {
  step: number = 1;
  isLoad: boolean = false;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthServiceService);
  private readonly _Router = inject(Router);

  /* unsubscribe variables*/
  verifyEmailSubscribe!: Subscription;
  verifyCodeSubscribe!: Subscription;
  resetPasswordSubscribe!: Subscription;

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required]],
  });

  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]], //this.verifyEmail.value.email
    newPassword: [null, [Validators.required]],
  });

  verifyEmailSubmit(): void {
    //get email from verifyEmail form to pass to resetPassword form
    let email_value = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(email_value);
    //////////////////////////////////////////////////////////
    if (this.verifyEmail.valid) {
      this.isLoad = true;
      this.verifyEmailSubscribe = this._AuthService
        .setEmailVerify(this.verifyEmail.value)
        .subscribe({
          next: (res) => {
            if (res.statusMsg == 'success') {
              this.step++;
              this.isLoad = false;
            }
          },
        });
    }
  }

  verifyCodeSubmit(): void {
    if (this.verifyCode.valid) {
      this.isLoad = true;
      this.verifyCodeSubscribe = this._AuthService
        .setCodeVerify(this.verifyCode.value)
        .subscribe({
          next: (res) => {
            if (res.status == 'Success') {
              this.step++;
              this.isLoad = false;
            }
          },
        });
    }
  }

  resetPasswordSubmit(): void {
    if (this.resetPassword.valid) {
      this.isLoad = true;
      this.resetPasswordSubscribe = this._AuthService
        .setResetPassword(this.resetPassword.value)
        .subscribe({
          next: (res) => {
            localStorage.setItem('USER_TOKEN', res.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['home']);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.verifyEmailSubscribe?.unsubscribe();
    this.verifyCodeSubscribe?.unsubscribe();
    this.resetPasswordSubscribe?.unsubscribe();
  }
}
