import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
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

    onOfferSubmit() {}

    onLogout() {
        this.userService.logout();
    }
}
