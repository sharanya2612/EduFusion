import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = 'http://localhost:3000/trainers';

  constructor(private http: HttpClient) {}

  getTrainers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTrainer(trainer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, trainer);
  }

  deleteTrainer(trainerId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${trainerId}`);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(response => {
        if (response && response.length > 0) {
          return response[0];
        } else {
          return null;
        }
      })
    );
  }


  getTrainerById(trainerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${trainerId}`);
  }

  updateTrainer(trainerId: string, trainerData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${trainerId}`, trainerData);
  }
}