import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  //request logic


  if (localStorage.getItem('USER_TOKEN') !== null) {
    
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) { /* make sure that the url in erq need the header */
      /*modify request to send header*/
      req = req.clone({ // clone the request => to get a copy from request
        setHeaders: { token: localStorage.getItem('USER_TOKEN')! }
      })
    }
  }

  return next(req); // response logic
};
