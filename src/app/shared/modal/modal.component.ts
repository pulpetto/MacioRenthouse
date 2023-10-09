import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    @Output() modalToCloseIndex = new EventEmitter<number | boolean>();
    @Input() index!: number;
    @Input() message: string = '';
    @Input() iconSrc: string = '';
    @Input() oneOption: boolean = true;
    @Input() optionNames: string[] | undefined = [];

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.modalClose(false);
        }
    }

    modalClose(additionalAction: boolean) {
        this.modalToCloseIndex.emit(this.index);

        if (additionalAction) {
            this.modalToCloseIndex.emit(additionalAction);
        }
    }
}
