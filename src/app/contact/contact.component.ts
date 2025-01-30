import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  companyemail="support@edufusion.com";
  contactForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private contactService: ContactService,private emailService: EmailService) {
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
        const formData = {
          from_name:"EduFusion",
          to_name: this.contactForm.value.name,
          to_email: this.contactForm.value.email,
          message: `Thank you ${this,this.contactForm.value.name} for contacting us. Our team will soon contact you .`,
        };
 
        this.emailService
          .sendEmail(formData)
          .then(() => {
            this.successMessage = `Thank you ${this.contactForm.value.user_name} for subscribing!`;
            this.errorMessage = null;
            this.contactForm.reset();
          })
          .catch((error) => {
            this.errorMessage = 'There was an issue sending the email. Please try again.';
            this.successMessage = null;
            console.error('Email sending failed:', error);
          });
        this.contactForm.reset();
      }, error => {
        console.error('Error sending message', error);
      });
    }
  }

}
