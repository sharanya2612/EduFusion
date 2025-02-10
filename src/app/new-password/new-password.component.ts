import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-new-password',
  standalone: false,

  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})


export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  email!: string;
  token!: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('resetEmail') || '';
    this.token = localStorage.getItem('resetToken') || '';
    const storedExpirationTime = parseInt(localStorage.getItem('resetTokenExpiration') || '0', 100000);

    if (!this.email || !this.token || new Date().getTime() > storedExpirationTime) {
      alert('Invalid or expired reset link. Redirecting to home page.');
      localStorage.removeItem('resetToken');
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetTokenExpiration');
      this.router.navigate(['/home']);
    }

    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      const newPassword = this.newPasswordForm.value.newPassword;
      this.userService.updatePassword(this.email, newPassword).subscribe(() => {
        alert('Password updated successfully!');
        localStorage.removeItem('resetToken');
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetTokenExpiration');
        this.router.navigate(['/login']);
      }, error => {
        console.error('Error updating password', error);
      });
    }
  }
}
