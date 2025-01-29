import { Component,OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  searchQuery: string = '';
  courses: any[] = [];
  allCourses: any[] = [];
  selectedCourse: any = null;
  studentName: string = '';
  studentEmail: string = '';
  constructor(private courseService: CourseService, public dialog: MatDialog, public snackBar:MatSnackBar,  private router: Router, private userService:UserService ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.allCourses = data; // Store all courses
    });
  }
  onSearch(value: any): void {
    const query = value.search.trim().toLowerCase();
    if (query) {
      this.courses = this.allCourses.filter(course => 
        course.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    } else {
      this.courses = this.allCourses;  // Reset to all courses if search query is empty
    }
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
  onSubmit(value: any): void {
    console.log('Enroll form submitted:', value);
    // Implement form submission logic here
  }
}