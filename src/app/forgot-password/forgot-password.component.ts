import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  email!: string;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


    onSubmit() {
      if (this.forgotPasswordForm.valid) {
        this.email = this.forgotPasswordForm.value.email;
        this.userService.checkEmail(this.email).subscribe(user => {
          if (user) {
            // alert('Email found! You can now set a new password.');
            localStorage.setItem('resetEmail', this.email);
            this.router.navigate(['/new-password']);
          } else {
            alert('Email not found.');
          }
        }, error => {
          console.error('Error checking email', error);
        });
      }
    }
}
