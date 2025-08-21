import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Shield, ArrowLeft, Home } from 'lucide-angular';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './unauthorized.component.html',
})
export class UnauthorizedComponent {
  readonly Shield = Shield;
  readonly ArrowLeft = ArrowLeft;
  readonly Home = Home;

  goBack(): void {
    window.history.back();
  }
}
