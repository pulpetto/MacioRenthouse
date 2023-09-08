import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AccountComponent } from './pages/account/account.component';
import { authenticationGuard } from './guards/authentication.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { OffersComponent } from './pages/offers/offers.component';
import { isLoggedGuard } from './guards/is-logged.guard';

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
        path: 'account/:username/:userId',
        component: AccountComponent,
        canActivate: [authenticationGuard],
    },
    {
        path: 'offers',
        component: OffersComponent,
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
