import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appTooltip]',
})
export class TooltipDirective {
    @Input() appTooltip: string = '';
    @Input() tooltipPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

    private tooltipElement!: HTMLElement | null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter') onMouseEnter() {
        this.showTooltip();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.hideTooltip();
    }

    @HostListener('focus') onFocus() {
        this.showTooltip();
    }

    @HostListener('blur') onBlur() {
        this.hideTooltip();
    }

    private showTooltip() {
        if (!this.tooltipElement) {
            this.tooltipElement = this.renderer.createElement('div');
            const tailwindClasses = [
                'absolute',
                'px-4',
                'py-2',
                'font-semibold',
                'text-white',
                'rounded-md',
                'shadow-2xl',
                'bg-neutral-950',
                'drop-shadow-2xl',
                'shadow-black',
                'backdrop-blur-xl',
                'bg-opacity-90',
                'bg-clip-padding',
                'backdrop-filter',
            ];
            tailwindClasses.forEach((className) => {
                this.renderer.addClass(this.tooltipElement, className);
            });
            // this.renderer.addClass(this.tooltipElement, 'tooltip');
            this.renderer.appendChild(
                this.tooltipElement,
                this.renderer.createText(this.appTooltip)
            );
            this.renderer.appendChild(document.body, this.tooltipElement);
        }

        const hostRect = this.el.nativeElement.getBoundingClientRect();
        const tooltipRect = this.tooltipElement!.getBoundingClientRect();

        let top, left;

        switch (this.tooltipPosition) {
            case 'top':
                top = hostRect.top - tooltipRect.height;
                left =
                    hostRect.left + hostRect.width / 2 - tooltipRect.width / 2;
                break;
            case 'right':
                top =
                    hostRect.top + hostRect.height / 2 - tooltipRect.height / 2;
                left = hostRect.right;
                break;
            case 'bottom':
                top = hostRect.bottom;
                left =
                    hostRect.left + hostRect.width / 2 - tooltipRect.width / 2;
                break;
            case 'left':
                top =
                    hostRect.top + hostRect.height / 2 - tooltipRect.height / 2;
                left = hostRect.left - tooltipRect.width;
                break;
        }

        this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    }

    private hideTooltip() {
        if (this.tooltipElement) {
            this.renderer.removeChild(document.body, this.tooltipElement);
            this.tooltipElement = null;
        }
    }
}
