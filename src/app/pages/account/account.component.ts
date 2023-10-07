import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    creatorOpenState = false;

    constructor(private userService: UserService) {}

    closeCreator() {
        this.creatorOpenState = false;
    }

    onLogout() {
        this.userService.logout();
    }
}
