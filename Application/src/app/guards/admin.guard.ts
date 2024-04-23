import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginService = inject(LoginService);

  return loginService.role().pipe( map((val)=>{
    if(val == "admin") return true;
    else{
      router.navigate(['/accueil'])
      alert("Vous n'avez pas les droits pour accéder à cette page")
      return false
    }
  }),
  catchError((error)=>{
    console.log(error);    
    router.navigate(['/accueil'])
    return of(false);    
  }));

};
