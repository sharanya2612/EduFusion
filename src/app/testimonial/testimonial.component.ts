import { Component} from '@angular/core';

@Component({
  selector: 'app-testimonial',
  standalone: false,
  
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent  {
  testimonials = [
    {
      text: "I am extremely satisfied with LMS. Their support team was responsive and helped us implement the system seamlessly.",
      author: "John M."
    },
    {
      text: "The platform is intuitive and has greatly improved our training processes.",
      author: "Jane D."
    },
    {
      text: "Highly recommend EduFusion for their excellent service and user-friendly platform.",
      author: "Mark T."
    }
  ];
  backgroundImageUrl = 'assets/testimonial_img.jpg';
  // currentTestimonialIndex = 0;

  // ngOnInit() {
  //   setInterval(() => {
  //     this.nextTestimonial();
  //   }, 3000);

  // nextTestimonial() {
  //   this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
  //   const container = document.querySelector('.testimonial-container') as HTMLElement;
  //   container.style.transform = `translateX(-${this.currentTestimonialIndex * 100}%)`;
  // }

  // selectTestimonial(index: number) {
  //   this.currentTestimonialIndex = index;
  //   const container = document.querySelector('.testimonial-container') as HTMLElement;
  //   container.style.transform = `translateX(-${this.currentTestimonialIndex * 100}%)`;
  // }
}
