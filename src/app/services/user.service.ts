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
import { BehaviorSubject, combineLatest, map, retry } from 'rxjs';
import { Offer } from '../interfaces/offer';
import { FilterModel } from '../interfaces/filter-model';

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

    getOfferById(offerId: string): Observable<Offer | null> {
        return this.angularFireDatabase
            .list<Offer>('offers', (ref) =>
                ref.orderByChild('offerId').equalTo(offerId)
            )
            .valueChanges()
            .pipe(map((offers) => (offers.length ? offers[0] : null)));
    }

    // make it case-insensitive
    getOffersNamesBySearchTerm(
        searchTerm: string,
        username: string | null
    ): Observable<string[]> {
        const path = username ? `users/${username}/offers` : 'offers';

        return this.angularFireDatabase
            .list<Offer>(path, (ref) =>
                ref
                    .orderByChild('car/fullCarName')
                    .startAt(searchTerm)
                    .endAt(searchTerm + '\uf8ff')
                    .limitToFirst(10)
            )
            .valueChanges()
            .pipe(
                map((offers) =>
                    offers
                        .map((offer) =>
                            `${offer.car.fullCarName}`
                                .trim()
                                .replace(/\s+/g, ' ')
                        )
                        .filter(
                            (value, index, self) =>
                                self.indexOf(value) === index
                        )
                )
            );
    }

    getUserByUsername(username: string): Observable<User | null> {
        return combineLatest([
            this.angularFireDatabase
                .list<User>('users', (ref) =>
                    ref.orderByChild('username').equalTo(username)
                )
                .valueChanges()
                .pipe(map((users) => (users.length ? users[0] : null))),
            this.angularFireDatabase
                .list(`users/${username}/offers`)
                .valueChanges(),
        ]).pipe(
            map(([user, offersArray]) => {
                if (user && offersArray) {
                    user.offers = offersArray as Offer[];
                }
                return user;
            })
        );
    }

    getOffers(
        username: string | null,
        searchTerm: string | null,
        orderBy: string = 'ascending',
        sortBy: string = 'unixPublishDate',
        arrayStartIndex: number = 0,
        maxItemsPerPage: number = 10,
        sortingByCarProperties: boolean = false,
        filters: FilterModel
    ): Observable<{
        offers: Offer[];
        offersAmount: number;
        pagesAmount: number;
    } | null> {
        let query;
        const offersPath = username ? `users/${username}/offers` : 'offers';
        const sortingBy = sortingByCarProperties ? `car/${sortBy}` : sortBy;

        if (searchTerm === null) {
            query = this.angularFireDatabase.list<Offer>(offersPath, (ref) =>
                ref.orderByChild(sortingBy)
            );
        } else {
            query = this.angularFireDatabase.list<Offer>(offersPath, (ref) =>
                ref
                    .orderByChild('car/fullCarName')
                    .startAt(searchTerm)
                    .endAt(searchTerm + '\uf8ff')
            );
        }

        return query.valueChanges().pipe(
            map((offers) => {
                const offersAmount = offers.length;
                const pagesAmount = Math.ceil(offers.length / maxItemsPerPage);

                if (!offers) return null;

                if (orderBy === 'ascending') {
                    offers = offers.slice(
                        arrayStartIndex,
                        arrayStartIndex + maxItemsPerPage
                    );
                }

                if (orderBy === 'descending') {
                    offers = offers
                        .reverse()
                        .slice(
                            arrayStartIndex,
                            arrayStartIndex + maxItemsPerPage
                        );
                }

                const returnObj = {
                    offers: offers,
                    offersAmount,
                    pagesAmount,
                };

                return returnObj;
            })
        );
    }

    getOffersAmount(username: string | null): Observable<number | null> {
        const path = username ? `users/${username}/offers` : 'offers';

        return this.angularFireDatabase
            .list(path)
            .snapshotChanges()
            .pipe(map((changes) => (changes ? changes.length : null)));
    }

    setUser(user: User) {
        this.userSubject.next(user);
    }

    getUser(): Observable<User | null> {
        return this.userSubject.asObservable();
    }

    getUser2(): Observable<User | null> {
        return combineLatest([
            this.userSubject.asObservable(),
            this.angularFireDatabase
                .list(`users/${this.userSubject.value?.username}/offers`)
                .valueChanges(),
        ]).pipe(
            map(([user, offersArray]) => {
                if (user && offersArray) {
                    user.offers = offersArray as Offer[];
                }
                return user;
            })
        );
    }

    getUsers(): Observable<any[]> {
        return this.angularFireDatabase.list('users').valueChanges();
    }

    getUserOffers(): Observable<any> {
        return this.angularFireDatabase
            .list(`users/${this.userSubject.value?.username}/offers`)
            .valueChanges();
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

    addOffer(newOffer: Offer) {
        set(
            ref(
                this.angularFireDatabase.database,
                'offers/' + newOffer.offerId
            ),
            newOffer
        );

        set(
            ref(
                this.angularFireDatabase.database,
                'users/' +
                    this.userSubject.value?.username +
                    '/offers/' +
                    newOffer.offerId
            ),
            newOffer
        );
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

    async signup(newUser: User) {
        // this.angularFireAuth
        //     .createUserWithEmailAndPassword(newUser.email, newUser.password)
        //     .then(() => {
        //         set(
        //             ref(
        //                 this.angularFireDatabase.database,
        //                 'users/' + newUser.username
        //             ),
        //             newUser
        //         );
        //     })
        //     .then(() => {
        //         this.login(newUser.username, newUser.email, newUser.password);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        try {
            await this.angularFireAuth.createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            );

            await set(
                ref(
                    this.angularFireDatabase.database,
                    'users/' + newUser.username
                ),
                newUser
            );

            // foreach offer set, and also for fav
            await set(
                ref(
                    this.angularFireDatabase.database,
                    'users/' + newUser.username + '/offers'
                ),
                []
            );

            this.login(newUser.username, newUser.email, newUser.password);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }

    logout() {
        this.angularFireAuth
            .signOut()
            .then(() => {
                localStorage.removeItem('loggedUser');
                this.userSubject.next(null);
                this.router.navigate(['home']);
            })
            .catch((error) => {
                console.error('Sign-out error:', error);
            });
    }
}
