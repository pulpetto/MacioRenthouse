import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AccountComponent } from './pages/account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OffersComponent } from './pages/account/offers/offers.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { authGuard } from './guards/auth.guard';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { FavouritesComponent } from './pages/account/favourites/favourites.component';
import { OfferComponent } from './shared/offer/offer.component';
import { OfferFullViewComponent } from './shared/offer-full-view/offer-full-view.component';
import { offerExistsGuard } from './guards/offer-exists.guard';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [isLoggedGuard],
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [isLoggedGuard],
    },
    {
        path: 'offer/:id',
        component: OfferFullViewComponent,
        canActivate: [offerExistsGuard],
    },
    {
        path: 'account/:username/:userId',
        component: AccountComponent,
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'offers',
                pathMatch: 'full',
            },
            { path: 'offers', component: OffersComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'favourites', component: FavouritesComponent },
        ],
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
