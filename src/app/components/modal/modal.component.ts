import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Output() closeModal = new EventEmitter<void>();

  readonly X = X;

  onBackdropClick(event: MouseEvent): void {
    // Close modal when clicking outside (backdrop)
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  // Prevent modal from closing when clicking inside
  onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}