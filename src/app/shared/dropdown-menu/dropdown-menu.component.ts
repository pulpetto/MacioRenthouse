import {
    AfterViewInit,
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

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.css'],
})
export class DropdownMenuComponent implements AfterViewInit {
    @Input() dropdownName!: string;
    searchTerm: string = '';
    arrowRotated: boolean = false;
    checkedOptionsCount: number = 0;

    destroyRef = inject(DestroyRef);

    @ContentChild(CheckboxInputComponent)
    checkboxInput!: CheckboxInputComponent;

    @HostListener('document:click', ['$event'])
    clickout(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.list.nativeElement.style.height = '0px';
            this.arrowRotated = false;
        }
    }

    @ViewChild('list', { read: ElementRef, static: false })
    list!: ElementRef;

    constructor(private elementRef: ElementRef) {}

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

    onCheckboxesClear($event: Event) {
        $event.stopPropagation();
        this.checkedOptionsCount = 0;
        this.checkboxInput.clearAllOptions();
    }
}
