import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleEnum } from 'src/app/common/Enums/RoleEnum..enum';
import { TokenService } from 'src/app/common/services/token.service';


export const employeeGuard: CanActivateFn = (route, state) => {
  const _TokenService = inject(TokenService);
  const _Router = inject(Router);
  const role = _TokenService.roleUser;

  if (localStorage.getItem('token') !== null && role == RoleEnum.EMPLOYEE) {
    return true;
  } else {
    _Router.navigate(['/auth']);
    return false;
  }

}
