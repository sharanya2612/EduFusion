import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/courses-enrolled';

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  enrollCourse(enrollmentData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, enrollmentData);
  }
  getEnrollmentByUserAndCourse(userId: string, courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?userId=${userId}&courseId=${courseId}`);
  }

  deleteEnrollmentById(enrollmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${enrollmentId}`);
  }
}