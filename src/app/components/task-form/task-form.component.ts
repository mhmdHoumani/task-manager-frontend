import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

// Import Lucide icons
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule], // Add LucideAngularModule
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  @Output() taskCreated = new EventEmitter<Task>();

  // Register icon
  readonly Plus = Plus;

  // Add predefined categories
  categories = [
    'General',
    'Work',
    'Personal',
    'Shopping',
    'Health',
    'Finance',
    'Education',
    'Travel',
  ];

  task = {
    title: '',
    description: '',
    completed: false,
    category: 'General',
  };

  constructor(private taskService: TaskService) {}

  // ... rest of your methods stay the same ...
  onSubmit(): void {
    if (this.task.title.trim()) {
      this.taskService.createTask(this.task).subscribe({
        next: (newTask) => {
          this.taskCreated.emit(newTask);
          this.resetForm();
          console.log('Task created:', newTask);
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.taskCreated.emit({
            _id: Date.now().toString(),
            ...this.task,
            createdAt: new Date(),
          });
          this.resetForm();
        },
      });
    }
  }

  resetForm(): void {
    this.task = {
      title: '',
      description: '',
      completed: false,
      category: '',
    };
  }
}
