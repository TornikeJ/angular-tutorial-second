import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from './store/auth.actions';

export interface AuthResponeData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }


    autoLogOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new authActions.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    // signup(email: string, password: string) {
    //     return this.http.post<AuthResponeData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBTZVNKX7LVfqYT7w_lsLCXjw6ewPPsgY0',
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         }
    //     ).pipe(catchError(this.handleError), tap(resData => {
    //         this.handleAuthentication(
    //             resData.email,
    //             resData.localId,
    //             resData.idToken,
    //             +resData.expiresIn,
    //         );


    //     }));
    // }

    // login(email: string, password: string) {
    //     return this.http.post<AuthResponeData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBTZVNKX7LVfqYT7w_lsLCXjw6ewPPsgY0',
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         }
    //     ).pipe(catchError(this.handleError), tap(resData => {
    //         this.handleAuthentication(
    //             resData.email,
    //             resData.localId,
    //             resData.idToken,
    //             +resData.expiresIn,
    //         );
    //     }));
    // }

    // logout() {
    //     // this.user.next(null);
    //     // this.store.dispatch(new authActions.Logout());
    //     // this.router.navigate(['/auth']);
    //     localStorage.removeItem('userData');
    //     if (this.tokenExpirationTimer) {
    //         clearTimeout(this.tokenExpirationTimer);
    //     }

    //     this.tokenExpirationTimer = null;
    // }

    // autoLogin() {
    //     const userData: {
    //         email: string;
    //         id: string;
    //         _token: string;
    //         _tokenExpirationDate: string;
    //     } = JSON.parse(localStorage.getItem('userData'));

    //     if (!userData) {
    //         return;
    //     }

    //     const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    //     if (loadedUser.token) {
    //         // this.user.next(loadedUser);
    //         this.store.dispatch(new authActions.AuthenticateSuccess({
    //             email: loadedUser.email,
    //             userId: loadedUser.id,
    //             token: loadedUser.token,
    //             expirationDate: new Date(userData._tokenExpirationDate)
    //         }))
    //         const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    //         this.autoLogOut(expirationDate);
    //     }
    // }



    // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    //     const user = new User(email, userId, token, expirationDate);
    //     // this.user.next(user);
    //     this.store.dispatch(
    //         new authActions.AuthenticateSuccess({
    //             email: email,
    //             userId: userId,
    //             token: token,
    //             expirationDate: expirationDate
    //         })
    //     );
    //     localStorage.setItem('userData', JSON.stringify(user));
    //     this.autoLogOut(expiresIn * 1000);
    // }

    // private handleError(errorRes: HttpErrorResponse) {
    //     let errorMessage = 'An unknown error occured!'

    //     if (!errorRes.error || !errorRes.error.error) {
    //         return throwError(errorMessage);
    //     }

    //     switch (errorRes.error.error.message) {
    //         case 'EMAIL_EXISTS':
    //             errorMessage = 'This email already exists ';
    //             break;
    //         case 'EMAIL_NOT_FOUND':
    //             errorMessage = 'This email does not exist';
    //             break;
    //         case 'INVALID_PASSWORD':
    //             errorMessage = 'Invalid password entered';
    //             break;
    //     }

    //     return throwError(errorMessage);
    // }
}