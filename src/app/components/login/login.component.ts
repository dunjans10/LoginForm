import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder, private authService: AuthenticationService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  get email(){
   return this.loginForm.get('email')
  }

  get password(){
    return this.loginForm.get('password')
  }

  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const {email, password} = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged is successfully',
        loading:'Logging in...',
        error: 'There was an error'
      })
    ).subscribe(()=> {
      this.router.navigate(['/home'])
    })
  }

}
