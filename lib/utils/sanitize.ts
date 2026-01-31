// Simple input sanitization for feedback comments
// Prevents XSS by escaping HTML entities

export function sanitizeComment(input: string): string {
  if (!input) return "";

  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
