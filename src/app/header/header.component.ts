import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
    userFirstName!: string;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUser().subscribe((user) => {
            this.userFirstName = user?.name!;
        });
    }

    navigateToDashboard() {
        this.userService.navigateToDashboard();
    }
}
