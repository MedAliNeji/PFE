import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { LoginService } from '../services/login.service';

export const encadreurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginService = inject(LoginService);

  return loginService.role().pipe( map((val)=>{
    if(val == "encadreur") return true;
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
  }));};
