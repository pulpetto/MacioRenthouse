import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authenticationGuard = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUsers().subscribe((users) => {
        const userFromUrl = users.filter(
            (user) => user.username === route.params['username']
        );

        return userService.getUser().subscribe((loggedUser) => {
            if (JSON.stringify(loggedUser) === JSON.stringify(userFromUrl[0])) {
                return true;
            } else {
                router.navigate(['404']);
                return false;
            }
        });
    });
    // after authenticationGuard there was : CanActivateFn
};
