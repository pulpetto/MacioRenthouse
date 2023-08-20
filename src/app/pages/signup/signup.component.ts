import { Component, inject } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { switchMap, catchError, throwError, from, Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
    firestore: Firestore = inject(Firestore);
    angularFirestore: AngularFirestore = inject(AngularFirestore);
    users$!: Observable<User[]>;

    loginPromptVisibility!: boolean;

    constructor(private userService: UserService, private router: Router) {
        this.loginPromptVisibility = false;
    }

    passwordValidator = function (
        control: AbstractControl
    ): ValidationErrors | null {
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
    };

    signupForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
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
        if (
            this.userService
                .getUsers()
                .some(
                    (user) =>
                        user.email === this.signupForm.get('email')?.value!
                )
        ) {
            this.loginPromptVisibility = true;
            return;
        } else {
            const newUser: User = {
                // name: this.signupForm.controls.name.value!,
                username:
                    this.signupForm?.get('name')?.value! +
                    this.signupForm?.get('lastName')?.value!,
                name: this.signupForm?.get('name')?.value!,
                lastname: this.signupForm.get('lastName')?.value!,
                email: this.signupForm.get('email')?.value!,
                age: parseInt(this.signupForm.get('age')?.value!),
                password: this.signupForm.get('password')?.value!,
                userOffers: [],
            };

            this.userService.addUser(newUser);
            this.router.navigate(['/home']);
        }

        // const email = this.signupForm.get('email')?.value!;

        // const password = this.signupForm.get('password')?.value!;

        // const observable = from(
        //     this.fireAuth.createUserWithEmailAndPassword(email, password)
        // );

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
        //             console.log(this.fireStore.collection('users'));

        //             return this.fireStore.collection('users').add(newUser);
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
