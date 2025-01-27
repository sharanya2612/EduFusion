import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: false,
  
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  title = "Transforming education with innovation and expertise";
  backgroundImageUrl = 'assets/images/about-image.jpg'; 
  isLoggedIn: boolean = false;
  buttonText: string = '';
  

  constructor(private sharedService: SharedService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if(userId) {
    this.isLoggedIn = true;
    this.buttonText='Explore Courses';
    }  else {
      this.isLoggedIn = false;
      this.buttonText='Get Started';
    }
    // this.buttonText = this.isLoggedIn ?  'Explore Courses':'Get Started';
    this.cdr.detectChanges();
  }
}
      