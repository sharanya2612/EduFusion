import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoursesComponent } from './courses/courses.component';
import { PopularCoursesComponent } from './popular-courses/popular-courses.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  {path: 'login',component: LoginComponent},
  { path: 'signup',component: SignupComponent},
  { path: 'all-courses', component: CoursesComponent },
  { path: 'popular-courses', component: PopularCoursesComponent},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'new-password', component: NewPasswordComponent},
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'user' } },
  { path: 'trainer-dashboard', component: TrainerDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'trainer' } },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  // { path: 'blog', component: BlogComponent },
  // { path: 'other-options', component: OtherOptionsComponent }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
