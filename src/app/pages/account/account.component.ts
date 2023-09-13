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
        availableSeats: new FormControl('', [Validators.required]),
        fuelType: new FormControl('', [Validators.required]),
        productionYear: new FormControl('', [Validators.required]),
        // imgs: new FormControl('', [Validators.required]),
        pickupLocation: new FormControl('', [Validators.required]),
        availableFor: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
    });

    onOfferSubmit() {}

    onLogout() {
        this.userService.logout();
    }
}
