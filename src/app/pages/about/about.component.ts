import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Code, Users, Heart } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  readonly Code = Code;
  readonly Users = Users;
  readonly Heart = Heart;
}
