import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { Offer } from 'src/app/interfaces/offer';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    creatorOpenState = false;
    creatorLeavingPrompt = false;
    creatorFullscreenState = false;
    uploadedImages: any[] = [];
    imageLimitPrompt = false;
    fileTypePrompt = false;
    fullscreenImageSrc = 'assets/svgs/expand-svgrepo-com.svg';

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
        images: new FormControl<any[]>([], [Validators.required]),
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
        this.offerForm.get('images')?.setValue(this.uploadedImages);

        this.placeholdersAmount = new Array(
            4 - (this.uploadedImages.length + 1)
        );
    }

    async onImageSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        const files = input?.files;

        this.updatePlaceholdersAmount();

        if (files && this.uploadedImages.length + files.length < 5) {
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
                            console.log(reader);
                            console.log(reader.result);
                            console.log(reader.result as string);
                            this.uploadedImages.push(reader.result as string);

                            this.offerForm
                                .get('images')
                                ?.setValue(this.uploadedImages);
                        }
                    };

                    reader.readAsDataURL(files[i]);

                    /////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////////

                    // // Generate a unique name for the image
                    // const imageName = `${new Date().getTime()}_${file.name}`;

                    // // Upload the file to Firebase Storage
                    // const storageRef = this.angularFireStorage.ref(
                    //     `images/${imageName}`
                    // );
                    // await storageRef.put(file);

                    // storageRef.getDownloadURL().subscribe((url: string) => {
                    //     // The URL is available here
                    //     const downloadURL = url;
                    //     console.log(url);
                    //     this.uploadedImages.push(downloadURL);
                    //     this.offerForm
                    //         .get('images')
                    //         ?.setValue(this.uploadedImages);
                    // });
                } else {
                    this.fileTypePrompt = true;
                }
            }
        } else {
            this.imageLimitPrompt = true;
        }
    }

    onMainImageRemove() {
        this.uploadedImages.shift();

        this.updatePlaceholdersAmount();
    }

    onImageRemove(i: number) {
        this.uploadedImages.splice(i + 1, 1);

        this.updatePlaceholdersAmount();
    }

    onOfferSubmit() {
        const newOffer: Offer = {
            publishDate: new Date(),
            priceForDay: +this.offerForm?.get('price')?.value!,
            availableFor: +this.offerForm?.get('availableFor')?.value!,
            pickupLocation: this.offerForm?.get('pickupLocation')?.value!,
            offerDescription: this.offerForm?.get('description')?.value!,
            images: this.uploadedImages,
            car: {
                carBrand: this.offerForm?.get('carBrand')?.value!,
                brandModel: this.offerForm?.get('carModel')?.value!,
                carProductionDate:
                    +this.offerForm?.get('productionYear')?.value!,
                availableSeats: +this.offerForm?.get('availableSeats')?.value!,
                gearboxType: this.offerForm?.get('gearboxType')?.value!,
                fuelType: this.offerForm?.get('fuelType')?.value!,
            },
        };

        this.userService.getUser().subscribe((user) => {
            user?.userOffers.push(newOffer);
        });

        // upload images to firebase
        this.uploadImagesToFirestorage().then(() => {
            this.uploadedImages = [];
            this.offerForm.reset();
        });
    }

    async uploadImagesToFirestorage() {
        for (const imageFile of this.uploadedImages) {
            const imageName = `${new Date().getTime()}_${imageFile.name}`;
            const storageRef = this.angularFireStorage.ref(
                `images/${imageName}`
            );
            await storageRef.put(imageFile);

            // await storageRef.putString(imageUrl, 'data_url');
        }
    }

    onLogout() {
        this.userService.logout();
    }
}
