// User Cookie Management with Privacy Protection
import { AntiFingerprint } from './antiFingerprint';

const COOKIE_NAME = "portfolio_user_id";
const COOKIE_EXPIRY_DAYS = 365; // 1 year

/**
 * Generates a privacy-friendly user ID
 * Uses session-based ID that changes per browser session
 */
function generateUserId(): string {
  // Use privacy-friendly session ID instead of persistent fingerprint
  return AntiFingerprint.generatePrivacyFriendlyId();
}

/**
 * Sets a cookie with the given name, value, and expiry days
 */
function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/**
 * Gets a cookie value by name
 */
function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

/**
 * Gets or creates a user ID
 * If the user doesn't have a cookie, creates one
 * Returns the user ID
 */
export function getUserId(): string {
  let userId = getCookie(COOKIE_NAME);

  if (!userId) {
    userId = generateUserId();
    setCookie(COOKIE_NAME, userId, COOKIE_EXPIRY_DAYS);
    console.log("New user detected. Assigned ID:", userId);
  } else {
    console.log("Returning user. ID:", userId);
  }

  return userId;
}

/**
 * Checks if the user is a returning visitor
 */
export function isReturningUser(): boolean {
  return getCookie(COOKIE_NAME) !== null;
}

/**
 * Deletes the user cookie (for testing purposes)
 */
export function deleteUserCookie(): void {
  document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  console.log("User cookie deleted");
}
