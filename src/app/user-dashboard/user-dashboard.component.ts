import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { CourseService } from '../course.service';
import { EnrollmentService } from '../enrollment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { User } from '../../store/model/user.model';
import { AppState } from '../../store/state/app.state';
import * as UserActions from '../../store/action/user.action';


@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  user$: Observable<User | null>;
  enrolledCourses: any[] = [];
  editProfileForm!: FormGroup;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild('editProfileDialog') editProfileDialog!: TemplateRef<any>;
  courseIdToDelete: string | null = null;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.user$ = this.store.select(state => state.user.user);
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.store.dispatch(UserActions.loadUser({ userId }));
      this.fetchEnrolledCourses(userId);
    } else {
      console.error('User ID not found in session storage');
    }

    this.editProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      dob: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: [{ value: '', disabled: true }]
    });

    this.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.editProfileForm.patchValue({
          name: user.name,
          dob: user.dob,
          phone: user.phone,
          role: user.role
        });
      }
    });
  }
  // fetchUserDetails(userId: string): void {
  //   this.userService.getUserById(userId).subscribe(user => {
  //     if (user) {
  //       this.user = user;
  //       this.editProfileForm.patchValue({
  //         name: user.name,
  //         dob: user.dob,
  //         phone: user.phone,
  //         role: user.role
  //       });
  //     } else {
  //       console.error('User data is undefined');
  //     }
  //   }, error => {
  //     console.error('Error fetching user details:', error);
  //   });
  // }

  fetchEnrolledCourses(userId: string): void {
    this.enrollmentService.getEnrollments().subscribe(enrollments => {
      const userEnrollments = enrollments.filter((enrollment: any) => enrollment.userId === userId);
      userEnrollments.forEach((enrollment: any) => {
        this.courseService.getCourseById(enrollment.courseId).subscribe(course => {
          this.enrolledCourses.push({ ...course, enrollmentId: enrollment.id });
        });
      });
    });
  }

 
  editProfile(): void {
    this.user$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.editProfileForm.patchValue({
          name: user.name,
          dob: user.dob,
          phone: user.phone,
          role: user.role
        });
      }
    });
    this.dialog.open(this.editProfileDialog);
  }

  closeEditProfileDialog(): void {
    this.dialog.closeAll();
  }

  // updateProfile(): void {
  //   if (this.editProfileForm.valid) {
  //     const updatedUser = { ...this.user, ...this.editProfileForm.value };
  //     this.userService.updateUser(this.user.id, updatedUser).subscribe(() => {
  //       this.user = updatedUser;
  //       this.closeEditProfileDialog();
  //       this.snackBar.open('Profile updated successfully!', 'Close', {
  //         duration: 3000,
  //         panelClass: ['snackbar-success']
  //       });
  //     }, error => {
  //       this.snackBar.open('Failed to update profile. Please try again.', 'Close', {
  //         duration: 3000,
  //         panelClass: ['snackbar-error']
  //       });
  //     });
  //   }
  // }
  updateProfile(): void {
    if (this.editProfileForm.valid) {
      this.user$.subscribe(user => {
        if (user) {
          const updatedUser = { ...user, ...this.editProfileForm.value };
          this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
          this.closeEditProfileDialog();
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        }
      });
    }
  }


  confirmDelete(courseId: string): void {
    this.courseIdToDelete = courseId;
    this.dialog.open(this.confirmDialog);
  }

  closeConfirmDialog(): void {
    this.dialog.closeAll();
    this.courseIdToDelete = null;
  }

  deleteCourse(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId && this.courseIdToDelete) {
      this.enrollmentService.getEnrollmentByUserAndCourse(userId, this.courseIdToDelete).subscribe(enrollments => {
        if (enrollments.length > 0) {
          const enrollmentId = enrollments[0].id;
          this.enrollmentService.deleteEnrollmentById(enrollmentId).subscribe(() => {
            this.enrolledCourses = this.enrolledCourses.filter(course => course.id !== this.courseIdToDelete);
            this.closeConfirmDialog();
            this.snackBar.open('Course deleted successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          }, error => {
            this.snackBar.open('Failed to delete course. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error']
            });
          });
        }
      });
    }
  }
}