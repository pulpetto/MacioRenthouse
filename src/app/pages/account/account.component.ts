import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {
    constructor(private userService: UserService) {}

    onLogout() {
        this.userService.logout();
    }
}
