import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
    // check if user exists
    // check if user is authenticated

    const userService = inject(UserService);
    // if (userService.users) {
    // }

    console.log(route);
    console.log(state);

    return true;
};
