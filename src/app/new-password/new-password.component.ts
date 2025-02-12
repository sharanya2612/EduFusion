import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-new-password',
  standalone: false,

  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})


export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  token!: string;
  email!: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    // this.userService.validateResetToken(this.token).subscribe(response => {
    //   if (response.valid) {
    //     this.email = response.email;
    //   } else {
    //     alert('Invalid or expired reset link. Redirecting to home page.');
    //     this.router.navigate(['/home']);
    //   }
    // }, error => {
    //   alert(error.message);
    //   this.router.navigate(['/home']);
    // });

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
      this.userService.resetPassword(this.token, newPassword).subscribe(response => {
          alert('Password updated successfully!');
          this.router.navigate(['/login']);
        }, error => {
        alert(error.message);
      });
    }
  }
}