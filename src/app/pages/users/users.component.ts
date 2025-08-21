import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService, User, UserRole } from '../../services/auth/auth.service';
import {
  LucideAngularModule,
  Users as UsersIcon,
  Plus,
  Edit,
  Trash2,
  Shield,
  Eye,
} from 'lucide-angular';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
  showAddForm = false;
  editingUser: User | null = null;

  newUser = {
    name: '',
    email: '',
    password: '',
    role: UserRole.USER,
  };

  readonly UsersIcon = UsersIcon;
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Shield = Shield;
  readonly Eye = Eye;
  readonly UserRole = UserRole;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.http.get<User[]>('http://localhost:3000/users').subscribe({
      next: (users) => {
        console.log('users', users);
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      },
    });
  }

  createUser(): void {
    this.http.post<User>('http://localhost:3000/users', this.newUser).subscribe({
      next: (user) => {
        this.users.push(user);
        this.resetForm();
        this.showAddForm = false;
      },
      error: (error) => {
        console.error('Error creating user:', error);
      },
    });
  }

  // Fix the updateUserRole method
  updateUserRole(user: User, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newRole = target.value as UserRole;

    this.http.patch(`http://localhost:3000/users/${user._id}`, { role: newRole }).subscribe({
      next: () => {
        user.role = newRole;
      },
      error: (error) => {
        console.error('Error updating user role:', error);
        // Reset the select value on error
        target.value = user.role;
      },
    });
  }
  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.http.delete(`http://localhost:3000/users/${user._id}`).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u._id !== user._id);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
    }
  }

  resetForm(): void {
    this.newUser = {
      name: '',
      email: '',
      password: '',
      role: UserRole.USER,
    };
  }

  getRoleColor(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.USER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.VISITOR:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRoleIcon(role: UserRole): any {
    switch (role) {
      case UserRole.ADMIN:
        return this.Shield;
      case UserRole.USER:
        return this.UsersIcon;
      case UserRole.VISITOR:
        return this.Eye;
      default:
        return this.UsersIcon;
    }
  }

  trackByUserId(index: number, user: User): string {
    console.log('user', user);
    return user._id;
  }

  getAdminCount(): number {
    return this.users.filter((user) => user.role === UserRole.ADMIN).length;
  }

  getUserCount(): number {
    return this.users.filter((user) => user.role === UserRole.USER).length;
  }

  getVisitorCount(): number {
    return this.users.filter((user) => user.role === UserRole.VISITOR).length;
  }
}
