import { Component, Inject, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { EnrollmentService } from '../enrollment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enroll-dialog',
  standalone: false,
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.css']
})
export class EnrollDialogComponent implements OnInit {
  loggedInUser: any = {};
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  isAlreadyEnrolled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    public snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.fetchUserDetails(userId);
      this.checkEnrollment(userId, this.data.id);
    } else {
      console.error('User ID not found in session storage');
    }
  }

  fetchUserDetails(userId: string): void {
    this.userService.getUserById(userId).subscribe(user => {
      this.loggedInUser = user;
    });
  }

  checkEnrollment(userId: string, courseId: string): void {
    this.enrollmentService.getEnrollments().subscribe(enrollments => {
      this.isAlreadyEnrolled = enrollments.some((enrollment: any) => enrollment.userId === userId && enrollment.courseId === courseId);
    });
  }

  confirmEnrollment(): void {
    if (this.isAlreadyEnrolled) {
      // alert('You are already enrolled in this course.');
      this.snackBar.open('You are already enrolled in this course.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
    } else {
      this.dialog.open(this.confirmDialog);
    }
  }

  closeConfirmDialog(): void {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    const enrollmentData = {
      userId: this.loggedInUser.id, // Assuming user ID is available
      courseId: this.data.id // Assuming data.id is the course ID
    };

    this.enrollmentService.enrollCourse(enrollmentData).subscribe(response => {
      console.log('Enroll form submitted:', {
        courseName: this.data.name,
        courseCategory: this.data.category,
        studentName: this.loggedInUser.name,
        studentEmail: this.loggedInUser.email
      });
      this.dialogRef.close(); // Close the main dialog
      this.closeConfirmDialog(); // Close the confirmation dialog
      alert("You have successfully enrolled in " + this.data.name);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
