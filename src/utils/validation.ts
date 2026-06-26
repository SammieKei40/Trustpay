export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface PasswordValidationResult extends ValidationResult {
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

export function validatePhone(value: string): ValidationResult {
  const digits = value.replace(/\D/g, '');
  if (!digits) return { isValid: false, message: 'Phone number is required' };
  if (digits.length < 5) return { isValid: false, message: 'Phone number is too short' };
  if (digits.length > 15) return { isValid: false, message: 'Phone number is too long' };
  return { isValid: true, message: '' };
}

export function validatePassword(value: string): PasswordValidationResult {
  const checks = {
    minLength: value.length >= 8,
    hasUppercase: /[A-Z]/.test(value),
    hasLowercase: /[a-z]/.test(value),
    hasNumber: /[0-9]/.test(value),
    hasSpecial: /[^A-Za-z0-9]/.test(value),
  };

  if (!value) {
    return { isValid: false, message: 'Password is required', checks };
  }
  if (!checks.minLength) {
    return { isValid: false, message: 'Password must be at least 8 characters', checks };
  }
  if (!checks.hasUppercase) {
    return { isValid: false, message: 'Password must include an uppercase letter', checks };
  }
  if (!checks.hasLowercase) {
    return { isValid: false, message: 'Password must include a lowercase letter', checks };
  }
  if (!checks.hasNumber) {
    return { isValid: false, message: 'Password must include a number', checks };
  }
  return { isValid: true, message: '', checks };
}

export function validateRequired(value: string, fieldName = 'This field'): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true, message: '' };
}

export function validateEmail(value: string): ValidationResult {
  if (!value.trim()) return { isValid: false, message: 'Email is required' };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return { isValid: false, message: 'Enter a valid email address' };
  return { isValid: true, message: '' };
}
