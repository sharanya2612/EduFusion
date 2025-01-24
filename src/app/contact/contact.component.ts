import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  companyemail="support@hello.com";
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['']
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(response => {
        alert('Message sent successfully!');
        this.contactForm.reset();
      }, error => {
        console.error('Error sending message', error);
      });
    }
  }

}
