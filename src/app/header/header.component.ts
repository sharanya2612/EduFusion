import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.isLoggedIn = !!sessionStorage.getItem('userId');
    this.sharedService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });
    // alert(this.isLoggedIn)
  }
}
