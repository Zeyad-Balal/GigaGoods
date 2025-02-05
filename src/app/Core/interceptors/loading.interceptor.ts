import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const _NgxSpinnerService = inject(NgxSpinnerService);

  // with each request show loading spinner
  if(req.url.includes('cart')){_NgxSpinnerService.show('custom-spinner1');}

  else _NgxSpinnerService.show('loading1');
  


  // finalizing the request => finilize work after next or error, end of response
  return next(req).pipe(finalize(() =>{ 
    _NgxSpinnerService.hide('custom-spinner1'),
    _NgxSpinnerService.hide('loading1');
  }
    
)); // with response hide loading spinner
};
