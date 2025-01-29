import { Component, OnInit } from '@angular/core';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';
import { CourseService } from '../course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-popular-courses',
  standalone: false,
  
  templateUrl: './popular-courses.component.html',
  styleUrl: './popular-courses.component.css'
})
export class PopularCoursesComponent implements OnInit {
  searchQuery: string = '';
  courses: any[] = [];
  allCourses: any[] = [];
  popularCourses: any[] = [];
  selectedCourse: any = null;
  studentName: string = '';
  studentEmail: string = '';

  constructor(private courseService: CourseService, public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.allCourses = data; // Store all courses
      this.filterPopularCourses();
    });
  }

  filterPopularCourses(): void {
    this.popularCourses = this.allCourses.filter(course => 
      course.badge === 'Hot' || 
      course.badge === 'Trending' || 
      course.rating >= 4.8
    );
  }

  onEnroll(course: any): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        if (user.role !== 'admin' && user.role !== 'trainer') {
          const dialogRef = this.dialog.open(EnrollDialogComponent, {
            width: '500px',
            data: course
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        } else {
          this.snackBar.open('Admins and trainers are not allowed to enroll in courses.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      }, error => {
        console.error('Error fetching user details:', error);
        this.snackBar.open('Failed to fetch user details. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      });
    } else {
      alert('You need to log in to enroll in a course.');
      this.router.navigate(['/login']);
    }
  }
}