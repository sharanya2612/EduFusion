import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  loadCourses(forceReload: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  addCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, course);
  }
  searchCourses(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${query}`);
  }
  getCourseById(courseId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}`);
  }
  updateCourse(courseId: number, courseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}`, courseData);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}`);
  }

}
