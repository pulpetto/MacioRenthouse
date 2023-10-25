import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
    offers$!: Observable<Offer[] | null>;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.offers$ = this.userService.getUserOffers();
    }
}
