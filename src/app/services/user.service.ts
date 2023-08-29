import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
    users: any[] = [];

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth
    ) {
        this.angularFireDatabase
            .list('users')
            .valueChanges()
            .subscribe((usersArr) => {
                console.log(usersArr);
                this.users = usersArr;
            });
    }

    login(username: string, email: string, password: string) {
        // this.angularFireAuth.signInWithEmailAndPassword(email, password);
        this.angularFireAuth.authState.subscribe((data) => {
            const routeUrl = `/account/${username}/${data?.uid}`;
            console.log(routeUrl);
        });
    }

    signup(newUser: User) {
        this.angularFireAuth
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(() => {
                set(
                    ref(
                        this.angularFireDatabase.database,
                        'users/' + newUser.username
                    ),
                    newUser
                );

                // signin user with singinwithemailandpasssword
                // navigate to user dashboard with protected route using userid
                //

                this.angularFireAuth.authState.subscribe((data) => {
                    console.log(data);
                });

                this.angularFireAuth.idToken.subscribe((data) => {
                    console.log(data);
                });

                this.angularFireAuth.idTokenResult.subscribe((data) => {
                    console.log(data);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
