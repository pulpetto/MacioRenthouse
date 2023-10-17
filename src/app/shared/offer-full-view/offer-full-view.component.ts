import { Component, OnInit } from '@angular/core';
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
    offer$!: Observable<Offer>;
    math = Math;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const offerId = params.get('id');
            this.offer$ = this.userService.getOfferById(offerId!);
        });
    }

    images = [1, 2, 3, 4];
    images2 = [1, 2, 3, 4, 5];
}
