import { Component,OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  searchQuery: string = '';
  courses: any[] = [];
  selectedCourse: any = null;
  studentName: string = '';
  studentEmail: string = '';
  constructor(private courseService: CourseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  onSearch(value: any): void {
    console.log('Search query:', value.search);
    // Implement search functionality here
  }
  onEnroll(course: any): void {
    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      width: '400px',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit(value: any): void {
    console.log('Enroll form submitted:', value);
    // Implement form submission logic here
  }
}