import { API_URLS } from './api-config';

// Helper function to make authenticated API requests
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('admin_token');
  
  const headers = new Headers(options.headers as HeadersInit);
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Global 401 handling: clear auth and redirect to login
  if (response.status === 401) {
    try {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    } catch {}
    if (typeof window !== 'undefined') {
      // Redirect to login page
      window.location.href = '/login';
    }
  }

  return response;
}

// Helper to get API URL with auth headers
export function getAuthHeaders() {
  const token = localStorage.getItem('admin_token');
  
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
}

