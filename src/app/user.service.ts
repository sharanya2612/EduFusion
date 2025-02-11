import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

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

  // updatePassword(email: string, newPassword: string): Observable<any> {
  //   return this.http.get<any[]>(this.apiUrl).pipe(
  //     map(users => users.find(user => user.email === email)),
  //     switchMap(user => {
  //       if (user) {
  //         user.password = newPassword;
  //         user.confirmPassword = newPassword;
  //         return this.http.put(`${this.apiUrl}/${user.id}`, user);
  //       } else {
  //         throw new Error('User not found');
  //       }
  //     })
  //   );
  // }
  generateResetToken(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      switchMap(users => {
        if (users.length === 0) throw new Error('Email not found');
        
        const user = users[0];
        const resetToken = uuidv4();
        // const resetTokenExpiry = new Date(Date.now() + 36000000).toISOString(); // 1 hour expiry
        
        return this.http.patch<any>(`${this.apiUrl}/${user.id}`, {
          resetToken
          // resetTokenExpiry
        });
      })
    );
  }
  validateResetToken(token: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?resetToken=${token}`).pipe(
      switchMap(users => {
        if (users.length === 0) throw new Error('Invalid token');
        
        const user = users.find(u => u.resetToken === token);
        if (!user) throw new Error('Invalid token');
        // const now = new Date();
        
        // if (user.resetTokenExpiry < now) {
        //   throw new Error('Token expired');
        // }

        return new Observable(observer => {
          observer.next({ valid: true, email: user.email });
          observer.complete();
        });
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?resetToken=${token}`).pipe(
      switchMap(users => {
        if (users.length === 0) throw new Error('Invalid token');
        
        const user = users.find(u => u.resetToken === token);
        if (!user) throw new Error('Invalid token');
  
        // Uncomment and use if token expiration check is needed
        // const now = new Date();
        // if (new Date(user.resetTokenExpiry) < now) {
        //   throw new Error('Token expired');
        // }
  
        return this.http.patch<any>(`${this.apiUrl}/${user.id}`, {
          password: newPassword,
          resetToken: null
        });
      })
    );
  }
}
