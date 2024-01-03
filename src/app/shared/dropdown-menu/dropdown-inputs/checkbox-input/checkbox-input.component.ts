import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
    selector: 'app-checkbox-input',
    templateUrl: './checkbox-input.component.html',
    styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent implements OnInit {
    searchTerm: string = '';

    @Input() dropdownOptions!: string[];
    @Input() dropdownMultiselect!: boolean;

    @Output() orderingChangeEvent = new EventEmitter<string>();
    @Output() sortingChangeEvent = new EventEmitter<string>();
    @Output() maxOffersPerPageChangeEvent = new EventEmitter<string>();
    @Output() calculateHeightEvent = new EventEmitter<void>();

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

    anyOptionChecked: boolean = false;

    constructor(
        private utilityService: UtilityService,
        private cdr: ChangeDetectorRef
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

    onDropdownPropertySearch() {
        const filteredOptions = this.dropdownOptionsConvertedCopy.filter(
            (option) => option.name.startsWith(this.searchTerm)
        );

        this.dropdownOptionsConverted = filteredOptions;

        this.cdr.detectChanges();
        this.calculateHeightEvent.emit();
    }

    updateAnyOptionsCheckedState() {
        this.anyOptionChecked = this.dropdownOptionsConverted.some(
            (option) => option.checked
        );
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
