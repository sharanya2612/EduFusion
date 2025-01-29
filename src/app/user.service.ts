import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === email && user.password === password))
    );
  }

  checkEmail(email: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === email))
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.some(user => user.email === email))
    );
  }
  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData);
  }

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === email)),
      switchMap(user => {
        if (user) {
          user.password = newPassword;
          user.confirmPassword = newPassword;
          return this.http.put(`${this.apiUrl}/${user.id}`, user);
        } else {
          throw new Error('User not found');
        }
      })
    );
  }
}
