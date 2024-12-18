import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainAppComponent } from './pages/main-app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { NopageComponent } from './pages/nopage/nopage.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { authGuard } from './pages/auth.guard';
import { DoctorWelcomeComponent } from './pages/doctor-welcome/doctor-welcome.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'main-bn',
    component: MainAppComponent,
    canActivate: [authGuard,],
    data: { role: 'bn'},
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch:'full'
      },
      {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeComponentModule),
      },
      {
        path: 'monitor',
        component: MonitorComponent,
      },
      {
        path: 'doctor',
        component: DoctorComponent
      },
      {
        path: '**',
        component: NopageComponent
      }
    ]
  },
  {
    path: 'main-bs',
    component: MainAppComponent,
    canActivate: [authGuard,],
    data: { role: 'bs'},
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch:'full'
      },
      {
        path: 'welcome',
        loadChildren: () => import('./pages/doctor-welcome/doctor-welcome.module').then((m) => m.DoctorWelcomeModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./pages/doctor-handle-appointment/doctor-handle.module').then((m) => m.DoctorHandleAppointmentModule)
      },
      {
        path: 'appointment-history',
        loadChildren: () => import('./pages/doctor-appoinment-history/doctor-appoinment-history.module').then((m) => m.DoctorAppoinmentHistoryModule)
      },
      {
        path: 'paitents',
        loadChildren: () => import('./pages/doctor-patient/doctor-patient.module').then((m) => m.DoctorPaitentModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }