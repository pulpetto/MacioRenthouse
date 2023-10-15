import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Renderer2 } from '@angular/core';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    creatorOpenState = false;

    constructor(
        private userService: UserService,
        private renderer: Renderer2
    ) {}

    openCreator() {
        this.renderer.addClass(document.body, 'overflow-hidden');
        this.creatorOpenState = true;
    }

    closeCreator() {
        this.creatorOpenState = false;
    }

    onLogout() {
        this.userService.logout();
    }
}
