import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[numberSeparator]',
})
export class NumberSeparatorDirective {
    // constructor(private _inputEl: ElementRef) {}

    // @HostListener('input', ['$event'])
    // onInput(event: any) {
    //     if (this._inputEl.nativeElement.value === '-') return;
    //     let commasRemoved = this._inputEl.nativeElement.value
    //         .replace(/ /g, '')
    //         .replace(/,/g, '');
    //     let toInt: number;
    //     let toLocale: string;
    //     if (commasRemoved.split('.').length > 1) {
    //         let decimal = isNaN(parseInt(commasRemoved.split('.')[1]))
    //             ? ''
    //             : parseInt(commasRemoved.split('.')[1]);
    //         toInt = parseInt(commasRemoved);
    //         toLocale =
    //             toInt.toLocaleString('en-US', { useGrouping: false }) +
    //             '.' +
    //             decimal;
    //     } else {
    //         toInt = parseInt(commasRemoved);
    //         toLocale = toInt.toLocaleString('en-US', { useGrouping: false });
    //     }
    //     if (toLocale === 'NaN') {
    //         this._inputEl.nativeElement.value = '';
    //     } else {
    //         this._inputEl.nativeElement.value = this.formatWithSpaces(toLocale);
    //     }
    // }

    // private formatWithSpaces(value: string): string {
    //     const parts = value.split('.');
    //     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    //     return parts.join('.');
    // }

    constructor(private _inputEl: ElementRef) {}

    @HostListener('input', ['$event'])
    onInput(event: any) {
        if (this._inputEl.nativeElement.value === '-') return;
        let formattedValue = this._inputEl.nativeElement.value
            .replace(/,/g, '')
            .replace(/\s/g, '');

        const parts = formattedValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        let finalValue = parts.join('.');

        this._inputEl.nativeElement.value = finalValue;
    }
}
