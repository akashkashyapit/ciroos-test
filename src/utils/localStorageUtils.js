/**
 * Safe localStorage helpers with namespacing
 */
const NAMESPACE = 'interactive-dashboard';

export function saveToStorage(key, value) {
  try {
    const namespacedKey = `${NAMESPACE}:${key}`;
    localStorage.setItem(namespacedKey, JSON.stringify(value));
  } catch (_) {
    // no-op in private mode or SSR
  }
}

export function getFromStorage(key, fallback) {
  try {
    const namespacedKey = `${NAMESPACE}:${key}`;
    const raw = localStorage.getItem(namespacedKey);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}

