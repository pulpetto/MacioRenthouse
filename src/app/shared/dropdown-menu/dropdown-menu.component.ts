import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    HostListener,
    Input,
    ViewChild,
    inject,
} from '@angular/core';
import { CheckboxInputComponent } from './dropdown-inputs/checkbox-input/checkbox-input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RangeInputComponent } from './dropdown-inputs/range-input/range-input.component';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.css'],
})
export class DropdownMenuComponent implements AfterViewInit {
    @Input() dropdownName!: string;
    @Input() dropdownWidth: number | string = 'full';
    searchTerm: string = '';
    arrowRotated: boolean = false;
    checkedOptionsCount: number = 0;
    rangeInputValue!: number;
    rangeInputMask!: string;
    rangeInputType!: 'min' | 'max';
    minVal!: number;
    maxVal!: number;

    destroyRef = inject(DestroyRef);

    @ContentChild(CheckboxInputComponent)
    checkboxInput!: CheckboxInputComponent;

    @ContentChild(RangeInputComponent)
    rangeInput!: RangeInputComponent;

    @HostListener('document:click', ['$event'])
    clickout(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.list.nativeElement.style.height = '0px';
            this.arrowRotated = false;

            if (this.checkboxInput && !this.checkboxInput.applyButtonDisabled) {
                this.checkboxInput.applyAllOptions();
            }

            if (this.rangeInput && !this.rangeInput.applyButtonDisabled) {
                this.rangeInput.applyInputValues();
            }
        }
    }

    @ViewChild('list', { read: ElementRef, static: false })
    list!: ElementRef;

    constructor(
        private elementRef: ElementRef,
        private cdr: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        if (this.checkboxInput) {
            this.checkboxInput.calculateHeightEvent
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    if (this.list)
                        this.calculateHeight(this.list.nativeElement);
                });

            this.checkboxInput.checkedOptionsChangeEvent
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((data: number) => {
                    this.checkedOptionsCount = data;
                });
        }

        if (this.rangeInput) {
            this.rangeInput.rangeInputValueChangeEvent
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((data) => {
                    this.rangeInputValue = data;
                });

            this.rangeInputMask = this.rangeInput.ngxMask;
            this.rangeInputType = this.rangeInput.minOrMax;
            this.rangeInputValue = this.rangeInput.currentRangeInputValue;
            this.minVal = this.rangeInput.minVal;
            this.maxVal = this.rangeInput.maxVal;
            this.cdr.detectChanges();
        }
    }

    calculateHeight(element: any) {
        element.style.height =
            Array.prototype.reduce.call(
                element.childNodes,
                function (p, c) {
                    return p + (c.offsetHeight || 0);
                },
                0
            ) + 'px';
    }

    toggleExpand(element: any) {
        if (!element.style.height || element.style.height == '0px') {
            this.calculateHeight(element);
        } else {
            element.style.height = '0px';
        }
    }

    onOptionsReset($event: Event) {
        $event.stopPropagation();

        if (this.checkboxInput) {
            this.checkedOptionsCount = 0;
            this.checkboxInput.clearAllOptions();
        }

        if (this.rangeInput) {
            this.rangeInput.clearInputValues();
        }
    }
}
