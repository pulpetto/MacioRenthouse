import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.css'],
})
export class DropdownMenuComponent implements OnInit {
    searchTerm: string = '';
    @Input() dropdownName!: string;
    @Input() dropdownOptions!: string[];
    @Input() dropdownMultiselect!: boolean;
    @Input() type: string = 'checkbox';
    dropdownOptionsConverted: {
        id: string;
        name: string;
        checked: boolean;
    }[] = [];
    // for searching purposes
    dropdownOptionsConvertedCopy: {
        id: string;
        name: string;
        checked: boolean;
    }[] = [];
    arrowRotated: boolean = false;
    anyOptionChecked: boolean = false;
    @Output() orderingChangeEvent = new EventEmitter<string>();
    @Output() sortingChangeEvent = new EventEmitter<string>();
    @Output() maxOffersPerPageChangeEvent = new EventEmitter<string>();

    @HostListener('document:click', ['$event'])
    clickout(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.list.nativeElement.style.height = '0px';
            this.arrowRotated = false;
        }
    }

    @ViewChild('list', { read: ElementRef, static: false })
    list!: ElementRef;

    constructor(
        private elementRef: ElementRef,
        private utilityService: UtilityService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.dropdownOptionsConverted = this.dropdownOptions.map(
            (optionName, index) => ({
                id: this.utilityService.generateRandomString(10),
                name: optionName,
                checked:
                    index === 0 && this.dropdownMultiselect === false
                        ? true
                        : false,
            })
        );

        this.dropdownOptionsConvertedCopy = this.dropdownOptionsConverted;
    }

    updateAnyOptionsCheckedState() {
        this.anyOptionChecked = this.dropdownOptionsConverted.some(
            (option) => option.checked
        );
    }

    toggleExpand = function (element: any) {
        if (!element.style.height || element.style.height == '0px') {
            element.style.height =
                Array.prototype.reduce.call(
                    element.childNodes,
                    function (p, c) {
                        return p + (c.offsetHeight || 0);
                    },
                    0
                ) + 'px';
        } else {
            element.style.height = '0px';
        }
    };

    onDropdownPropertySearch(element: any) {
        const filteredOptions = this.dropdownOptionsConvertedCopy.filter(
            (option) => option.name.startsWith(this.searchTerm)
        );

        this.dropdownOptionsConverted = filteredOptions;

        this.changeDetectorRef.detectChanges();
        element.style.height =
            Array.prototype.reduce.call(
                element.childNodes,
                function (p, c) {
                    return p + (c.offsetHeight || 0);
                },
                0
            ) + 'px';
    }

    onInputClick(option: any, $event: Event) {
        this.updateAnyOptionsCheckedState();

        if (!this.dropdownMultiselect) {
            if (option.checked) $event.preventDefault();
            if (!option.checked) {
                this.dropdownOptionsConverted.forEach(
                    (option) => (option.checked = false)
                );
                option.checked = true;

                // emitt to the event with name from input to avoid repeating
                this.orderingChangeEvent.emit(option.name);
                this.sortingChangeEvent.emit(option.name);
                this.maxOffersPerPageChangeEvent.emit(option.name);
            }
        }
    }

    checkStateChange() {
        this.updateAnyOptionsCheckedState();
    }

    unCheckAllOptions() {
        if (this.dropdownMultiselect) {
            this.dropdownOptionsConverted.forEach(
                (option) => (option.checked = false)
            );
        }
        this.updateAnyOptionsCheckedState();
    }
}
