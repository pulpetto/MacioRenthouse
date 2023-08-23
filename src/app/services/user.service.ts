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
    private users: User[] = [];

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth
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

    login() {}

    signup(newUser: User) {
        set(
            ref(this.angularFireDatabase.database, 'users/' + newUser.username),
            newUser
        );
    }
}
