import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navigation',
  standalone: false,
  
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  // encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, public sharedService: SharedService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.sharedService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  checkLoginStatus(): void {
    const userId = sessionStorage.getItem('userId');
    this.isLoggedIn = !!userId;
    this.sharedService.updateLoginStatus(this.isLoggedIn);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.sharedService.updateLoginStatus(false);
    this.router.navigate(['/home']);
  }
}