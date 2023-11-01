import {
    Component,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.css'],
})
export class DropdownMenuComponent implements OnInit {
    @Input() dropdownName!: string;
    @Input() dropdownOptions!: string[];
    dropdownOptionsConverted: object[] = [];
    arrowRotated: boolean = false;

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

    ngOnInit() {
        this.dropdownOptions.forEach((optionName) => {
            const optionObj = {
                name: optionName,
                checked: false,
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
}

// add default option
// ---- pass via input name of the default

// make only one be selectable

// make random id for input and label

// instead of checkbox make a check sign
