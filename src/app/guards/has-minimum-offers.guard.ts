import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const hasMinimumOffersGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    const routeUsername = route.params['username'];

    return userService.getOffersAmount(routeUsername).pipe(
        map((offersAmount) => {
            if (offersAmount && offersAmount > 5) {
                return true;
            } else {
                return router.parseUrl('/404');
            }
        })
    );
};
