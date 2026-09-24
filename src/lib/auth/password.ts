import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

const COMMON_PASSWORDS = new Set([
  "password",
  "12345678",
  "123456789",
  "qwerty123",
  "password123",
  "admin123",
  "welcome123",
  "letmein123",
  "iloveyou",
  "monkey123",
]);

export interface PasswordValidationResult {
  valid: boolean;
  message?: string;
}

export function validatePasswordStrength(password: string): PasswordValidationResult {
  if (!password || password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }

  if (password.length > 128) {
    return { valid: false, message: "Password cannot exceed 128 characters." };
  }

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    return { valid: false, message: "This password is too common and insecure. Choose a stronger password." };
  }

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasUpper || !hasLower || !hasNumber) {
    return {
      valid: false,
      message: "Password must include at least one uppercase letter, one lowercase letter, and one number.",
    };
  }

  return { valid: true };
}

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}
