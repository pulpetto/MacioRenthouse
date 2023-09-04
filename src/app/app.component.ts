import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { VisibilityService } from './services/visibility.service';
import { filter } from 'rxjs/internal/operators/filter';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    isHeaderVisible$!: Observable<boolean>;
    destroyRef = inject(DestroyRef);

    constructor(
        private visibilityService: VisibilityService,
        private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        const storedUser = localStorage.getItem('loggedUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            this.userService.setUser(user[0]);
        }

        this.isHeaderVisible$ = this.visibilityService.getHeaderVisibility();

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
                const routePath =
                    this.activatedRoute.snapshot.firstChild?.routeConfig?.path;

                if (
                    routePath === 'login' ||
                    routePath === 'signup' ||
                    routePath?.includes('account')
                ) {
                    this.visibilityService.setHeaderVisibility(false);
                } else {
                    this.visibilityService.setHeaderVisibility(true);
                }
            });
    }
}
