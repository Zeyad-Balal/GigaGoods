import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
    const _Router = inject(Router);
  

    // opposite of authGuard process
   if(localStorage.getItem('USER_TOKEN') !== null){
      // if user logged in navigate to home page #ROUTER Service
    _Router.navigate(['/home']);
      // return false to prevent user from accessing the login page
     return false;
    }
    else{ 
      return true; 
    }
  };
  

