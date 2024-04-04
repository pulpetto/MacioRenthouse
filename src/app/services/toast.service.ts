import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    currentToastMessage = new BehaviorSubject<string | null>(null);

    showToast(message: string) {
        this.currentToastMessage.next(message);
    }

    hideToast() {
        this.currentToastMessage.next(null);
    }
}
