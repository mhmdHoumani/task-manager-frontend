import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page (default)
  { path: 'tasks', component: TasksComponent }, // Tasks page
  { path: 'about', component: AboutComponent }, // About page
  { path: '404', component: NotFoundComponent }, // ← Add 404 page
  { path: '**', redirectTo: '404' }, // ← Redirect unknown routes to 404
];
