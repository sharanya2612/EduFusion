import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminsUrl = 'http://localhost:3000/admin';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.adminsUrl}?email=${email}&password=${password}`).pipe(
      map(response => {
        if (response && response.length > 0) {
          return response[0];
        } else {
          return null;
        }
      })
    );
  }

  getAdminById(adminId: string): Observable<any> {
    return this.http.get<any>(`${this.adminsUrl}/${adminId}`);
  }
}