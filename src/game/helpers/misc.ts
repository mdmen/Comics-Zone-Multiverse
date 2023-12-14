export function generateUniqueId() {
  if (typeof crypto !== 'undefined') {
    return crypto.randomUUID();
  }

  return Math.floor(Math.random() * Date.now())
    .toString(36)
    .slice(0, 10);
}
