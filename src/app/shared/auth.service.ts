import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  user = new BehaviorSubject<User>(null);

  public errorMessages = {
    UNKNOWN: "An Unknown error has occured",
    EMAIL_EXISTS: "The email address is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later.",
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator.",
    INVALID_IDP_RESPONSE: "The supplied auth credential is malformed or has expired.",
    INVAID_FORM:"Your form is invalid. Please fill it properly."
  }

  signUp(email, password) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
      { "email": `${email}`, "password": `${password}`, "returnSecureToken": true }).pipe(tap(res => {
        this.authenticateUser(res.email, res.localId, res.idToken, +res.expiresIn)
      }))
  }

  signIn(email, password) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
      { "email": `${email}`, "password": `${password}`, "returnSecureToken": true }).pipe(tap(res => {
        this.authenticateUser(res.email, res.localId, res.idToken, +res.expiresIn)
      }))
  }

  googleSignIn(token) {
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${environment.firebaseConfig.apiKey}`,
      {
        "postBody": `id_token=${token}&providerId=google.com`,
        "requestUri": "http://localhost:4200",
        "returnIdpCredential": true,
        "returnSecureToken": true
      })
  }

  private authenticateUser(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    console.log('user', user)
    this.user.next(user);
  }
}
