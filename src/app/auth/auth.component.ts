import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponeData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private storeSubscription: Subscription;

    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>, ) {

    }

    ngOnInit() {
        this.storeSubscription = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                console.log(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponeData>;
        this.isLoading = true;

        if (this.isLoginMode) {
            // authObs = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));
        } else {
            // authObs = this.authService.signup(email, password);
            this.store.dispatch(new AuthActions.SignupStart({ email: email, password: password }))
        }


        // authObs.subscribe(resData => {
        //     console.log(resData);
        //     this.isLoading = false;
        //     this.router.navigate(['/recipes']);
        // },
        //     errorRes => {
        //         console.log(errorRes);
        //         this.error = errorRes;
        //         this.isLoading = false;
        //     }
        // );

        form.reset();
    }

    handleError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }
}