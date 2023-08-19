import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private users: User[] = [];

    constructor() {
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
}
