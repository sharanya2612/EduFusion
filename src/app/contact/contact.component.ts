import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  companyemail="support@hello.com";
  user = {
    name: '',
    email: '',
    message: ''
  };

  save(formValue: any, isValid: boolean) {
    if (isValid) {
      console.log('Form Submitted!', formValue);
    }
  }

}
