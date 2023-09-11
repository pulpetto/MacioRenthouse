import { CanActivateChildFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUser().pipe(
        map((user) => {
            console.log(user?.username, 'FROM GETUSER', true);
            console.log(childRoute.params['username'], 'FROM URL', true);
            console.log(childRoute);

            if (user && user?.username === childRoute.params['username']) {
                return true;
            } else {
                return true;
                // return router.parseUrl('/404');
            }
        })
    );
};

// import {
//     ActivatedRouteSnapshot,
//     CanActivateFn,
//     Router,
//     RouterStateSnapshot,
// } from '@angular/router';
// import { UserService } from '../services/user.service';
// import { inject } from '@angular/core';
// import { map } from 'rxjs';

// export const authenticationGuard: CanActivateFn = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
// ) => {
//     const userService = inject(UserService);
//     const router = inject(Router);

//     // return userService.getUsers().subscribe((users) => {
//     //     const userFromUrl = users.find(
//     //         (user) => user.username === route.params['username']
//     //     );

//     //     return userService.getUser().subscribe((loggedUser) => {
//     //         // // jak jest subject no to będzie null a user from url to undefined undefined // może inne porównanie daj
//     //         // if (JSON.stringify(loggedUser) === JSON.stringify(userFromUrl[0])) {
//     //         //     return true;
//     //         // } else if (route.params['username'] === 'undefined') {
//     //         //     console.log('XXXX');
//     //         //     return false;
//     //         // } else {
//     //         //     router.navigate(['404']);
//     //         //     return false;
//     //         // }

//     //         // // problem is that whenever loggeduser is null the it navigates
//     //         // if (loggedUser === null) {
//     //         //     console.log('USER NULL');
//     //         //     router.navigate(['404']);
//     //         //     return false;
//     //         // } else if (
//     //         //     JSON.stringify(userFromUrl) === JSON.stringify(loggedUser)
//     //         // ) {
//     //         //     console.log('FROM URL = LOGGED SUBJ');
//     //         //     return true;
//     //         // } else {
//     //         //     console.log('DAMMMMMMMMMMMMMMMMMMMMMM');
//     //         //     console.log(JSON.stringify(userFromUrl));
//     //         //     console.log(JSON.stringify(loggedUser));
//     //         //     console.log('OOOOOOOOOOOOOOOOOOOOOO');
//     //         //     return false;
//     //         // }

//     //         if (JSON.stringify(userFromUrl) === JSON.stringify(loggedUser)) {
//     //             return true;
//     //         } else {
//     //             router.navigate(['404']);
//     //             return false;
//     //         }
//     //     });
//     // });

//     return userService.getUser().pipe(
//         map((user) => {
//             // const userFromUrl = users.find(
//             //     (user) => user.username === route.params['username']
//             // );

//             // const loggedUser = userService.getUser();

//             // const storedUser = localStorage.getItem('loggedUser');
//             // if (storedUser) {
//             //     const USRX = JSON.parse(storedUser);
//             //     console.log(USRX);
//             //     console.log(userFromUrl);
//             //     console.log(loggedUser);
//             //     console.log(JSON.stringify(userFromUrl));
//             // }

//             if (user === null && state.url === '/home') {
//                 console.log('NEW CONDITIOAN');
//                 return true;
//             } else if (user && user?.username === route.params['username']) {
//                 return true;
//             } else {
//                 return router.parseUrl('/404');
//             }
//         })
//     );

//     // json stringify for objects
//     // after authenticationGuard there was : CanActivateFn
// };

// // WHY THE GUARD WAS STILL WORKING EVEN WHEN BEING IN THE HOME COMPONENT
