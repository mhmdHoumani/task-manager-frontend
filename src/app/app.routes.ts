import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AboutComponent } from './pages/about/about.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { authGuard, adminGuard, userOrAdminGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  // Public routes (only for non-logged-in users)
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },

  // Protected routes with role-based access
  { path: '', component: HomeComponent, canActivate: [authGuard] }, // All logged-in users
  { path: 'about', component: AboutComponent, canActivate: [authGuard] }, // All logged-in users
  { path: 'tasks', component: TasksComponent, canActivate: [userOrAdminGuard] }, // Users and Admins only
  { path: 'users', component: UsersComponent, canActivate: [adminGuard] }, // Admins only

  // Error pages
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
