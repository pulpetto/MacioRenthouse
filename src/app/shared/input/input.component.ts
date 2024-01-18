import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
})
export class InputComponent {
    currentYear = new Date().getFullYear();

    @Input() control!: FormControl;
    @Input() label!: string;
    @Input() type!: string;
    @Input() mask!: string;
    @Input() suffix!: string;
}
