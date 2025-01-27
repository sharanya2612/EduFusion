import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private loginStatus = new BehaviorSubject<boolean>(!!sessionStorage.getItem('userId'));

  loginStatus$ = this.loginStatus.asObservable();

  updateLoginStatus(status: boolean): void {
    this.loginStatus.next(status);
  }
}
