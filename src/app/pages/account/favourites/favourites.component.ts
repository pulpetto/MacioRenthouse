import { Component, DestroyRef, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent {
    destroyRef = inject(DestroyRef);
    favouriteOffers$!: Observable<Offer[] | null>;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.favouriteOffers$ = this.userService.getUserFavouriteOffers();
    }
}
