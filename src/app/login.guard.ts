import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      return this.userService.getUserById(userId).pipe(
        map(user => {
          if (user) {
            if (user.role === 'user') {
              this.router.navigate(['/user-dashboard']);
            } else if (user.role === 'trainer') {
              this.router.navigate(['/trainer-dashboard']);
            }
            return false;
          } else {
            return true;
          }
        })
      );
    }
    return true;
  }
}