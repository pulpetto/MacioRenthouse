import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent {
    destroyRef = inject(DestroyRef);
    userFavouriteOffers: Offer[] | undefined;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService
            .getUser()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((user) => {
                this.userFavouriteOffers = user?.favouriteOffers;
            });
    }
}
