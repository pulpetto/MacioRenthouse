import { Offer } from './offer';

export interface User {
    username: string;
    name: string;
    lastname: string;
    email: string;
    age: number;
    password: string;
    offers: Offer[];
    favouriteOffers: Offer[];
    // date of account creation
    // number of cars sold
}
