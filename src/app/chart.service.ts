import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private enrollmentsUrl = 'http://localhost:3000/courses-enrolled';
  private coursesUrl = 'http://localhost:3000/courses';
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getEnrollmentData(): Observable<any> {
    return forkJoin({
      enrollments: this.http.get<any[]>(this.enrollmentsUrl),
      courses: this.http.get<any[]>(this.coursesUrl),
      users: this.http.get<any[]>(this.usersUrl)
    });
  }
}
