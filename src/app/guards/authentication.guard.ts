import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);

    // check if user is authenticated -- if user with username from route and uid from route is authenticated then allow
    // check if user with given username and uid exists in database and if he is currently logged in
    // how to check is given user is logged in || check via username or find user with this username and check via user{}
    // if access denied redirect to 404 same as if user didnt exist
    console.log(route.params['username']);
    console.log(route.params['userId']);

    // check if user exists in database
    if (
        userService.users.some((user) => {
            return user.username === route.params['username'];
        })
    ) {
        return true;
    } else {
        router.navigate(['usernotfound404']);
        return false;
    }
};
