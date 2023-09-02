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
        if (
            users.some((user) => {
                return user.username === route.params['username'];
            })
        ) {
            const userFromUrl = users.filter(
                (user) => user.username === route.params['username']
            );

            return userService.getUser().subscribe((loggedUser) => {
                if (
                    JSON.stringify(loggedUser) ===
                    JSON.stringify(userFromUrl[0])
                ) {
                    return true;
                } else {
                    router.navigate(['usernotauthenticated404']);
                    return false;
                }
            });
        } else {
            router.navigate(['usernotfound404']);
            return false;
        }
    });

    // after authenticationGuard there was : CanActivateFn
};
