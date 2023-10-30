import { Component } from '@angular/core';

@Component({
    selector: 'app-offers-preview',
    templateUrl: './offers-preview.component.html',
    styleUrls: ['./offers-preview.component.css'],
})
export class OffersPreviewComponent {
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
