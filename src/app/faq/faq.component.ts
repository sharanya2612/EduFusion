import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: false,
  
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {
  faqs = [
    { question: 'How do I enroll in a course?', answer: 'To enroll in a course, navigate to the course catalog, select the course you are interested in, and click the "Enroll" button. You may need to complete any prerequisites or payment steps before finalizing your enrollment.' },
    { question: 'How can I reset my password?', answer: 'If you need to reset your password, click on the "Forgot Password" link on the login page. Enter your registered email address, and you will receive instructions on how to reset your password.' },
    { question: 'Where can I find my course materials?', answer: 'Course materials can be found in the "My Courses" section of your dashboard. Click on the course you are enrolled in, and you will see all the available materials, including lectures, assignments, and resources.' },
    { question: 'How do I contact my instructor?', answer: 'You can contact your instructor through the messaging feature within the LMS. Go to the course page, click on the "Instructor" tab, and use the provided contact options to send a message.' },
    { question: 'What should I do if I encounter technical issues?', answer: 'If you encounter any technical issues, please visit the "Help Center" or "Support" section of the LMS. You can find troubleshooting guides, FAQs, and contact information for technical support.' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}