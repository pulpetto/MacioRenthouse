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
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSubject = new BehaviorSubject<User | null>(null);

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth,
        private router: Router
    ) {}

    getUser(): Observable<User | null> {
        return this.userSubject.asObservable();
    }

    getUsers(): Observable<any[]> {
        return this.angularFireDatabase.list('users').valueChanges();
    }

    login(username: string, email: string, password: string) {
        this.getUsers().subscribe((users) => {
            const loggedUser = users.filter(
                (user) => user.username === username
            );

            this.userSubject.next(loggedUser[0]);
        });

        // should i do everything separetly or in .then() sequence
        this.angularFireAuth.signInWithEmailAndPassword(email, password);

        // header subscribes to the getUser() if data inst null then display user icon and hello, _USERNAME_

        this.angularFireAuth.authState.subscribe((data) => {
            const routeUrl = `/account/${username}/${data?.uid}`;
            this.router.navigate([routeUrl]);
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
            })
            .then(() => {
                this.login(newUser.username, newUser.email, newUser.password);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
