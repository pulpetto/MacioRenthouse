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
            return true;
        } else {
            router.navigate(['usernotfound404']);
            return false;
        }
    });
    // if user with username from route and uid from route is authenticated (currently logged in) then allow
    // how to check is given user is logged in || check via username or find user with this username and check via user{}
    // in USER SERVICE make an observable or subject which will get user credentials assigned to it when someone logs in
    // compare it with the credentials from route and if they match then allow
    // after authenticationGuard there was : CanActivateFn
};
