import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, CheckSquare, Home, Info, LogOut, UserIcon } from 'lucide-angular';
import { AuthService } from '../../services/auth/auth.service';

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
}
