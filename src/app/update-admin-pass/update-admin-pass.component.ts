import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-admin-pass',
  standalone: false,
  
  templateUrl: './update-admin-pass.component.html',
  styleUrl: './update-admin-pass.component.css'
})
export class UpdateAdminPassComponent{ 
  // implements OnInit {
//   currentPassword: string = '';
//   newPasswordForm!: FormGroup;
//   email: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     const userId = sessionStorage.getItem('userId');
//     if (!userId) {
//       this.router.navigate(['/home']);
//       return;
//     }

//     this.userService.getUserById(userId).subscribe(user => {
//       this.email = user.email;
//     });

//     this.newPasswordForm = this.fb.group({
//       currentPassword: ['', [Validators.required, Validators.minLength(6)]],
//       newPassword: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', Validators.required]
//     }, { validator: this.passwordMatchValidator });
//   }

//   passwordMatchValidator(form: FormGroup) {
//     const newPassword = form.get('newPassword')?.value;
//     const confirmPassword = form.get('confirmPassword')?.value;
//     return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
//   }

//   onSubmit(): void {
//     if (this.newPasswordForm.valid) {
//       const currentPassword = this.newPasswordForm.value.currentPassword;
//       const newPassword = this.newPasswordForm.value.newPassword;
//       this.userService.updatePassword(this.email, newPassword).subscribe(() => {
//         alert('Password updated successfully!');
//         this.router.navigate(['/login']);
//       }, error => {
//         console.error('Error updating password', error);
//       });
//     }
//   }
}
