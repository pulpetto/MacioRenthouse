import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Offer } from 'src/app/interfaces/offer';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.css'],
})
export class OfferComponent implements OnInit {
    @Input() offerData!: Offer;
    destroyRef = inject(DestroyRef);
    bookmarVisibility: boolean = false;
    isBookmared: boolean = false;

    constructor(
        private userService: UserService,
        private toastService: ToastService
    ) {}

    ngOnInit() {
        this.userService
            .getUserFavouriteOffers()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((offers) => {
                if (
                    offers.find(
                        (offer) =>
                            JSON.stringify(offer) ===
                            JSON.stringify(this.offerData)
                    )
                )
                    this.isBookmared = true;
            });
    }

    addOrRemoveOfferFromFavourites($event: Event, offer: Offer) {
        $event.stopPropagation();
        $event.preventDefault();

        this.isBookmared = !this.isBookmared;

        if (this.isBookmared) {
            this.toastService.showToast('Bookmarked offer');
        } else {
            this.toastService.showToast('Removed offer from favourites');
        }

        this.userService.addOrRemoveOfferFromFavourites(
            offer,
            this.isBookmared
        );
    }
}
