import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation',
  standalone: false,
  
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  // encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;
  role: string = '';

  constructor(private router: Router, public sharedService: SharedService,private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.sharedService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.fetchUserRole();
      }
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  checkLoginStatus(): void {
    const userId = sessionStorage.getItem('userId');
    this.isLoggedIn = !!userId;
    this.sharedService.updateLoginStatus(this.isLoggedIn);
  }

  fetchUserRole(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.role = user.role;
        this.cdr.detectChanges(); // Trigger change detection
      });
    }
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.sharedService.updateLoginStatus(false);
    this.role = ''; // Reset role
    this.cdr.detectChanges(); // Trigger change detection
    this.router.navigate(['/home']);
  }
}