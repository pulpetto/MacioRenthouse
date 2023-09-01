import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
} from '@angular/fire/compat/database';
import { getDatabase, ref, set } from '@angular/fire/database';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // users: any[] = [];

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth,
        private router: Router
    ) {
        // this.angularFireDatabase
        //     .list('users')
        //     .valueChanges()
        //     .subscribe((usersArr) => {
        //         console.log(usersArr);
        //         this.users = usersArr;
        //     });
        // angularFireAuth.authState.subscribe((data) => {
        //     console.log(data);
        // });
    }

    getUsers(): Observable<any[]> {
        return this.angularFireDatabase.list('users').valueChanges();
    }

    login(username: string, email: string, password: string) {
        // should i do everything separetly or in .then() sequence
        // this.angularFireAuth.signInWithEmailAndPassword(email, password);

        // header is subscribed to subject which here gets changed to isuserlogged = true, then display user icon

        this.angularFireAuth.authState.subscribe((data) => {
            const routeUrl = `/account/${username}/${data?.uid}`;
            this.router.navigate([routeUrl]);
        });
    }

    signup(newUser: User) {
        // this.angularFireAuth.onAuthStateChanged((user) => {
        //     if (user) {
        //         console.log(true, 'ON AUTH STATE CHANGED');
        //     } else {
        //         console.log(false, 'ON AUTH STATE CHANGED');
        //     }
        // });

        console.log(this.angularFireAuth.user, 'FIREAUTH USER');
        console.log(this.angularFireAuth.currentUser);
        this.angularFireAuth.user.subscribe((user) => {
            console.log(user);
        });

        // this.angularFireAuth.authState.subscribe((data) => {
        //     if (data) {
        //         console.log(true, 'AUTH STATE');
        //     } else {
        //         console.log(false, 'AUTH STATE');
        //     }
        // });

        this.login(newUser.username, newUser.email, newUser.password);

        // this.angularFireAuth
        //     .createUserWithEmailAndPassword(newUser.email, newUser.password)
        //     .then(() => {
        //         set(
        //             ref(
        //                 this.angularFireDatabase.database,
        //                 'users/' + newUser.username
        //             ),
        //             newUser
        //         );
        //     })
        //     .then(() => {
        //         this.login(newUser.username, newUser.email, newUser.password);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }
}
