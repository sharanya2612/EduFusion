import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['user', Validators.required],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const email = this.signupForm.value.email;
      this.userService.checkEmailExists(email).subscribe(emailExists => {
        if (emailExists) {
          alert('Email already exists. Please use a different email.');
        } else {
          this.signupForm.patchValue({ role: 'user' }); 
          this.userService.addUser(this.signupForm.value).subscribe(response => {
            alert('Successfully signed up!');
            this.router.navigate(['/login']);
          }, error => {
            console.error('Error adding user', error);
          });
        }
      }, error => {
        console.error('Error checking email', error);
      });
    }
  }
}
