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
        const userFromUrl = users.find(
            (user) => user.username === route.params['username']
        );

        return userService.getUser().subscribe((loggedUser) => {
            // // jak jest subject no to będzie null a user from url to undefined undefined // może inne porównanie daj
            // if (JSON.stringify(loggedUser) === JSON.stringify(userFromUrl[0])) {
            //     return true;
            // } else if (route.params['username'] === 'undefined') {
            //     console.log('XXXX');
            //     return false;
            // } else {
            //     router.navigate(['404']);
            //     return false;
            // }

            // // problem is that whenever loggeduser is null the it navigates
            // if (loggedUser === null) {
            //     console.log('USER NULL');
            //     router.navigate(['404']);
            //     return false;
            // } else if (
            //     JSON.stringify(userFromUrl) === JSON.stringify(loggedUser)
            // ) {
            //     console.log('FROM URL = LOGGED SUBJ');
            //     return true;
            // } else {
            //     console.log('DAMMMMMMMMMMMMMMMMMMMMMM');
            //     console.log(JSON.stringify(userFromUrl));
            //     console.log(JSON.stringify(loggedUser));
            //     console.log('OOOOOOOOOOOOOOOOOOOOOO');
            //     return false;
            // }

            if (JSON.stringify(userFromUrl) === JSON.stringify(loggedUser)) {
                return true;
            } else {
                router.navigate(['404']);
                return false;
            }
        });
    });
    // after authenticationGuard there was : CanActivateFn
};
