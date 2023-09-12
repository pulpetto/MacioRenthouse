import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
    destroyRef = inject(DestroyRef);
    userOffers: Offer[] | undefined;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService
            .getUser()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((user) => {
                this.userOffers = user?.userOffers;
            });
    }
}
