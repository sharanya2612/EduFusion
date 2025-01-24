import { Component,OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  constructor(private courseService: CourseService, public dialog: MatDialog,  private router: Router ) {}

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
      const dialogRef = this.dialog.open(EnrollDialogComponent, {
        width: '500px',
        data: course
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
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