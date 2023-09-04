import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    destroyRef = inject(DestroyRef);
    isLoggedIn$!: Observable<boolean>;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {
        this.isLoggedIn$ = this.userService.isLoggedIn();
    }

    onOfferAdd() {
        this.isLoggedIn$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((isLoggedIn) => {
                if (isLoggedIn === false) {
                    this.router.navigate(['/login']);
                } else {
                    // or navigate directly to offer creator panel
                    this.userService.navigateToDashboard();
                }
            });
    }
}
