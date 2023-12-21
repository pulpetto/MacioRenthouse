import {
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
    @Input() dropdownName!: string;
    @Input() dropdownOptions!: string[];
    @Input() dropdownMultiselect!: boolean;
    dropdownOptionsConverted: any[] = [];
    arrowRotated: boolean = false;
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
        private utilityService: UtilityService
    ) {}

    ngOnInit() {
        this.dropdownOptions.forEach((optionName, i) => {
            let checked;

            if (i === 0) {
                checked = true;
            } else {
                checked = false;
            }

            const optionObj = {
                id: this.utilityService.generateRandomString(10),
                name: optionName,
                checked: checked,
            };

            this.dropdownOptionsConverted.push(optionObj);
        });
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

    onInputClick(option: any, $event: Event) {
        if (this.dropdownMultiselect === false) {
            if (option.checked === false) {
                this.dropdownOptionsConverted.forEach((option) => {
                    option.checked = false;
                });

                option.checked = true;

                // emitt to the event with name from input to avoid repeating
                this.orderingChangeEvent.emit(option.name);
                this.sortingChangeEvent.emit(option.name);
                this.maxOffersPerPageChangeEvent.emit(option.name);
            } else {
                $event.preventDefault();
            }
        }
    }
}
