import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordStrengthValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.value;

  if (!password) {
    return null;
  }

  const errors: any = {};

  // Check length
  if (password.length < 8) {
    errors.minLength = true;
  }

  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    errors.requiresUppercase = true;
  }

  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    errors.requiresLowercase = true;
  }

  // Check for number
  if (!/\d/.test(password)) {
    errors.requiresNumber = true;
  }

  // Check for special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.requiresSpecialChar = true;
  }

  return Object.keys(errors).length === 0 ? null : { passwordStrength: errors };
};
