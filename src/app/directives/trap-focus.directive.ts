import {
    AfterViewInit,
    OnChanges,
    Directive,
    ElementRef,
    Input,
    SimpleChanges,
    ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
    selector: '[appTrapFocus]',
})
export class TrapFocusDirective implements AfterViewInit, OnChanges {
    @Input() offerForm!: FormGroup;
    constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.trapFocus(this.el.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['offerForm'] && this.offerForm) {
            this.offerForm.valueChanges.subscribe(() => {
                if (this.offerForm.valid) {
                    this.cdr.detectChanges();
                    this.trapFocus(this.el.nativeElement);
                }
            });
        }
    }

    trapFocus(element: any) {
        const focusableEls1 = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="number"],' +
                'input[type="radio"], input[type="checkbox"], select'
        );

        const focusableEls = Array.from(focusableEls1).filter(
            (el: any) => el.disabled === false
        );

        const firstFocusableEl: any = focusableEls[0];
        const lastFocusableEl: any = focusableEls[focusableEls.length - 1];

        element.addEventListener('keydown', function (e: any) {
            var isTabPressed = e.keyCode === 9; // isTabPressed
            if (!isTabPressed) return;

            if (e.shiftKey) {
                /* shift + tab */ if (
                    document.activeElement === firstFocusableEl
                ) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } /* tab */ else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
    }
}
