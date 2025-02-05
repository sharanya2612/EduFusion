import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-chat',
  standalone: false,

  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  private siteInfo: any = {
    sections: [
      {
        title: 'Courses',
        description: 'Browse and enroll in a variety of online courses related to your interests and career goals. We also have Popular courses you can see the trending and highest rated courses there.'
      },
      {
        title: 'About Us',
        description: 'Learn more about EduFusion, our mission, vision, and the team behind the platform.'
      },
      {
        title: 'Contact Us',
        description: 'Find ways to get in touch with us, including email, phone number, map, and physical address.'
      },
      {
        title: 'Services',
        description: 'Get more information about services provided by us like courses management, project management, interview preparation, and analytics. To know more about these come and visit us or contact us.'
      },
      {
        title: 'FAQ',
        description: 'Frequently asked questions to help guide you through the platform and troubleshoot issues.'
      },
      {
        title: 'Team',
        description: 'Finding our dynamic team with their designation and other interests. To join the team, please sign up or get in touch with us to discuss career opportunities.'
      },
      {
        title: 'Testimonials',
        description: 'Know more about what our users or alumni tell about us.'
      },
      {
        title: 'Privacy Policy',
        description: 'Learn about how we collect, use, and share your personal information.'
      },
      {
        title: 'Terms of Service',
        description: 'Review our terms and conditions for using our platform.'
      },
      {
        title: 'Cookie Policy',
        description: 'Learn about how we use cookies to enhance your experience on our platform.'
      },
      {
        title: 'Join the Team',
        description: 'To join EduFusion, sign up to create your account and access our platform. Users can enroll in courses, while trainers can get in touch with us via email to receive login credentials and update courses, train students, and manage content as per their area of expertise.'
      },
      {
        title: 'Sign Up & Login',
        description: 'Sign up to create your account and log in to access the EduFusion Dashboard. Once logged in, you can browse and enroll in courses, track your progress, and gain access to learning resources.'
      },
    ],
    contact: {
      email: 'support@edufusion.com',
      phone: '+1234567890',
      address: '123 EduFusion Lane, Learning City, EduState, 12345',
      mapLink: 'https://maps.google.com/?q=123+EduFusion+Lane'
    },
    trainerInfo: {
      email: 'trainers@edufusion.com',
      description: 'For trainers who are interested in contributing to EduFusion, please reach out to us at the provided email. We will provide you with the necessary login credentials, allowing you to update courses, create new ones, and manage your teaching content on the platform.'
    }
  };


  courses: any[] = [];  // Store courses fetched from API

  userQuery: string = '';
  aiResponse: string = '';
  loading: boolean = false;

  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(private courseService: CourseService) {
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  ngOnInit(): void {
    // Fetch courses from the service on initialization
    this.fetchCourses();
  }

  // Fetch courses using the CourseService
  private fetchCourses(): void {
    this.courseService.loadCourses(true).subscribe(
      (data) => {
        this.courses = data;
        this.siteInfo.sections[0].description = `We offer the following courses: ${this.courses.map(c => c.name).join(', ')}`;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  // Function to handle the user's query and generate a response
  async handleUserQuery() {
    this.loading = true;

    try {
      // Wait until courses are fetched and updated in siteInfo
      if (this.courses.length === 0) {
        this.aiResponse = 'Courses are currently not available. Please try again later.';
        this.loading = false;
        return;
      }

      // Construct the prompt for the AI model with the course titles included
      const contextPrompt = `EduFusion is an LMS platform. Here are some details you may need:

      - Courses: ${this.siteInfo.sections[0].description}
      - About Us: ${this.siteInfo.sections[1].description}
      - Contact Us: ${this.siteInfo.sections[2].description}
      - FAQ: ${this.siteInfo.sections[3].description}
      - Help Center: ${this.siteInfo.sections[4].description}
      - Team: ${this.siteInfo.sections[5].description}
      - Testimonials: ${this.siteInfo.sections[6].description}
      - Privacy Policy: ${this.siteInfo.sections[7].description}
      - Terms of Service: ${this.siteInfo.sections[8].description}
      - Cookie Policy: ${this.siteInfo.sections[9].description}
      - Join the Team: ${this.siteInfo.sections[10].description}
      - Sign Up & Login: ${this.siteInfo.sections[11].description}
    
    The user asks: "${this.userQuery}".
    
    Please respond in a helpful manner, either guiding them to the appropriate section or providing the requested information. 
    If the question is about the courses, give information only about the courses that are available on the platform.
    If users ask for general information, direct them to the relevant sections.
    If their question is about joining the team, provide details about how they can sign up or contact us.
    If users ask about signing up, logging in, or accessing the dashboard, provide them with the necessary information.
    If their question is for trainers, explain how they can contact us to get login credentials to manage courses.
    If their question is not related to EduFusion, respond with "Please ask about EduFusion or the website."`;
    
    // console.log('Sending prompt:', contextPrompt);
    
      // Send the prompt to the AI model and get the response
      const result = await this.model.generateContent(contextPrompt);
      const responseText = result.response.text();
      console.log('AI Response:', responseText);

      // Set the response in the component's state
      this.aiResponse = responseText;
    } catch (error) {
      console.error('AI Error:', error);
      this.aiResponse = 'Sorry, I encountered an error. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
}