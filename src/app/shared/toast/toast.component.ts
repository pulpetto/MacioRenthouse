import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from 'src/app/services/toast.service';
@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
    destroyRef = inject(DestroyRef);
    timeout: any;
    message: string | null = null;

    constructor(private toastService: ToastService) {}

    ngOnInit() {
        this.toastService.currentToastMessage
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
                if (data) {
                    this.message = data;
                    this.timeout = setTimeout(() => {
                        this.hideToast();
                    }, 5000);
                } else {
                    this.message = null;
                }
            });
    }

    hideToast() {
        console.log('s');
        this.toastService.hideToast();
    }
}
