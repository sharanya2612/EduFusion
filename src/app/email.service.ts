import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
 
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {
    emailjs.init('ttldPan7YOySa6aTr'); // Replace with your EmailJS public key
  }
 
  // sendEmail(formData: any): Promise<void> {
  //   return emailjs.send('contact_service', 'contact_form', formData);
  // }
  sendEmail(formData: any): Promise<void> {
    return emailjs
      .send('service_gn6u9f5', 'template_eev5n7d', formData) // Replace with actual Service ID and Template ID
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending email:', error); // Log errors
        throw error;
      });
  }

  sendresetEmail(formData: any){
    return emailjs
     .send('service_gn6u9f5', 'template_z415bn7', formData) // Replace with actual Service ID and Template ID
     .then(() => {
        console.log('Reset email sent successfully');
      })
     .catch((error) => {
        console.error('Error sending reset email:', error); // Log errors
        throw error;
      });
  }
}