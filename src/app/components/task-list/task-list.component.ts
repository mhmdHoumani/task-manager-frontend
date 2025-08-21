import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';
import { ModalComponent } from '../modal/modal.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

// Import Lucide icons
import { LucideAngularModule, Check, RotateCcw, Trash2, Edit, X, Save, Plus } from 'lucide-angular';
import { TaskViewComponent } from '../task-view/task-view.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskFormComponent,
    TaskItemComponent,
    EditTaskFormComponent,
    TaskViewComponent,
    LucideAngularModule,
    ModalComponent,
  ], // Add LucideAngularModule
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoadingTasks = true;
  isAddTaskModalOpen = false;
  isEditTaskModalOpen = false;
  isViewTaskModalOpen = false;
  taskToEdit: Task | null = null;
  taskToView: Task | null = null;

  // Register icons
  readonly Check = Check;
  readonly RotateCcw = RotateCcw;
  readonly Trash2 = Trash2;
  readonly Edit = Edit;
  readonly X = X;
  readonly Save = Save;
  readonly Plus = Plus;

  constructor(private taskService: TaskService) {}

  // ... rest of your methods stay the same ...
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoadingTasks = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('Tasks loaded:', tasks);
        this.isLoadingTasks = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.tasks = [];
        this.isLoadingTasks = false;
      },
    });
  }

  // View Task Modal
  openViewTaskModal(task: Task): void {
    this.taskToView = task;
    this.isViewTaskModalOpen = true;
  }

  closeViewTaskModal(): void {
    this.isViewTaskModalOpen = false;
    this.taskToView = null;
  }

  // Add Task Modal
  openAddTaskModal(): void {
    this.isAddTaskModalOpen = true;
  }

  closeAddTaskModal(): void {
    this.isAddTaskModalOpen = false;
  }

  onTaskCreated(task: Task): void {
    this.tasks.unshift(task);
    this.closeAddTaskModal();
  }

  // Edit Task Modal
  openEditTaskModal(task: Task): void {
    this.taskToEdit = task;
    this.isEditTaskModalOpen = true;
  }

  closeEditTaskModal(): void {
    this.isEditTaskModalOpen = false;
    this.taskToEdit = null;
  }

  onTaskSaved(updatedTaskData: Partial<Task>): void {
    if (this.taskToEdit?._id) {
      this.taskService.updateTask(this.taskToEdit._id, updatedTaskData).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex((t) => t._id === updatedTask._id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.closeEditTaskModal();
        },
        error: (error) => {
          console.error('Error updating task:', error);
          alert('Failed to update task');
        },
      });
    }
  }

  // Task Actions
  onToggleComplete(task: Task): void {
    if (task._id) {
      this.taskService.updateTask(task._id, { completed: !task.completed }).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex((t) => t._id === updatedTask._id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        },
        error: (error) => {
          console.error('Error toggling task:', error);
          task.completed = !task.completed;
        },
      });
    }
  }

  onDeleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
      },
    });
  }

  trackByTaskId(index: number, task: Task): string {
    return task._id || index.toString();
  }
}
