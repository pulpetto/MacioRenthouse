import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { VisibilityService } from './services/visibility.service';
import { filter } from 'rxjs/internal/operators/filter';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
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
