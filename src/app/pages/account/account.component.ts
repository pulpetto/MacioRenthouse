import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Offer } from 'src/app/interfaces/offer';
import { firstValueFrom } from 'rxjs';
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    creatorOpenState = false;
    creatorFullscreenState = false;
    fullscreenImageSrc = 'assets/svgs/expand-svgrepo-com.svg';

    creatorLeavingPrompt = false;
    imageLimitPrompt = false;
    fileTypePrompt = false;
    noImagesPrompt = false;

    imagesUrls: string[] = [];
    imagesFiles: File[] = [];

    constructor(
        private userService: UserService,
        private angularFireStorage: AngularFireStorage
    ) {}

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
        pickupLocation: new FormControl('', [Validators.required]),
        availableFor: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        price: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        description: new FormControl('', [Validators.required]),
    });

    onToggleCreatorFullscreen() {
        this.creatorFullscreenState = !this.creatorFullscreenState;
        if (this.fullscreenImageSrc === 'assets/svgs/expand-svgrepo-com.svg') {
            this.fullscreenImageSrc = 'assets/svgs/compress-2-svgrepo-com.svg';
        } else {
            this.fullscreenImageSrc = 'assets/svgs/expand-svgrepo-com.svg';
        }
    }

    placeholdersAmount = new Array(3);

    updatePlaceholdersAmount() {
        this.placeholdersAmount = new Array(4 - (this.imagesUrls.length + 1));
    }

    async onImageSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input?.files;

        this.updatePlaceholdersAmount();

        if (files && this.imagesUrls.length + files.length < 5) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                const file = files[i];

                if (
                    file.type === 'image/jpeg' ||
                    file.type === 'image/jpg' ||
                    file.type === 'image/png'
                ) {
                    reader.onload = () => {
                        if (reader.result) {
                            this.imagesFiles.push(file);
                            this.imagesUrls.push(reader.result as string);
                        }
                    };

                    reader.readAsDataURL(files[i]);
                } else {
                    this.fileTypePrompt = true;
                }
            }
        } else {
            this.imageLimitPrompt = true;
        }
    }

    onMainImageRemove() {
        this.imagesUrls.shift();
        this.imagesFiles.shift();
        this.updatePlaceholdersAmount();
    }

    onImageRemove(i: number) {
        this.imagesUrls.splice(i + 1, 1);
        this.imagesFiles.splice(i + 1, 1);
        this.updatePlaceholdersAmount();
    }

    onOfferSubmit() {
        if (this.imagesUrls.length === 0) {
            // maybe pulse animation on image upload label
            this.noImagesPrompt = true;
            return;
        } else {
            this.userService.getUser().subscribe(async (user) => {
                await this.uploadImagesToFirebaseStorage();

                const newOffer: Offer = {
                    publishDate: new Date(),
                    priceForDay: +this.offerForm?.get('price')?.value!,
                    availableFor: +this.offerForm?.get('availableFor')?.value!,
                    pickupLocation:
                        this.offerForm?.get('pickupLocation')?.value!,
                    offerDescription:
                        this.offerForm?.get('description')?.value!,
                    images: this.imagesUrls,
                    car: {
                        carBrand: this.offerForm?.get('carBrand')?.value!,
                        brandModel: this.offerForm?.get('carModel')?.value!,
                        carProductionDate:
                            +this.offerForm?.get('productionYear')?.value!,
                        availableSeats:
                            +this.offerForm?.get('availableSeats')?.value!,
                        gearboxType: this.offerForm?.get('gearboxType')?.value!,
                        fuelType: this.offerForm?.get('fuelType')?.value!,
                    },
                };

                user?.userOffers?.push(newOffer);
                // firebase user service add offer method

                this.creatorReset();
            });
        }
    }

    async uploadImagesToFirebaseStorage() {
        this.imagesUrls = [];

        for (const file of this.imagesFiles) {
            const storageRef = this.angularFireStorage.ref(
                `images/${new Date().getTime()}_${file.name}`
            );
            await storageRef.put(file);

            const url = await firstValueFrom(storageRef.getDownloadURL());
            this.imagesUrls.push(`${url}`);
        }
    }

    creatorReset() {
        this.imagesUrls = [];
        this.imagesFiles = [];
        this.offerForm.reset();
    }

    onLogout() {
        this.userService.logout();
    }
}

// FIX THAT USER CAN USE TAB KEY TO NAVIGATE THROUGH DASHBOARD EVEN WHEN OFFER CREATOR IS TOGGLED
