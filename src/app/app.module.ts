import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
    provideAnalytics,
    getAnalytics,
    ScreenTrackingService,
    UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import {
    provideFirestore,
    getFirestore,
    FirestoreModule,
} from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import {
    provideRemoteConfig,
    getRemoteConfig,
} from '@angular/fire/remote-config';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './shared/input/input.component';
import { AccountComponent } from './pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfferComponent } from './shared/offer/offer.component';
import { OffersComponent } from './pages/account/offers/offers.component';
import { SettingsComponent } from './pages/account/settings/settings.component';
import { FavouritesComponent } from './pages/account/favourites/favourites.component';
import { OfferCreatorComponent } from './pages/account/offer-creator/offer-creator.component';
import { ModalComponent } from './shared/modal/modal.component';
import { A11yModule } from '@angular/cdk/a11y';
import { TooltipDirective } from './directives/tooltip.directive';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { OfferFullViewComponent } from './shared/offer-full-view/offer-full-view.component';
import { FooterComponent } from './footer/footer.component';
import { NumberSeparatorDirective } from './directives/number-separator.directive';
import { UserComponent } from './shared/user/user.component';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        InputComponent,
        AccountComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        NotFoundComponent,
        OfferComponent,
        OffersComponent,
        SettingsComponent,
        FavouritesComponent,
        OfferCreatorComponent,
        ModalComponent,
        TooltipDirective,
        NumberFormatPipe,
        OfferFullViewComponent,
        FooterComponent,
        NumberSeparatorDirective,
        UserComponent,
        LoadingComponent,
    ],
    imports: [
        A11yModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),
        provideMessaging(() => getMessaging()),
        providePerformance(() => getPerformance()),
        provideRemoteConfig(() => getRemoteConfig()),
        provideStorage(() => getStorage()),
        FirestoreModule,
        AngularFireModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
    ],
    providers: [
        ScreenTrackingService,
        UserTrackingService,
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
