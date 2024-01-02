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
import { NgxMaskDirective } from 'ngx-mask';
import { CheckboxSelect } from 'src/app/interfaces/dropdown/checkbox-select';
import { RangeSelect } from 'src/app/interfaces/dropdown/range-select';
import { DropdownMenu } from 'src/app/interfaces/dropdown/dropdown-menu';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.css'],
})
export class DropdownMenuComponent {
    @Input() dropdownName!: string;
    searchTerm: string = '';
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
