# PathForge AI - Security Architecture & Threat Model (SECURITY.md)

This document describes the security policies, threat model, mitigation strategies, and known limitations of the **PathForge AI: AI Learning Path Generator** platform.

---

## 1. Threat Model & Mitigations

### 1.1 Credential & Account Security
- **Threat**: Brute-force guessing, dictionary attacks, and credential stuffing.
- **Mitigation**:
  - Passwords are strictly hashed with **bcrypt (cost factor 12)** with automatic per-user cryptographic salts.
  - Password policy enforces minimum 8 characters, uppercase, lowercase, numbers, and checks against a blacklist of top compromised passwords.
  - Rate limiting on `/api/auth/login` restricts to 8 attempts per 15 minutes per IP/email before locking out the request with HTTP 429.
  - Generic authentication error messages ("Invalid email or password") prevent username/email enumeration.
  - Sessions use **HttpOnly, Secure, SameSite=Lax** cookies with HMAC-SHA256 signatures, preventing client-side JavaScript access and XSS token exfiltration.

### 1.2 Data Isolation & AI Provider Privacy
- **Threat**: Leaking Personal Identifiable Information (PII) to external AI LLMs.
- **Mitigation**:
  - User personal data (names, emails, passwords, user IDs) is **never** sent to any external AI provider.
  - AI requests receive solely the sanitized technical inputs: `technologies`, `level`, `goal`, `hoursPerWeek`, `durationWeeks`.

### 1.3 Anti-Hallucination & Malicious Links
- **Threat**: LLMs hallucinating non-existent, broken, or malicious third-party URLs.
- **Mitigation**:
  - The AI prompt explicitly forbids generating raw URLs.
  - The application backend enforces a strict allowlist of verified official documentation domains (`react.dev`, `docs.oracle.com`, `docs.python.org`, `docs.docker.com`, etc.) or constructs safe canonical search queries.

### 1.4 Prompt Injection & Adversarial Inputs
- **Threat**: Malicious users injecting prompt overrides (e.g., "Ignore previous instructions", system prompt theft, or HTML tags).
- **Mitigation**:
  - User inputs are capped in length (max 100 characters for stack and goal).
  - Regular expressions reject suspicious override patterns (`/ignore (all )?previous instructions/i`, `developer mode`, `<script>`, etc.).
  - Output is strictly validated against a typed Zod schema (`LearningPathOutputSchema`). Unrecognized or malformed schemas trigger a retry or cascade to the curated template engine.

### 1.5 Cross-Site Scripting (XSS) & Content Security Policy (CSP)
- **Threat**: Injection of malicious scripts in topic titles, descriptions, or notes.
- **Mitigation**:
  - React auto-escapes all strings rendered in JSX. `dangerouslySetInnerHTML` is prohibited across all user and AI content.
  - Strict Content Security Policy (CSP) in `next.config.mjs` and dynamic HTTP response headers in `middleware.ts`.
  - `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

### 1.6 Insecure Direct Object References (IDOR)
- **Threat**: Users modifying other users' learning paths, progress checkboxes, or study notes.
- **Mitigation**:
  - All mutating endpoints (`/api/progress/toggle`, `/api/notes`, `/api/user/*`) inspect the authenticated session from cookies and scope queries strictly to `where: { userId: session.userId }`.

### 1.7 DoS & Free Quota Exhaustion
- **Threat**: Excessive API requests exhausting free LLM quotas.
- **Mitigation**:
  - Self-contained sliding-window rate limiting per IP (5 requests/day for guests, 15 requests/day for registered users).
  - SHA256 request hash caching (`tech + level + goal + hours + weeks`) prevents duplicate generations for identical parameters.
  - Automatic fallback cascade: Gemini $\rightarrow$ Groq $\rightarrow$ OpenRouter $\rightarrow$ Ollama $\rightarrow$ Curated Roadmap Templates.

---

## 2. Known Limitations & Future Roadmap
- **Email Verification**: Production environments using Brevo or Resend SMTP should set verified tokens. For local dev zero-dependency, accounts are created with verified timestamps.
- **2FA TOTP**: 2FA database flag is prepared; full QR code generation can be enabled via standard Authenticator apps.

---

## 3. Reporting Vulnerabilities
If you discover a potential vulnerability, please email `security@pathforge.ai` with reproduction steps. Do not open public issues for sensitive security findings.
