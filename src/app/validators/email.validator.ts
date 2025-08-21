import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const strongEmailValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const email = control.value;

  if (!email) {
    return null; // Don't validate empty values (use required validator)
  }

  // Enhanced email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(email);

  return isValid ? null : { invalidEmail: { value: email } };
};

// Additional email checks
export const businessEmailValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const email = control.value;

  if (!email) {
    return null;
  }

  // Block common temporary email domains
  const tempEmailDomains = ['10minutemail.com', 'tempmail.org', 'guerrillamail.com'];
  const domain = email.split('@')[1]?.toLowerCase();

  if (tempEmailDomains.includes(domain)) {
    return { temporaryEmail: true };
  }

  return null;
};
