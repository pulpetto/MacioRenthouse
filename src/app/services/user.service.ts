import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
} from '@angular/fire/compat/database';
import { ref, set } from '@angular/fire/database';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth
    ) {}

    login() {}

    signup(newUser: User) {
        set(
            ref(this.angularFireDatabase.database, 'users/' + newUser.username),
            newUser
        );
    }
}
