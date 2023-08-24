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
    $users!: Observable<any[]>;
    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth
    ) {}

    login() {}

    signup(newUser: User) {
        this.$users = this.angularFireDatabase.list('users').valueChanges();
        this.$users.subscribe((usersArr) => {
            console.log(usersArr);
        });

        // set(
        //     ref(this.angularFireDatabase.database, 'users/' + newUser.username),
        //     newUser
        // );
    }
}
