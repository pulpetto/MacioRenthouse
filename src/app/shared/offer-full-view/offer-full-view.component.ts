import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Offer } from 'src/app/interfaces/offer';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { VisibilityService } from 'src/app/services/visibility.service';

@Component({
    selector: 'app-offer-full-view',
    templateUrl: './offer-full-view.component.html',
    styleUrls: ['./offer-full-view.component.css'],
})
export class OfferFullViewComponent implements OnInit {
    loading: boolean = true;
    offer!: Offer;
    math = Math;
    activeImageIndex: number = 0;
    placeholdersAmount = new Array();
    fullscreenPreview: boolean = false;
    canActivateFullscreen: boolean = true;
    isHeaderSearchBarFocused: boolean = false;

    @ViewChild('imageSlider', { static: false }) set imageSlider(
        targetElement: ElementRef
    ) {
        if (targetElement) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.canActivateFullscreen = true;
                        } else {
                            this.canActivateFullscreen = false;
                        }
                    });
                },
                { root: null, rootMargin: '0px', threshold: 0.5 }
            );

            observer.observe(targetElement.nativeElement);
        }
    }

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private visibilityService: VisibilityService,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const offerId = params.get('id');
            this.userService.getOfferById(offerId!).subscribe((offerData) => {
                if (offerData) {
                    this.offer = offerData;
                    this.loading = false;
                    this.placeholdersAmount = new Array(
                        4 - offerData.images.length
                    );
                }
            });
        });

        this.visibilityService
            .getHeaderSearchBarFocusState()
            .subscribe((isFocused) => {
                this.isHeaderSearchBarFocused = isFocused;
                this.canActivateFullscreen = !isFocused;
            });
    }

    previousImage() {
        if (this.activeImageIndex === 0) {
            this.activeImageIndex = this.offer!.images.length - 1;
        } else {
            this.activeImageIndex--;
        }
    }

    nextImage() {
        if (this.activeImageIndex === this.offer!.images.length - 1) {
            this.activeImageIndex = 0;
        } else {
            this.activeImageIndex++;
        }
    }

    imageFullscreen() {
        this.fullscreenPreview = !this.fullscreenPreview;
        if (this.fullscreenPreview === true) {
            this.renderer.addClass(document.body, 'overflow-hidden');
        } else {
            this.renderer.removeClass(document.body, 'overflow-hidden');
        }
    }

    clickedImageChange(i: number) {
        this.activeImageIndex = i;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'ArrowRight') this.nextImage();

        if (event.key === 'ArrowLeft') this.previousImage();

        if (event.key === 'Escape') {
            this.fullscreenPreview = false;
            this.renderer.removeClass(document.body, 'overflow-hidden');
        }

        if (this.canActivateFullscreen && !this.isHeaderSearchBarFocused)
            if (event.key === 'f') this.imageFullscreen();
    }

    images2 = [1, 2, 3, 4, 5];
}
