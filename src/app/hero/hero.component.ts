import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  title = "Transforming education with innovation and expertise";
  buttonText = "Get Started";
  backgroundImageUrl = 'assets/images/about-image.jpg'; 
}
