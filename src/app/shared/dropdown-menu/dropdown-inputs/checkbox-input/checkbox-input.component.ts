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
    singleSelectOptionsConverted: { name: string; checked: boolean }[] = [];
    // Multi-Select
    @Input() options!: CheckboxOption[];
    anyOptionChecked: boolean = false;
    applyButtonAvailable: boolean = false;
    clearButtonAvailable: boolean = false;
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
        if (!this.isMultiSelect && this.singleSelectOptions)
            this.singleSelectOptions.forEach((option, i) => {
                this.singleSelectOptionsConverted.push({
                    name: option,
                    checked: i === 0 ? true : false,
                });
            });
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

    onMultiSelectOptionClick(option: CheckboxOption) {
        this.updateAnyOptionsCheckedState();
        this.applyButtonAvailable = true;
        this.control?.setValue(option.name);
        let incrementOrDecrement = option.status === 'checked' ? -1 : 1;

        const checkedOptionsCount: number =
            this.options.filter((option) => option.status === 'checked')
                .length + incrementOrDecrement;

        this.checkedOptionsChangeEvent.emit(checkedOptionsCount);

        if (option.status === 'available') {
            option.status = 'checked';
        } else if (option.status === 'checked') {
            option.status = 'available';
        }
    }

    onSingleSelectOptionClick(
        option: { name: string; checked: boolean },
        $event: Event
    ) {
        if (option.checked === true) {
            $event.preventDefault();
        } else {
            this.singleSelectOptionsConverted.forEach(
                (option) => (option.checked = false)
            );
            option.checked = true;

            this.orderingChangeEvent.emit(option.name);
            this.sortingChangeEvent.emit(option.name);
            this.maxOffersPerPageChangeEvent.emit(option.name);
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
        this.applyButtonAvailable = true;
        this.updateAnyOptionsCheckedState();
        this.options.forEach((option) => {
            if (option.status !== 'unavailable') option.status = 'available';
        });
        const checkedOptionsCount: number = this.options.filter(
            (option) => option.status === 'checked'
        ).length;
        this.checkedOptionsChangeEvent.emit(checkedOptionsCount);
        this.clearButtonAvailable = false;
    }
}
