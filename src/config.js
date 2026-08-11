export const API_BASE = import.meta.env.VITE_API_URL || '';

export function getMediaUrl(url) {
  if (!url) return '';
  
  // If it is an external URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // If it is a backend upload
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${API_BASE}${cleanUrl}`;
  }

  // If it is a local static asset (starts with /), prepend the Vite BASE_URL (crucial for gh-pages subfolders)
  if (url.startsWith('/')) {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${base}${url}`;
  }

  return url;
}
