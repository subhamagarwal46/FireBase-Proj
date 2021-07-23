import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: boolean = true;

  myForm: FormGroup
  error:String;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private authService: AuthService) { }

  ngOnInit(): void {

    

    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]
    })
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    if (this.myForm.valid) {
      // console.log(this.myForm.value)
      const { email, password } = this.myForm.value

      let authObservable: Observable<any>;

      if (this.loginMode) {
        authObservable = this.authService.signIn(email, password)
      } else {
        authObservable = this.authService.signUp(email, password)
      }
      authObservable.subscribe((res) => {
        console.log(res)
        this.router.navigate(['image/upload'])
      },
        (err) => {
          // console.log(err)
          if(!err.err || !err.error.error){
            this.error = this.authService.errorMessages['UNKNOWN'];
          }
          else{
            this.error = this.authService.errorMessages[err.error.error.message];
          }         
          
        },
      )


    } else {
      this.myForm.controls.email.markAsTouched();
      this.myForm.controls.password.markAsTouched();
      this.error = this.authService.errorMessages['INVAID_FORM'];
    }
  }

  onGoogleSignIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.authService.googleSignIn(user.idToken).subscribe((res) => {
        console.log(res);
        this.router.navigate(['image/upload'])
      },
        (err) => {
          this.error = this.authService.errorMessages[err.error.error.message];
        })
    })
  }

}
