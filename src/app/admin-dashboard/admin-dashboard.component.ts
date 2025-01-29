import { Component,OnInit,TemplateRef, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { UserService } from '../user.service';
import { TrainerService } from '../trainers.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('userDialog') userDialog!: TemplateRef<any>;
  @ViewChild('trainerDialog') trainerDialog!: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  contactMessages: any[] = [];
  users: any[] = [];
  trainers: any[] = [];
  showUserList: boolean = false;
  showTrainerList: boolean = false;
  userForm!: FormGroup;
  trainerForm!: FormGroup;
  deleteUserId: number | null = null;
  deleteTrainerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private userService: UserService,
    private trainerService: TrainerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    this.loadUsers();
    this.loadTrainers();

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
      // Filter users with the role 'trainer'
      const trainerUsers = users.filter(user => user.role === 'trainer');

      // Load additional trainer details from the trainer service
      this.trainerService.getTrainers().subscribe(trainerDetails => {
        // Merge the basic trainer data with the additional details
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

  showUsers(): void {
    this.showUserList = true;
    this.showTrainerList = false;
  }

  showTrainers(): void {
    this.showUserList = false;
    this.showTrainerList = true;
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

  addUser(newUser: any): void {
    newUser.role = 'user';
    this.userService.addUser(newUser).subscribe(() => {
      this.loadUsers();
      this.dialog.closeAll(); // Close the dialog after adding the user
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
        this.dialog.closeAll(); // Close the dialog after adding the trainer
        this.snackBar.open('Trainer added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      });
    });
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
        this.dialog.closeAll(); // Close the confirmation dialog
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
          this.dialog.closeAll(); // Close the confirmation dialog
          this.snackBar.open('Trainer deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        });
      });
    }
  }

}