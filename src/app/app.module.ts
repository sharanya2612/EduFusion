import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { HeroComponent } from './hero/hero.component';
import { TrainersComponent } from './trainers/trainers.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material/material.module';
import { PopularCoursesComponent } from './popular-courses/popular-courses.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import {HttpClientModule } from'@angular/common/http';
import { EnrollDialogComponent } from './enroll-dialog/enroll-dialog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FaqComponent } from './faq/faq.component';
import { UpdateAdminPassComponent } from './update-admin-pass/update-admin-pass.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermOfServiceComponent } from './term-of-service/term-of-service.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { ModalComponent } from './modal/modal.component';
import { CourseManagementDialogComponent } from './course-management-dialog/course-management-dialog.component';
import { ProjectManagementDialogComponent } from './project-management-dialog/project-management-dialog.component';
import { InterviewPreparationDialogComponent } from './interview-preparation-dialog/interview-preparation-dialog.component';
import { LearningAnalyticsDialogComponent } from './learning-analytics-dialog/learning-analytics-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    HeroComponent,
    TrainersComponent,
    TestimonialComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    CoursesComponent,
    PopularCoursesComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    EnrollDialogComponent,
    UserDashboardComponent,
    TrainerDashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    FaqComponent,
    UpdateAdminPassComponent,
    PrivacyPolicyComponent,
    TermOfServiceComponent,
    CookiePolicyComponent,
    ModalComponent,
    CourseManagementDialogComponent,
    ProjectManagementDialogComponent,
    InterviewPreparationDialogComponent,
    LearningAnalyticsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule, 
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
