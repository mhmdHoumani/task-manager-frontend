import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  CheckSquare,
  Home,
  Info,
  LogOut,
  UserIcon,
  Users,
  Shield,
} from 'lucide-angular';
import { AuthService, UserRole } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  currentUser$: typeof this.authService.currentUser$;

  readonly CheckSquare = CheckSquare;
  readonly Home = Home;
  readonly Info = Info;
  readonly LogOut = LogOut;
  readonly UserIcon = UserIcon;
  readonly Users = Users;
  readonly Shield = Shield;
  readonly UserRole = UserRole;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  canAccessTasks(): boolean {
    return this.authService.canAccessTasks();
  }

  canAccessUsers(): boolean {
    return this.authService.canAccessUsers();
  }

  getUserRoleColor(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'text-red-600';
      case UserRole.USER:
        return 'text-blue-600';
      case UserRole.VISITOR:
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  }
}
