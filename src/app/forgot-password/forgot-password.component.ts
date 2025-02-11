import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  email!: string;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private emailService: EmailService) {}

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
          this.userService.generateResetToken(this.email).subscribe(response => {
            const resetLink = `http://localhost:4200/new-password?token=${response.resetToken}`;
            this.sendResetEmail(this.email, resetLink);
          }, error => {
            alert(error.message);
          });
        } else {
          alert('Email not found.');
        }
      }, error => {
        console.error('Error checking email', error);
      });
    }
  }

  sendResetEmail(email: string, resetLink: string) {
    const formData = {
      from_name: "EduFusion",
      to_name: email,
      to_email: email,
      resetLink: resetLink,
      message: `Please use the following link to reset your password.`,
    };

    this.emailService.sendresetEmail(formData)
      .then(() => {
        alert('Reset link sent to your email.');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  }
}