import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-enroll-dialog',
  standalone: false,
  
  templateUrl: './enroll-dialog.component.html',
  styleUrl: './enroll-dialog.component.css'
})
export class EnrollDialogComponent {
  studentName: string = '';
  studentEmail: string = '';

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
    console.log('Enroll form submitted:', {
      courseName: this.data.name,
      courseCategory: this.data.category,
      studentName: this.studentName,
      studentEmail: this.studentEmail
    });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}