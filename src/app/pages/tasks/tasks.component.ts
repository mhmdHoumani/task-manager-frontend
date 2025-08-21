import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  // This page component wraps the task list functionality
  // You could add page-specific logic here like:
  // - Page title management
  // - Analytics tracking
  // - Page-level loading states
  // - Breadcrumbs
  // etc.
}
