import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
    FormArray,
    FormBuilder,
} from '@angular/forms';
import { Offer } from 'src/app/interfaces/offer';

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

    // files read by file reader
    // uploadedImages: string[] = [];

    // file NOT read by file reader
    imagesFiles: File[] = [];

    constructor(
        private userService: UserService,
        private angularFireStorage: AngularFireStorage,
        private formBuilder: FormBuilder
    ) {}

    // offerForm2 = this.formBuilder.group({
    //     carBrand: ['', Validators.required],
    //     carModel: ['', Validators.required],
    //     gearboxType: ['', Validators.required],
    //     availableSeats: [
    //         '',
    //         Validators.required,
    //         Validators.pattern('^[0-9]*$'),
    //     ],
    //     fuelType: ['', Validators.required],
    //     productionYear: [
    //         '',
    //         Validators.required,
    //         Validators.pattern('^[0-9]*$'),
    //         Validators.max(2023),
    //         Validators.min(1886),
    //     ],
    //     imagesUrls: this.formBuilder.array([], [Validators.required]),
    //     pickupLocation: ['', Validators.required],
    //     availableFor: ['', Validators.required, Validators.pattern('^[0-9]*$')],
    //     price: ['', Validators.required, Validators.pattern('^[0-9]*$')],
    //     description: ['', Validators.required],
    // });

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
        // images: new FormControl<string[]>([], [Validators.required]),
        imagesUrls: new FormArray([], [Validators.required]),
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

    // HOW TO MAKE LIVE CONNECTION
    uploadedImages = this.offerForm.get('imagesUrls') as FormArray;

    onToggleCreatorFullscreen() {
        this.creatorFullscreenState = !this.creatorFullscreenState;
        if (this.fullscreenImageSrc === 'assets/svgs/expand-svgrepo-com.svg') {
            this.fullscreenImageSrc = 'assets/svgs/compress-2-svgrepo-com.svg';
        } else {
            this.fullscreenImageSrc = 'assets/svgs/expand-svgrepo-com.svg';
        }

        console.log(this.uploadedImages.value);
        console.log(this.offerForm?.get('imagesUrls')?.value);
        this.offerForm.setControl('imagesUrls', new FormArray([]));
        console.log(this.offerForm?.get('imagesUrls')?.value);
        console.log(this.uploadedImages.value);
    }

    placeholdersAmount = new Array(3);

    updatePlaceholdersAmount() {
        // this.offerForm.get('images')?.setValue(this.uploadedImages);

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
                    this.imagesFiles.push(file);

                    reader.onload = () => {
                        if (reader.result) {
                            // this.uploadedImages.push(
                            //     new FormControl(reader.result as string)
                            // );

                            (
                                this.offerForm.get('imagesUrls') as FormArray
                            ).push(new FormControl(reader.result as string));

                            console.log(
                                this.offerForm.get('imagesUrls')?.value.length
                            );
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
        this.uploadedImages.removeAt(0);
        this.imagesFiles.shift();
        this.updatePlaceholdersAmount();
    }

    onImageRemove(i: number) {
        // this.uploadedImages.splice(i + 1, 1);
        this.uploadedImages.removeAt(i + 1);
        this.imagesFiles.splice(i + 1, 1);
        this.updatePlaceholdersAmount();
    }

    onOfferSubmit() {
        this.userService.getUser().subscribe(async (user) => {
            console.log(user);

            await this.uploadImagesToFirebaseStorage();

            const newOffer: Offer = {
                publishDate: new Date(),
                priceForDay: +this.offerForm?.get('price')?.value!,
                availableFor: +this.offerForm?.get('availableFor')?.value!,
                pickupLocation: this.offerForm?.get('pickupLocation')?.value!,
                offerDescription: this.offerForm?.get('description')?.value!,
                images: this.offerForm?.get('imagesUrls')?.value!,
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

            this.creatorReset();
        });
    }

    async uploadImagesToFirebaseStorage() {
        this.offerForm.setControl('imagesUrls', new FormArray([]));

        for (const file of this.imagesFiles) {
            const storageRef = this.angularFireStorage.ref(
                `images/${new Date().getTime()}_${file.name}`
            );
            await storageRef.put(file);

            storageRef.getDownloadURL().subscribe((url: string) => {
                const downloadURL = url;
                this.uploadedImages.push(downloadURL);
            });
        }
    }

    // async uploadImagesToFirestorage() {
    //     for (const imageFile of this.uploadedImages) {
    //         const imageName = `${new Date().getTime()}_${imageFile.name}`;
    //         const storageRef = this.angularFireStorage.ref(
    //             `images/${imageName}`
    //         );
    //         await storageRef.put(imageFile);

    //         // await storageRef.putString(imageUrl, 'data_url');
    //     }
    // }

    // async uploadImagesToFirestorage2(): Promise<string[]> {
    //     const imageUrls: string[] = [];

    //     for (const imageFile of this.uploadedImages) {
    //         const imageName = `${new Date().getTime()}_${imageFile.name}`;
    //         const storageRef = this.angularFireStorage.ref(
    //             `images/${imageName}`
    //         );
    //         const uploadTask = storageRef.put(imageFile);

    //         await uploadTask.then(async (snapshot) => {
    //             // Get the download URL for the image
    //             const downloadURL = await snapshot.ref.getDownloadURL();
    //             imageUrls.push(downloadURL);
    //         });
    //     }

    //     return imageUrls;
    // }

    creatorReset() {
        this.imagesFiles = [];
        this.offerForm.reset();
    }

    onLogout() {
        this.userService.logout();
    }
}
