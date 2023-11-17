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
    @Output() orderChangeEvent = new EventEmitter<string>();

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
        this.dropdownOptions.forEach((optionName, i) => {
            let checked;

            if (i === 0) {
                checked = true;
            } else {
                checked = false;
            }

            const optionObj = {
                id: this.generateRandomString(),
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
                this.orderChangeEvent.emit(option.name);
            } else {
                $event.preventDefault();
            }
        }
    }

    generateRandomString(): string {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result = '';

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }

        return result;
    }
}
