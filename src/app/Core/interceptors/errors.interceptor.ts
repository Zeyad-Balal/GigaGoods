import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _ToastrService = inject(ToastrService);

  //request logic
  return next(req).pipe(catchError((error) => {
    
   console.log('interceptor',error.error.message); 

   /*alert USE TOASTER*/
  _ToastrService.error(error.error.message , 'Error');
  
  return throwError(() => error); })) // response logic
};
