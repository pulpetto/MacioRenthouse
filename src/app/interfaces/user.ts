import { Offer } from './offer';

export interface User {
    username: string;
    name: string;
    lastname: string;
    email: string;
    age: number;
    password: string;
    userOffers: Offer[];
    favouriteOffers: Offer[];
}
