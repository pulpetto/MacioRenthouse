import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Offer } from 'src/app/interfaces/offer';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
    offers$!: Observable<Offer[] | null>;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.offers$ = this.userService
            .getUser2()
            .pipe(map((user) => user?.offers || null));
    }
}
