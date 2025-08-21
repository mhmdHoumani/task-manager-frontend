import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-view.component.html',
})
export class TaskViewComponent {
  @Input() task!: Task;

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      Work: 'bg-blue-100 text-blue-800',
      Personal: 'bg-green-100 text-green-800',
      Shopping: 'bg-purple-100 text-purple-800',
      Health: 'bg-red-100 text-red-800',
      Finance: 'bg-yellow-100 text-yellow-800',
      Education: 'bg-indigo-100 text-indigo-800',
      Travel: 'bg-pink-100 text-pink-800',
      General: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors['General'];
  }

  getStatusColor(): string {
    return this.task.completed ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  }

  getStatusText(): string {
    return this.task.completed ? 'Completed' : 'In Progress';
  }
}
