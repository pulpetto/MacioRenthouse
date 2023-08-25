import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    signupPromptVisibility!: boolean;
    wrongPasswordErrorVisibility: boolean = false;

    constructor(private userService: UserService, private router: Router) {
        this.signupPromptVisibility = false;
    }

    loginForm = new FormGroup({
        username: new FormControl(
            '',
            [Validators.required],
            this.usernameValidator.bind(this)
        ),
        email: new FormControl(
            '',
            [Validators.required, Validators.email],
            this.emailValidator.bind(this)
        ),
        password: new FormControl('', [Validators.required]),
    });

    usernameValidator(
        control: AbstractControl
    ): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            if (
                !this.userService.users.some((user) => {
                    return user.username === control.value;
                })
            ) {
                resolve({ usernameDoestExist: true });
            } else {
                resolve(null);
            }
        });
    }

    emailValidator(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            if (
                !this.userService.users.some((user) => {
                    return user.email === control.value;
                })
            ) {
                resolve({ emailNotRegistered: true });
            } else {
                resolve(null);
            }
        });
    }

    onLogIn() {
        if (
            this.userService.users.some((user) => {
                return (
                    user.username === this.loginForm?.get('username')?.value! &&
                    user.email === this.loginForm?.get('email')?.value! &&
                    user.password === this.loginForm?.get('password')?.value!
                );
            })
        ) {
            this.wrongPasswordErrorVisibility = false;
            this.userService.login();
        } else {
            this.loginForm.reset();
            this.wrongPasswordErrorVisibility = true;
        }
    }
}
