import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, CheckSquare, Home, Info } from 'lucide-angular';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  readonly CheckSquare = CheckSquare;
  readonly Home = Home;
  readonly Info = Info;
}
