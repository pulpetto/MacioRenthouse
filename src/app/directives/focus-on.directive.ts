import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appFocusOn]',
})
export class FocusOnDirective {
    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.el.nativeElement.focus();
    }
}
