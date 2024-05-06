import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const loginService = inject(LoginService);

  return loginService.role().pipe(map((val) => {
    if (val == "admin") return true;
    else {
      router.navigate(['/home'])
      alert("You can't access this page")
      return false
    }
  }),
    catchError((error) => {
      console.log(error);
      router.navigate(['/home'])
      return of(false);
    }));

};
