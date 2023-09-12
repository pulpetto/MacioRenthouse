import { Component } from '@angular/core';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent {
    userFavouriteOffers: Offer[] | undefined;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUser().subscribe((user) => {
            this.userFavouriteOffers = user?.favouriteOffers;
        });
    }
}
