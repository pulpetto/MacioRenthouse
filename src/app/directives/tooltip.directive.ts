import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
    OnDestroy,
} from '@angular/core';

@Directive({
    selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
    @Input('tooltip') tooltipTitle!: string;
    @Input() placement!: 'top' | 'right' | 'bottom' | 'left';
    tooltip!: HTMLElement | null;
    offset = 10;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter') onMouseEnter() {
        if (!this.tooltip) {
            this.show();
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.tooltip) {
            this.hide();
        }
    }

    @HostListener('focus') onFocus() {
        if (!this.tooltip) {
            this.show();
        }
    }

    @HostListener('blur') onBlur() {
        if (this.tooltip) {
            this.hide();
        }
    }

    @HostListener('click') onClick() {
        if (this.tooltip) {
            this.hide();
        }
    }

    show() {
        this.create();
        this.setPosition();
        // this.renderer.addClass(this.tooltip, 'opacity-100');
        this.renderer.setStyle(this.tooltip, 'opacity', '1');
    }

    hide() {
        // this.renderer.addClass(this.tooltip, 'opacity-100');
        this.renderer.removeStyle(this.tooltip, 'opacity');
        this.renderer.removeChild(document.body, this.tooltip);
        this.tooltip = null;
    }

    create() {
        this.tooltip = this.renderer.createElement('span');

        this.renderer.appendChild(
            this.tooltip,
            this.renderer.createText(this.tooltipTitle)
        );

        this.renderer.appendChild(document.body, this.tooltip);

        const tailwindClasses = [
            'absolute',
            'fixed',
            'z-50',
            'px-4',
            'py-2',
            'text-center',
            'text-white',
            'rounded-md',
            'opacity-0',
            'bg-neutral-950',
            'transition-opacity',
            'duration-300',
        ];
        tailwindClasses.forEach((className) => {
            this.renderer.addClass(this.tooltip, className);
        });

        // top left right bottom traingle
        // this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);
    }

    setPosition() {
        const hostPos = this.el.nativeElement.getBoundingClientRect();

        const tooltipPos = this.tooltip!.getBoundingClientRect();

        const scrollPos =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        let top, left;

        if (this.placement === 'top') {
            top = hostPos.top - tooltipPos.height - this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'bottom') {
            top = hostPos.bottom + this.offset;
            left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        }

        if (this.placement === 'left') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.left - tooltipPos.width - this.offset;
        }

        if (this.placement === 'right') {
            top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
            left = hostPos.right + this.offset;
        }

        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }

    ngOnDestroy() {
        if (this.tooltip) {
            this.hide();
        }
    }
}
