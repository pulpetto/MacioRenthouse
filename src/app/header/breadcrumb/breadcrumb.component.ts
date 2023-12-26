import { Component, OnInit } from '@angular/core';
import {
    Router,
    ActivatedRoute,
    NavigationEnd,
    Event as NavigationEvent,
} from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs: { label: string; url: string }[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    }

    ngOnInit() {
        this.router.events
            .pipe(
                filter(
                    (event: NavigationEvent): event is NavigationEnd =>
                        event instanceof NavigationEnd
                ),
                distinctUntilChanged()
            )
            .subscribe(() => {
                this.breadcrumbs = this.buildBreadCrumb(
                    this.activatedRoute.root
                );
            });
    }

    buildBreadCrumb(
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: { label: string; url: string }[] = []
    ): { label: string; url: string }[] {
        let label =
            route.routeConfig && route.routeConfig.data
                ? route.routeConfig.data['breadcrumb']
                : '';
        let path =
            route.routeConfig && route.routeConfig.data
                ? route.routeConfig.path
                : '';

        const lastRoutePart = path?.split('/').pop();
        const isDynamicRoute = lastRoutePart?.startsWith(':');
        if (isDynamicRoute && !!route.snapshot) {
            const paramName = lastRoutePart?.split(':')[1];
            path = path?.replace(
                lastRoutePart!,
                route.snapshot.params[paramName!]
            );
            label = route.snapshot.params[paramName!];
        }

        const nextUrl = path ? `${url}/${path}` : url;

        const breadcrumb: { label: string; url: string } = {
            label: label,
            url: nextUrl,
        };

        const newBreadcrumbs = breadcrumb.label
            ? [...breadcrumbs, breadcrumb]
            : [...breadcrumbs];
        if (route.firstChild) {
            //If we are not on our current path yet,
            //there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(
                route.firstChild,
                nextUrl,
                newBreadcrumbs
            );
        }
        return newBreadcrumbs;
    }
}
