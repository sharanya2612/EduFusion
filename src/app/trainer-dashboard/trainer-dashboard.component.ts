import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TrainerService } from '../trainers.service';
import { CourseService } from '../course.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-trainer-dashboard',
  standalone: false,
  
  templateUrl: './trainer-dashboard.component.html',
  styleUrl: './trainer-dashboard.component.css'
})
export class TrainerDashboardComponent implements OnInit {
  @ViewChild('courseDialog') courseDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  @ViewChild('editProfileDialog') editProfileDialog!: TemplateRef<any>;

  profileForm!: FormGroup;
  editProfileForm!: FormGroup;
  courseForm!: FormGroup;
  courses: any[] = [];
  enrolledCourses: any[] = [];
  isEditMode: boolean = false;
  selectedCourseId: number | null = null;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private trainerService: TrainerService,
    private userService: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadCourses();

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      designation: ['', Validators.required],
      expertise: ['', Validators.required]
    });

    this.editProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      tags: ['', [Validators.required, this.tagsValidator]],
      rating: [''], // Initialize with empty data
      badge: ['']  // Initialize with empty data
    });
  }

  tagsValidator(control: any) {
    if (!control.value || typeof control.value !== 'string') {
      return { 'required': true };
    }
    const tags = control.value.split(',').map((tag: string) => tag.trim());
    return tags.length >= 2 ? null : { 'required': true };
  }

  loadProfile(): void {
    const trainerId = sessionStorage.getItem('userId');
    if (trainerId) {
      this.userService.getUserById(trainerId).subscribe(user => {
        this.trainerService.getTrainerById(trainerId).subscribe(trainer => {
          this.user = { ...user, ...trainer };
          this.profileForm.patchValue(this.user);
          this.editProfileForm.patchValue(this.user);
        });
      });
    }
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  onSubmitProfile(): void {
    if (this.profileForm.valid) {
      const trainerId = sessionStorage.getItem('userId');
      if (trainerId) {
        const userData = {
          id: trainerId,
          name: this.profileForm.value.name,
          email: this.profileForm.value.email,
          role: 'trainer'
        };
        const trainerData = {
          id: trainerId,
          designation: this.profileForm.value.designation,
          expertise: this.profileForm.value.expertise
        };
        this.userService.updateUser(trainerId, userData).subscribe(() => {
          this.trainerService.updateTrainer(trainerId, trainerData).subscribe(() => {
            this.snackBar.open('Profile updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          });
        });
      }
    }
  }

  openCourseDialog(): void {
    this.isEditMode = false;
    this.courseForm.reset();
    this.dialog.open(this.courseDialog);
  }

  editCourse(course: any): void {
    this.isEditMode = true;
    this.selectedCourseId = course.id;
    this.courseForm.patchValue({
      ...course,
      tags: course.tags ? course.tags.join(', ') : '',
      rating: course.rating || '', // Use existing rating or empty if not present
      badge: course.badge || ''   // Use existing badge or empty if not present
    });
    this.dialog.open(this.courseDialog);
  }

  onSubmitCourse(): void {
    if (this.courseForm.valid) {
      const trainerId = sessionStorage.getItem('userId');
      if (trainerId) {
        const courseData = { 
          ...this.courseForm.value, 
          tags: this.courseForm.value.tags.split(',').map((tag: string) => tag.trim()),
          rating: this.courseForm.value.rating || '', // Ensure rating is included
          badge: this.courseForm.value.badge || ''   // Ensure badge is included
           
        };
        if (this.isEditMode && this.selectedCourseId !== null) {
          this.courseService.updateCourse(this.selectedCourseId, courseData).subscribe(() => {
            this.loadCourses();
            this.dialog.closeAll();
            this.snackBar.open('Course updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          });
        } else {
          this.courseService.addCourse(courseData).subscribe(() => {
            this.loadCourses();
            this.dialog.closeAll();
            this.snackBar.open('Course added successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          });
        }
      }
    }
  }

  confirmDeleteCourse(courseId: number): void {
    this.selectedCourseId = courseId;
    this.dialog.open(this.confirmDialog);
  }

  deleteCourse(): void {
    if (this.selectedCourseId !== null) {
      this.courseService.deleteCourse(this.selectedCourseId).subscribe(() => {
        this.loadCourses();
        this.dialog.closeAll();
        this.snackBar.open('Course deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.courseForm.patchValue({ image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  editProfile(): void {
    this.dialog.open(this.editProfileDialog);
  }

  updateProfile(): void {
    if (this.editProfileForm.valid) {
      const trainerId = sessionStorage.getItem('userId');
      const email = this.editProfileForm.value.email;
      this.userService.checkEmailExists(email).subscribe(emailExists => {
        if (emailExists && email !== this.user.email) {
          alert('Email already exists. Please use a different email.');
        } else {
      if (trainerId) {
        const userData = {
          id: trainerId,
          name: this.editProfileForm.value.name,
          email: this.editProfileForm.value.email, 
          phone: this.editProfileForm.value.phone,
          password: this.user.password,
          role: 'trainer'
        };
        const trainerData = {
          id: trainerId,
          designation: this.user.designation, // Keep the designation unchanged
          expertise: this.user.expertise // Keep the expertise unchanged
        };
        this.userService.updateUser(trainerId, userData).subscribe(() => {
          this.trainerService.updateTrainer(trainerId, trainerData).subscribe(() => {
            this.loadProfile();
            this.dialog.closeAll();
            this.snackBar.open('Profile updated successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          });
        });
      }
    }
  });
  }
  }

  closeEditProfileDialog(): void {
    this.dialog.closeAll();
  }

  closeConfirmDialog(): void {
    this.dialog.closeAll();
  }
}