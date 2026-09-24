import test from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// 1. Password validation tests
const COMMON_PASSWORDS = new Set(["password", "12345678", "qwerty123", "password123"]);

function validatePasswordStrength(password) {
  if (!password || password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }
  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    return { valid: false, message: "Password is too common." };
  }
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!hasUpper || !hasLower || !hasNumber) {
    return { valid: false, message: "Missing uppercase, lowercase, or number." };
  }
  return { valid: true };
}

test("Password strength rejects short passwords", () => {
  const res = validatePasswordStrength("Short1!");
  assert.equal(res.valid, false);
});

test("Password strength rejects common passwords", () => {
  const res = validatePasswordStrength("password123");
  assert.equal(res.valid, false);
});

test("Password strength accepts compliant passwords", () => {
  const res = validatePasswordStrength("SuperSecret123!");
  assert.equal(res.valid, true);
});

test("Bcrypt hash and verification round-trip", async () => {
  const plain = "SecureDevPass2026!";
  const hash = await bcrypt.hash(plain, 10);
  const isMatch = await bcrypt.compare(plain, hash);
  const isFalseMatch = await bcrypt.compare("WrongPass", hash);
  assert.equal(isMatch, true);
  assert.equal(isFalseMatch, false);
});

// 2. Token signing & tampering check
const SECRET = "test-secret-key-32-bytes-secure";

function sign(payload) {
  const enc = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(enc).digest("base64url");
  return `${enc}.${sig}`;
}

function verify(token) {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [enc, sig] = parts;
  const expectedSig = crypto.createHmac("sha256", SECRET).update(enc).digest("base64url");
  if (sig !== expectedSig) return null;
  return JSON.parse(Buffer.from(enc, "base64url").toString("utf-8"));
}

test("Session token signing and verification succeeds", () => {
  const user = { userId: "user-123", email: "dev@pathforge.ai", role: "USER" };
  const token = sign(user);
  const verified = verify(token);
  assert.equal(verified.userId, user.userId);
  assert.equal(verified.email, user.email);
});

test("Session token tampering is rejected", () => {
  const user = { userId: "user-123", email: "dev@pathforge.ai", role: "USER" };
  const token = sign(user);
  const tampered = token.slice(0, -3) + "xyz";
  const verified = verify(tampered);
  assert.equal(verified, null);
});
