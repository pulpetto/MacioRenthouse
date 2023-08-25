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

    login() {}

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
            })
            .catch((error) => {
                console.error(error);
            });

        // set(
        //     ref(this.angularFireDatabase.database, 'users/' + newUser.username),
        //     newUser
        // );
    }
}
