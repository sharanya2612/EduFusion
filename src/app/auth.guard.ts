import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userId =sessionStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/home']);
      return false;
    }

    return this.userService.getUserById(userId).pipe(
      map(user => {
        if (user) {
          const expectedRole = route.data['expectedRole']; 
          if (user.role === expectedRole) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}