import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const userExistsGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    const routeUsername = route.params['username'];

    return userService.getUserByUsername(routeUsername).pipe(
        map((user) => {
            console.log(user);
            if (user === null) {
                console.log('qqq');
                return router.parseUrl('/404');
            } else {
                console.log('fr');
                return true;
            }
        })
    );
};
