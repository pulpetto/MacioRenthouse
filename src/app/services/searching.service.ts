import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
    providedIn: 'root',
})
export class SearchingService {
    private searchTerm: string = '';

    constructor(private angularFireDatabase: AngularFireDatabase) {}

    updateSearchTerm(updatedSearchTerm: string) {
        this.searchTerm = updatedSearchTerm;
    }
}
