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
import { BehaviorSubject, map, take } from 'rxjs';

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

    setUser(user: User) {
        this.userSubject.next(user);
    }

    getUser(): Observable<User | null> {
        return this.userSubject.asObservable();
    }

    getUsers(): Observable<any[]> {
        return this.angularFireDatabase.list('users').valueChanges();
    }

    isLoggedIn(): Observable<boolean> {
        return this.userSubject
            .asObservable()
            .pipe(map((user: User | null) => !!user));
    }

    navigateToDashboard() {
        this.angularFireAuth.authState.subscribe((data) => {
            const routeUrl = `/account/${this.userSubject.value?.username}/${data?.uid}`;
            this.router.navigate([routeUrl]);
        });
    }

    login(username: string, email: string, password: string) {
        this.getUsers().subscribe((users) => {
            const loggedUser = users.find((user) => user.username === username);

            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            this.userSubject.next(loggedUser);
        });

        // should i do everything separetly or in .then() sequence
        this.angularFireAuth.signInWithEmailAndPassword(email, password);

        this.navigateToDashboard();
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

    logout() {
        console.log('navigating home', true);
        this.router.navigate(['home']);

        setTimeout(() => {
            console.log('clearing localstorage', true);
            localStorage.removeItem('loggedUser');
        }, 5000);

        setTimeout(() => {
            ////////////////////////////////////////////
            console.log('making usersubject null', true);
            this.userSubject.next(null);
        }, 10000);

        setTimeout(() => {
            // makes the path undefined/undefined
            console.log('signing out of firebase', true);
            this.angularFireAuth.signOut();
        }, 15000);

        // setTimeout(() => {
        //     console.log('navigating home', true);
        //     this.router.navigate(['home']);
        // }, 20000);

        // // Sign out the user
        // this.angularFireAuth.signOut().then(() => {
        //     // Remove local storage
        //     localStorage.removeItem('loggedUser');

        //     // Set the userSubject to null
        //     this.userSubject.next(null);
        // });

        // // Ensure the navigation happens after the userSubject.next(null) completes
        // this.userSubject.pipe(take(1)).subscribe(() => {
        //     // Redirect to the home page
        //     this.router.navigate(['home']);
        // });
    }
}
