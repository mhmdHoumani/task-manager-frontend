import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SignupRequest } from '../../services/auth/auth.service';
import {
  LucideAngularModule,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
} from 'lucide-angular';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm: SignupRequest = {
    name: '',
    email: '',
    password: '',
  };

  confirmPassword = '';
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  readonly User = User;
  readonly Mail = Mail;
  readonly Lock = Lock;
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.isValidForm()) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.signup(this.signupForm).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          this.errorMessage = error.error?.message || 'Signup failed. Please try again.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Email Validation Methods
  isValidEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.signupForm.email);
  }

  isTemporaryEmail(): boolean {
    const tempEmailDomains = [
      '10minutemail.com',
      'tempmail.org',
      'guerrillamail.com',
      'mailinator.com',
    ];
    const domain = this.signupForm.email.split('@')[1]?.toLowerCase();
    return tempEmailDomains.includes(domain);
  }

  getEmailValidationStatus(): 'valid' | 'invalid' | 'temporary' | 'empty' {
    if (!this.signupForm.email) return 'empty';
    if (this.isTemporaryEmail()) return 'temporary';
    if (!this.isValidEmail()) return 'invalid';
    return 'valid';
  }

  // Password Validation Methods (existing + enhanced)
  getPasswordErrors(): string[] {
    const errors = [];
    const password = this.signupForm.password;

    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');

    return errors;
  }

  isPasswordStrong(): boolean {
    return this.getPasswordErrors().length === 0;
  }

  // Password Match Validation
  passwordsMatch(): boolean {
    if (!this.signupForm.password || !this.confirmPassword) return true;
    return this.signupForm.password === this.confirmPassword;
  }

  getPasswordMatchStatus(): 'match' | 'mismatch' | 'empty' {
    if (!this.confirmPassword) return 'empty';
    return this.passwordsMatch() ? 'match' : 'mismatch';
  }

  // Overall Form Validation
  isValidForm(): boolean {
    return !!(
      this.signupForm.name &&
      this.isValidEmail() &&
      !this.isTemporaryEmail() &&
      this.isPasswordStrong() &&
      this.passwordsMatch()
    );
  }
}
