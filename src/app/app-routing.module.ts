import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CoursesComponent } from './courses/courses.component';
import { PopularCoursesComponent } from './popular-courses/popular-courses.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  {path: 'login',component: LoginComponent},
  { path: 'signup',component: SignupComponent},
  { path: 'all-courses', component: CoursesComponent },
  { path: 'popular-courses', component: PopularCoursesComponent}
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
