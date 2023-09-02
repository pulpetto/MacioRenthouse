import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {}
    isLoggedIn$!: Observable<boolean>;

    ngOnInit() {
        this.isLoggedIn$ = this.userService.isLoggedIn();
    }

    onOfferAdd() {
        this.isLoggedIn$.subscribe((isLoggedIn) => {
            if (isLoggedIn === false) {
                this.router.navigate(['/login']);
            } else {
                // or navigate directly to offer creator panel
                this.userService.navigateToDashboard();
            }
        });
    }
}
