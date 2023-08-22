import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
    providedIn: 'root',
})
export class UserService {
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

    signup(userEmail: string, userPassword: string) {
        console.log('signed in');
    }
}
