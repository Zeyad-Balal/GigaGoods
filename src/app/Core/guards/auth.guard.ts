import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Global Object Browser (localStorage , window , document)
  /*check on type of global object => != undefined (on browser) */
  /*if(typeof localStorage !== 'undefined'){}*/
  const _Router = inject(Router);
  const _PLATFORM_ID = inject(PLATFORM_ID);
  

  /*check on platform  =>isPlatFormBroswer / isPlatFormServer (on browser => true \ on server => true)*/
  if(isPlatformBrowser(_PLATFORM_ID)){
if(localStorage.getItem('USER_TOKEN') !== null){
  return true;
 }
 else{ 
   // if user not logged in navigate to login page #ROUTER Service
   _Router.navigate(['/login']);
   // return false to prevent user from accessing the page
   return false; 
 }

  
  }

  else{
    return false;
  } 
};
