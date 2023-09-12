import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
    userOffers: Offer[] | undefined;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUser().subscribe((user) => {
            this.userOffers = user?.userOffers;
        });
    }
}
