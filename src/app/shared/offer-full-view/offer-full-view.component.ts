import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-offer-full-view',
    templateUrl: './offer-full-view.component.html',
    styleUrls: ['./offer-full-view.component.css'],
})
export class OfferFullViewComponent implements OnInit {
    offer: Offer | undefined;
    math = Math;

    activeImageIndex: number = 0;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const offerId = params.get('id');
            this.userService.getOfferById(offerId!).subscribe((offerData) => {
                if (offerData) this.offer = offerData;
            });
        });
    }

    previousImage(imagesArrLength: number) {
        if (this.activeImageIndex === 0) {
            this.activeImageIndex = imagesArrLength - 1;
        } else {
            this.activeImageIndex--;
        }
    }

    nextImage(imagesArrLength: number) {
        if (this.activeImageIndex === imagesArrLength - 1) {
            this.activeImageIndex = 0;
        } else {
            this.activeImageIndex++;
        }
    }

    placeholdersAmount = new Array(4);

    images = [1, 2, 3, 4];
    images2 = [1, 2, 3, 4, 5];
}
