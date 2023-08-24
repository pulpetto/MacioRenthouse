import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
    AsyncValidatorFn,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { switchMap, catchError, throwError, from, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
    $users!: Observable<any[]>;

    loginPromptVisibility!: boolean;

    constructor(
        private userService: UserService,
        private router: Router,
        private angularFireDatabase: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth
    ) {
        this.loginPromptVisibility = false;
    }

    signupForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
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
        age: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        password: new FormControl('', [
            Validators.required,
            this.passwordValidator.bind(this),
        ]),
        repeatPassword: new FormControl('', [
            Validators.required,
            this.matchingPasswordValidator.bind(this),
        ]),
    });

    usernameValidator(
        control: AbstractControl
    ): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            this.userService.users.some((user) => {
                if (user.username === control.value) {
                    resolve({ usernameAlreadyTaken: true });
                } else {
                    resolve(null);
                }
            });
        });
    }

    emailValidator(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            this.userService.users.some((user) => {
                if (user.email === control.value) {
                    resolve({ emailAlreadyRegistered: true });
                } else {
                    resolve(null);
                }
            });
        });
    }

    passwordValidator(control: AbstractControl): ValidationErrors | null {
        const value: string = control.value;

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
            return { uppercaseLetterMissing: true };
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(value)) {
            return { lowercaseLetterMissing: true };
        }

        if (!/[0-9]/.test(value)) {
            return { numberMissing: true };
        }

        // Check for symbols (non-alphanumeric characters)
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(value)) {
            return {
                symbolMissing: true,
            };
        }

        if (value.length < 8) {
            return { passwordTooShort: true };
        }

        return null;
    }

    matchingPasswordValidator(
        control: AbstractControl
    ): ValidationErrors | null {
        const password = this.signupForm?.get('password')?.value;
        const repeatPassword = control.value;

        if (password !== repeatPassword) {
            return { passwordsDoNotMatch: true };
        }

        return null;
    }

    onSignup() {
        const newUser: User = {
            // name: this.signupForm.controls.name.value!,
            name: this.signupForm?.get('name')?.value!,
            lastname: this.signupForm.get('lastName')?.value!,
            username: this.signupForm?.get('username')?.value!,
            email: this.signupForm.get('email')?.value!,
            age: parseInt(this.signupForm.get('age')?.value!),
            password: this.signupForm.get('password')?.value!,
            userOffers: [],
        };

        // const observable = from(
        //     this.angularFireAuth.createUserWithEmailAndPassword(email, password)
        // );

        this.userService.signup(newUser);

        // observable
        //     .pipe(
        //         switchMap((userCredential) => {
        //             const newUser = {
        //                 username:
        //                     this.signupForm?.get('name')?.value! +
        //                     this.signupForm?.get('lastName')?.value!,
        //                 name: this.signupForm?.get('name')?.value!,
        //                 lastname: this.signupForm.get('lastName')?.value!,
        //                 email: this.signupForm.get('email')?.value!,
        //                 age: parseInt(this.signupForm.get('age')?.value!),
        //                 password: this.signupForm.get('password')?.value!,
        //                 userOffers: [],
        //             };

        //             console.log(newUser);
        //             console.log(userCredential);
        //             console.log(this.angularFirestore.collection('users'));

        //             return this.angularFirestore
        //                 .collection('users')
        //                 .add(newUser);
        //         }),
        //         catchError((error) => {
        //             console.error('Error signup:', error);
        //             return throwError(error);
        //         })
        //     )
        //     .subscribe(() => {
        //         console.log('ev spk');
        //         this.router.navigate(['/home']);
        //     });
    }
}
