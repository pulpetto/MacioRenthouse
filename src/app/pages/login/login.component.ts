import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    signupPromptVisibility!: boolean;

    constructor(private userService: UserService, private router: Router) {
        this.signupPromptVisibility = false;
    }

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    onLogIn() {
        if (
            this.userService
                .getUsers()
                .some(
                    (user) =>
                        user.username === this.loginForm.get('username')?.value!
                ) &&
            this.userService
                .getUsers()
                .some(
                    (user) => user.email === this.loginForm.get('email')?.value!
                ) &&
            this.userService
                .getUsers()
                .some(
                    (user) =>
                        user.password === this.loginForm.get('password')?.value!
                )
        ) {
            this.router.navigate(['/home']);
        } else {
            this.signupPromptVisibility = true;
        }
    }
}
