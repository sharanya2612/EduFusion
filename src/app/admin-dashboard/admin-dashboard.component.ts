import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { UserService } from '../user.service';
import { TrainerService } from '../trainers.service';
import { CourseService } from '../course.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, registerables } from 'chart.js';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,

  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('userDialog') userDialog!: TemplateRef<any>;
  @ViewChild('trainerDialog') trainerDialog!: TemplateRef<any>;
  @ViewChild('courseDialog') courseDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  contactMessages: any[] = [];
  users: any[] = [];
  trainers: any[] = [];
  courses: any[] = [];
  showUserList: boolean = false;
  showTrainerList: boolean = false;
  showCourseList: boolean = false;
  showContactMessageList: boolean = false;
  userForm!: FormGroup;
  trainerForm!: FormGroup;
  courseForm!: FormGroup;
  deleteUserId: number | null = null;
  deleteTrainerId: number | null = null;
  selectedCourse: any = null;
  enrollmentChart: any;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private userService: UserService,
    private trainerService: TrainerService,
    private courseService: CourseService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private chartService: ChartService
  ) { Chart.register(...registerables);}

  backgroundColors: string[] = [
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(153, 102, 255, 0.2)'
  ];
  borderColors: string[] = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(153, 102, 255, 1)'
  ];


  ngOnInit(): void {
    this.loadContacts();
    this.loadUsers();
    this.loadTrainers();
    this.loadCourses();
    this.fetchEnrollmentData();


    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

     this.trainerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      designation: ['', Validators.required],
      expertise: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      badge: ['']
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contactMessages = data;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.filter(user => user.role === 'user');
    });
  }

  loadTrainers(): void {
    this.userService.getUsers().subscribe(users => {
      const trainerUsers = users.filter(user => user.role === 'trainer');
      this.trainerService.getTrainers().subscribe(trainerDetails => {
        this.trainers = trainerUsers.map(trainerUser => {
          const details = trainerDetails.find(detail => detail.id === trainerUser.id);
          return {
            ...trainerUser,
            designation: details ? details.designation : '',
            expertise: details ? details.expertise : ''
          };
        });
      });
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  showUsers(): void {
    this.showUserList = true;
    this.showTrainerList = false;
    this.showCourseList = false;
    this.showContactMessageList = false;
  }

  showTrainers(): void {
    this.showUserList = false;
    this.showTrainerList = true;
    this.showCourseList = false;
    this.showContactMessageList = false;
  }

  showCourses(): void {
    this.showUserList = false;
    this.showTrainerList = false;
    this.showCourseList = true;
    this.showContactMessageList = false;
  }

  showContactMessages(): void {
    this.showUserList = false;
    this.showTrainerList = false;
    this.showCourseList = false;
    this.showContactMessageList = true;
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(this.userDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  openTrainerDialog(): void {
    const dialogRef = this.dialog.open(this.trainerDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTrainer(result);
      }
    });
  }

  openCourseDialog(course?: any): void {
    if (course) {
      this.selectedCourse = course;
      this.courseForm.patchValue(course);
    } else {
      this.selectedCourse = null;
      this.courseForm.reset();
    }
    this.dialog.open(this.courseDialog);
  }

  addUser(newUser: any): void {
    newUser.role = 'user';
    this.userService.addUser(newUser).subscribe(() => {
      this.loadUsers();
      this.dialog.closeAll();
      this.snackBar.open('User added successfully!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
    });
  }

  addTrainer(newTrainer: any): void {
    const trainerDetails = {
      name: newTrainer.name,
      email: newTrainer.email,
      phone: newTrainer.phone,
      password: newTrainer.password,
      role: 'trainer'
    };

    this.userService.addUser(trainerDetails).subscribe(user => {
      const trainerExpertise = {
        id: user.id,
        designation: newTrainer.designation,
        expertise: newTrainer.expertise
      };

      this.trainerService.addTrainer(trainerExpertise).subscribe(() => {
        this.loadTrainers();
        this.dialog.closeAll();
        this.snackBar.open('Trainer added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
    });
  }

  addCourse(newCourse: any): void {
    if (this.selectedCourse) {
      const updatedCourse = {
        ...this.selectedCourse,
        rating: newCourse.rating,
        badge: newCourse.badge
      };
      this.courseService.updateCourse(this.selectedCourse.id, updatedCourse).subscribe(() => {
        this.loadCourses();
        this.dialog.closeAll();
        this.snackBar.open('Course updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
    } else {
      this.courseService.addCourse(newCourse).subscribe(() => {
        this.loadCourses();
        this.dialog.closeAll();
        this.snackBar.open('Course added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
    }
  }

  onSubmitUser(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.addUser(newUser);
    }
  }

  onSubmitTrainer(): void {
    if (this.trainerForm.valid) {
      const newTrainer = this.trainerForm.value;
      this.addTrainer(newTrainer);
    }
  }

  onSubmitCourse(): void {
    if (this.courseForm.valid) {
      const newCourse = this.courseForm.value;
      this.addCourse(newCourse);
    }
  }

  confirmDeleteUser(userId: number): void {
    this.deleteUserId = userId;
    this.dialog.open(this.confirmDialog);
  }

  confirmDeleteTrainer(trainerId: number): void {
    this.deleteTrainerId = trainerId;
    this.dialog.open(this.confirmDialog);
  }

  deleteUser(): void {
    if (this.deleteUserId !== null) {
      this.userService.deleteUser(this.deleteUserId).subscribe(() => {
        this.loadUsers();
        this.dialog.closeAll();
        this.snackBar.open('User deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
    }
  }

  deleteTrainer(): void {
    if (this.deleteTrainerId !== null) {
      this.trainerService.deleteTrainer(this.deleteTrainerId).subscribe(() => {
        this.userService.deleteUser(this.deleteTrainerId!).subscribe(() => {
          this.loadTrainers();
          this.loadUsers();
          this.dialog.closeAll();
          this.snackBar.open('Trainer deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        });
      });
    }
  }
  fetchEnrollmentData() {
    this.chartService.getEnrollmentData().subscribe(data => {
      const courseEnrollmentCount = this.processEnrollmentData(data.enrollments, data.courses);
      this.renderChart(courseEnrollmentCount);
    });
  }

  processEnrollmentData(enrollments: any[], courses: any[]): { [key: string]: number } {
    const courseEnrollmentCount: { [key: string]: number } = {};

    enrollments.forEach(enrollment => {
      const course = courses.find(course => course.id === enrollment.courseId);
      if (course) {
        if (courseEnrollmentCount[course.name]) {
          courseEnrollmentCount[course.name]++;
        } else {
          courseEnrollmentCount[course.name] = 1;
        }
      }
    });

    return courseEnrollmentCount;
  }

  renderChart(courseEnrollmentCount: { [key: string]: number }) {
    const courseNames = Object.keys(courseEnrollmentCount);
    const enrolledStudents = Object.values(courseEnrollmentCount);

    this.enrollmentChart = new Chart('enrollmentChart', {
      type: 'bar',
      data: {
        labels: courseNames,
        datasets: [{
          label: '',
          data: enrolledStudents,
          backgroundColor: this.backgroundColors,
          borderColor: this.borderColors,
          // backgroundColor: 'rgba(75, 192, 192, 0.2)',
          // borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}