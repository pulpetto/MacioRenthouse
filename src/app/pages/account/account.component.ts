import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    creatorOpenState = false;
    creatorFullscreenState = false;
    fullscreenImageSrc = 'assets/svgs/expand-svgrepo-com.svg';

    constructor(private userService: UserService) {}

    offerForm = new FormGroup({
        carBrand: new FormControl('', [Validators.required]),
        carModel: new FormControl('', [Validators.required]),
        gearboxType: new FormControl('', [Validators.required]),
        availableSeats: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        fuelType: new FormControl('', [Validators.required]),
        productionYear: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.max(2023),
            Validators.min(1886),
        ]),
        // imgs: new FormControl('', [Validators.required]),
        pickupLocation: new FormControl('', [Validators.required]),
        availableFor: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        price: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
    });

    onToggleOfferCreator() {
        this.creatorOpenState = !this.creatorOpenState;
    }

    onToggleCreatorFullscreen() {
        this.creatorFullscreenState = !this.creatorFullscreenState;
        if (this.fullscreenImageSrc === 'assets/svgs/expand-svgrepo-com.svg') {
            this.fullscreenImageSrc = 'assets/svgs/compress-2-svgrepo-com.svg';
        } else {
            this.fullscreenImageSrc = 'assets/svgs/expand-svgrepo-com.svg';
        }
    }

    onOfferSubmit() {}

    onLogout() {
        this.userService.logout();
    }
}
