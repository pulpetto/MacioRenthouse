import { CanActivateChildFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUser().pipe(
        map((user) => {
            if (
                user &&
                user?.username === childRoute.parent?.params['username']
            ) {
                return true;
            } else {
                return router.parseUrl('/home');
            }
        })
    );
};
