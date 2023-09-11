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
    // {
    //     path: 'account',
    //     component: AccountComponent,
    //     canActivateChild: [authGuard],
    //     children: [
    //         {
    //             path: '',
    //             redirectTo: ':username/:userId/offers',
    //             pathMatch: 'full',
    //         },
    //         {
    //             path: ':username/:userId',
    //             component: AccountComponent, // use a different component for the user profile
    //             children: [
    //                 { path: 'offers', component: OffersComponent },
    //                 { path: 'favourites', component: FavouritesComponent },
    //                 { path: 'settings', component: SettingsComponent },
    //             ],
    //         },
    //     ],
    // },
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
