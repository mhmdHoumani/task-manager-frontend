import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { LucideAngularModule, Check, RotateCcw, Trash2, Edit, Eye } from 'lucide-angular';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() toggleComplete = new EventEmitter<Task>();
  @Output() viewTask = new EventEmitter<Task>();

  readonly Check = Check;
  readonly RotateCcw = RotateCcw;
  readonly Trash2 = Trash2;
  readonly Edit = Edit;
  readonly Eye = Eye;

  onEdit(): void {
    this.editTask.emit(this.task);
  }

  onDelete(): void {
    if (this.task._id && confirm('Are you sure you want to delete this task?')) {
      this.deleteTask.emit(this.task._id);
    }
  }

  onToggleComplete(): void {
    this.toggleComplete.emit(this.task);
  }

  onView(): void {
    this.viewTask.emit(this.task);
  }
}
