import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    userFirstName$!: Observable<string | null>;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userFirstName$ = this.userService
            .getUser()
            .pipe(map((user) => user?.name || null));
    }

    navigateToDashboard() {
        this.userService.navigateToDashboard();
    }
}
