import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private sharedService: SharedService) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(user => {
        if (user) {
          alert('Login successful!');
          sessionStorage.setItem('userId', user.id);
          this.sharedService.updateLoginStatus(true);
          if (user.role === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else if (user.role === 'trainer') {
            this.router.navigate(['/trainer-dashboard']);
          } else {
            this.router.navigate(['/admin-dashboard']);
          }
        } else {
          alert('Invalid email or password');
        }
      }, error => {
        console.error('Error logging in', error);
      });
    }
  }
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     this.userService.login(email, password).subscribe(user => {
  //       if (user) {
  //         sessionStorage.setItem('userId', user.id);
  //         this.navigationComponent.isLoggedIn = true;
  //         this.router.navigate(['/user-dashboard']);
  //       } else {
  //         alert('Invalid email or password');
  //       }
  //     }, error => {
  //       console.error('Error logging in', error);
  //     });
  //   }
  // }
// }
