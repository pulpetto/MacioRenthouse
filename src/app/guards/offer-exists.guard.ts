import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const offerExistsGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    const routeOfferId = route.params['id'];

    return userService.getOfferById(routeOfferId).pipe(
        map((offer) => {
            if (offer === null) {
                return router.parseUrl('/404');
            } else {
                return true;
            }
        })
    );
};
