import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgClass,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  msgError: string = '';
  isLoad: boolean = false;

  constructor(
    private _AuthService: AuthServiceService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}
  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{3,}$/)]],
      rePassword: [null],
      //phone: [[Validators.required, Validators.pattern(/^01[125][0-9]{8}$/)]],
    },
    { validators: [this.confirmPassword] }
  );

  /*confirm pass*/
  confirmPassword(g: AbstractControl) {
    let password = g.get('password')?.value;
    let rePassword = g.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoad = true;
      this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this._Router.navigate(['/login']);
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
      //  this.registerForm.setErrors({{ mismatch: true }});
      this.registerForm.markAllAsTouched();
    }
  }
}
