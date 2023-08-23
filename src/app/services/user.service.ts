import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
} from '@angular/fire/compat/database';
import { getDatabase, ref, set } from '@angular/fire/database';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // DBO is database object
    usersDBO!: AngularFireObject<any>;
    usersDBL!: AngularFireList<any>;
    private users: User[] = [];

    constructor(
        private angularFireAuth: AngularFireAuth,
        private angularFireDatabase: AngularFireDatabase
    ) {
        const localStoredUsers = localStorage.getItem('users');
        this.users = localStoredUsers ? JSON.parse(localStoredUsers) : [];
    }

    addUser(user: User) {
        this.users.push(user);
        this.updateLocalStorage();
    }

    getUsers() {
        return [...this.users];
    }

    private updateLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    login() {
        console.log('logged in');
    }

    signup(newUser: User) {
        // console.log('-----signed in-------');
        // // const XXXXXX = this.angularFireDatabase.object('users');
        // // XXXXXX.set({ user: 'macio' });
        // // console.log(XXXXXX);
        // this.usersDBO = this.angularFireDatabase.object('users');
        // console.log(this.usersDBO);

        // this.usersDBL = this.angularFireDatabase.list('users');
        // console.log(this.usersDBL);
        // // this.angularFireDatabase.list('users').push(userEmail);
        // const macio = getDatabase();
        // console.log(macio.app);
        // console.log(macio.type);

        //
        set(
            ref(this.angularFireDatabase.database, 'users/' + newUser.username),
            newUser
        );
    }
}
