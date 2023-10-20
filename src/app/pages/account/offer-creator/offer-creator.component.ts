import {
    Component,
    EventEmitter,
    HostListener,
    Output,
    Renderer2,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Modal } from 'src/app/interfaces/modal';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-offer-creator',
    templateUrl: './offer-creator.component.html',
    styleUrls: ['./offer-creator.component.css'],
})
export class OfferCreatorComponent {
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (this.modals.some((modal) => modal.visibility)) return;

        if (event.key === 'Escape') {
            this.openModalByName('creatorLeave');
        }

        if (event.key === 'f') {
            this.creatorFullscreenState = !this.creatorFullscreenState;
        }
    }

    @Output() creatorState = new EventEmitter<void>();
    creatorFullscreenState = false;
    fullscreenImageSrc = 'assets/svgs/expand-svgrepo-com.svg';

    imagesUrls: string[] = [];
    imagesFiles: File[] = [];

    modals: Modal[] = [
        {
            name: 'creatorLeave',
            visibility: false,
            message: 'Do you want to leave?',
            iconSrc: 'assets/svgs/mark-svgrepo-com.svg',
            oneOption: false,
            options: ['Cancel', 'Leave'],
        },
        {
            name: 'imageLimit',
            visibility: false,
            message: `You can only select up to ${
                4 - this.imagesUrls.length
            } images!`,
            iconSrc: 'assets/svgs/mark-svgrepo-com.svg',
            oneOption: true,
        },
        {
            name: 'fileType',
            visibility: false,
            message: 'You can only use PNG, JPG or JPEG file type',
            iconSrc: 'assets/svgs/mark-svgrepo-com.svg',
            oneOption: true,
        },
        {
            name: 'noImages',
            visibility: false,
            message: 'Please select at least 1 image',
            iconSrc: 'assets/svgs/mark-svgrepo-com.svg',
            oneOption: true,
        },
    ];

    constructor(
        private userService: UserService,
        private angularFireStorage: AngularFireStorage,
        private renderer: Renderer2
    ) {}

    closeModalByIndex($event: number | boolean) {
        if (typeof $event === 'number') {
            const modal = this.modals[$event];
            modal.visibility = false;
        }

        if (typeof $event === 'boolean' && $event === true) {
            // additional functionality block
            this.creatorReset();
            this.renderer.removeClass(document.body, 'overflow-hidden');
        }
    }

    openModalByName(name: string) {
        const modal = this.modals.find((modal) => modal.name === name);

        if (!modal) {
            console.error(
                'Dev error: name specified for getModalByName function argument is wrong or doesnt exist'
            );
        }

        modal!.visibility = true;
    }

    currentYear = new Date().getFullYear();

    offerForm = new FormGroup({
        carBrand: new FormControl('', [Validators.required]),
        carModel: new FormControl('', [Validators.required]),
        productionYear: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.max(this.currentYear),
            Validators.min(1886),
        ]),
        availableSeats: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        gearboxType: new FormControl('', [Validators.required]),
        fuelType: new FormControl('', [Validators.required]),
        engineCapacity: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        mileage: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        horsePower: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        pickupLocation: new FormControl('', [Validators.required]),
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
                    this.openModalByName('fileType');
                }
            }
        } else {
            this.openModalByName('imageLimit');
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

    generateRandomString(): string {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';

        for (let i = 0; i < 20; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    onOfferSubmit() {
        if (this.imagesUrls.length === 0) {
            // maybe pulse animation on image upload label
            this.openModalByName('noImages');
            return;
        } else {
            this.userService.getUser().subscribe(async (user) => {
                await this.uploadImagesToFirebaseStorage();

                const offerId = this.generateRandomString();
                const carBrand = this.offerForm?.get('carBrand')?.value!;
                const capitalizedCarBrand =
                    carBrand.charAt(0).toUpperCase() +
                    carBrand.slice(1).toLowerCase();

                const carModel = this.offerForm?.get('carModel')?.value!;
                const capitalizedBrandModel =
                    carModel.charAt(0).toUpperCase() +
                    carModel.slice(1).toLowerCase();

                const newOffer: Offer = {
                    offerId: offerId,
                    unixPublishDate: new Date().valueOf(),
                    price: +this.offerForm?.get('price')?.value!,
                    pickupLocation:
                        this.offerForm?.get('pickupLocation')?.value!,
                    offerDescription:
                        this.offerForm?.get('description')?.value!,
                    images: this.imagesUrls,
                    car: {
                        carBrand: capitalizedCarBrand,
                        brandModel: capitalizedBrandModel,
                        productionYear:
                            +this.offerForm?.get('productionYear')?.value!,
                        seats: +this.offerForm?.get('availableSeats')?.value!,
                        gearboxType: this.offerForm?.get('gearboxType')?.value!,
                        fuelType: this.offerForm?.get('fuelType')?.value!,
                        engineCapacity:
                            +this.offerForm?.get('engineCapacity')?.value!,
                        mileage: +this.offerForm?.get('mileage')?.value!,
                        horsePower: +this.offerForm?.get('horsePower')?.value!,
                    },
                };

                this.userService.addOffer(newOffer);
                user?.userOffers?.push(newOffer);

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
        this.creatorState.emit();
    }
}
