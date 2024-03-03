import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { FormControl } from '@angular/forms';
import { MultiOptionFilters } from 'src/app/interfaces/multi-option-filters';
import { UserService } from 'src/app/services/user.service';
import { MultiselectDropdownOption } from 'src/app/interfaces/multiselect-dropdown-option';
import { CheckboxOption } from 'src/app/interfaces/filters/checkbox-option';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
    selector: 'app-checkbox-input',
    templateUrl: './checkbox-input.component.html',
    styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent implements OnInit, OnChanges {
    // All
    @Input() name!: string;
    @Input() isMultiSelect!: boolean;
    // Single-Select
    @Input() singleSelectOptions!: string[];
    // Multi-Select
    @Input() options!: CheckboxOption[];
    allOptionsLength!: number;
    anyOptionChecked: boolean = false;
    applyButtonAvailable: boolean = true;
    clearButtonAvailable: boolean = true;
    searchTerm: string = '';
    @Input() control?: FormControl | undefined;

    @Output() orderingChangeEvent = new EventEmitter<string>();
    @Output() sortingChangeEvent = new EventEmitter<string>();
    @Output() maxOffersPerPageChangeEvent = new EventEmitter<string>();
    @Output() calculateHeightEvent = new EventEmitter<void>();
    @Output() checkedOptionsChangeEvent = new EventEmitter<number>();
    @Output() dropdownCloseEvent = new EventEmitter<void>();

    constructor(
        private filtersService: FiltersService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        // maybe add copies for searching
    }

    ngOnChanges(changes: SimpleChanges) {}

    onDropdownPropertySearch() {
        const filteredOptions = this.options.filter((option) =>
            option.name.startsWith(this.searchTerm.toLowerCase())
        );

        this.options = filteredOptions;

        this.cdr.detectChanges();
        this.calculateHeightEvent.emit();
    }

    updateAnyOptionsCheckedState() {
        this.anyOptionChecked = this.options.some(
            (option) => option.status === 'checked'
        );

        this.clearButtonAvailable = this.anyOptionChecked;
    }

    onOptionClick(option: CheckboxOption, $event: Event) {
        if (!this.isMultiSelect) {
            // if (option.checked) $event.preventDefault();
            // if (!option.checked) {
            //     this.dropdownOptionsConverted.forEach(
            //         (option) => (option.checked = false)
            //     );
            //     option.checked = true;
            //     // emitt to the event with name from input to avoid repeating
            //     this.orderingChangeEvent.emit(option.name);
            //     this.sortingChangeEvent.emit(option.name);
            //     this.maxOffersPerPageChangeEvent.emit(option.name);
            // }
        } else {
            this.updateAnyOptionsCheckedState();
            this.applyButtonAvailable = true;
            this.control?.setValue(option.name);
            let incrementOrDecrement = option.status === 'checked' ? -1 : 1;

            const checkedOptionsCount: number =
                this.options.filter((option) => option.status === 'checked')
                    .length + incrementOrDecrement;

            this.checkedOptionsChangeEvent.emit(checkedOptionsCount);
        }
    }

    applyAllOptions() {
        this.filtersService.updateFiltersCheckboxOptions(
            this.name,
            this.options
        );

        this.dropdownCloseEvent.emit();
        this.applyButtonAvailable = false;
    }

    clearAllOptions() {
        this.filtersService.resetFiltersCheckboxOptions(this.name);

        this.applyButtonAvailable = false;
        this.updateAnyOptionsCheckedState();
        const checkedOptionsCount: number = this.options.filter(
            (option) => option.status === 'checked'
        ).length;
        this.checkedOptionsChangeEvent.emit(checkedOptionsCount);
    }
}
