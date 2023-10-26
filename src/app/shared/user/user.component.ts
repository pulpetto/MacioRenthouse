import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    user$!: Observable<User | null>;
    loggedUserUsername$!: Observable<string | null>;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const username = params.get('username');
            this.user$ = this.userService
                .getUserByUsername(username!)
                .pipe(map((user) => user || null));
        });

        this.loggedUserUsername$ = this.userService
            .getUser2()
            .pipe(map((user) => user?.username || null));
    }
}
