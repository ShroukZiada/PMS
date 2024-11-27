import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from 'src/app/common/services/token.service';
import { AuthService } from 'src/app/Features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _TokenService = inject(TokenService);
  const _Router = inject(Router)
  _TokenService.getRole()
  const role = _TokenService.roleUser;
  if (localStorage.getItem('token') !== null) {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false;
  }
};
