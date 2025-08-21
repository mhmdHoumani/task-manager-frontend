import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { LucideAngularModule, Save } from 'lucide-angular';

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './edit-task-form.component.html',
})
export class EditTaskFormComponent implements OnInit {
  @Input() task!: Task;
  @Output() saveTask = new EventEmitter<Partial<Task>>();

  readonly Save = Save;

  // Add categories
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

  editedTask = {
    title: '',
    description: '',
    category: 'General',
  };

  ngOnInit(): void {
    // Initialize form with task data
    this.editedTask = {
      title: this.task.title,
      description: this.task.description || '',
      category: this.task.category || 'General',
    };
  }

  onSubmit(): void {
    if (this.editedTask.title.trim()) {
      this.saveTask.emit(this.editedTask);
    }
  }
}
