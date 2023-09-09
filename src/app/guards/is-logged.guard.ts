import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const isLoggedGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);

    return userService.isLoggedIn().pipe(
        map((isLoggedIn) => {
            if (isLoggedIn) {
                userService.navigateToDashboard();
                return false;
            } else {
                return true;
            }
        })
    );
};
