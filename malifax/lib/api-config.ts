// API Configuration
// Priority: NEXT_PUBLIC_API_URL env var > default localhost
const getBaseUrl = () => {
  // Check for explicit environment variable
  // This allows flexibility for different deployment scenarios
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Default: Use localhost for both development and Docker
  // Docker: Browser connects to host machine's localhost:4000
  // Local dev: Direct connection to localhost:4000
  return 'http://localhost:4000';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  ENDPOINTS: {
    PARTNERS: '/api/partners',
    SHOP_PRODUCTS: '/api/shop-products',
    LOGO_GRIDS: '/api/logo-grids',
    ADMIN_LOGIN: '/api/admin/login',
    ADMIN_CHANGE_PASSWORD: '/api/admin/change-password',
    HEALTH: '/health'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// API URLs
export const API_URLS = {
  BASE_URL: API_CONFIG.BASE_URL,
  PARTNERS: getApiUrl(API_CONFIG.ENDPOINTS.PARTNERS),
  SHOP_PRODUCTS: getApiUrl(API_CONFIG.ENDPOINTS.SHOP_PRODUCTS),
  LOGO_GRIDS: getApiUrl(API_CONFIG.ENDPOINTS.LOGO_GRIDS),
  ADMIN_LOGIN: getApiUrl(API_CONFIG.ENDPOINTS.ADMIN_LOGIN),
  ADMIN_CHANGE_PASSWORD: getApiUrl(API_CONFIG.ENDPOINTS.ADMIN_CHANGE_PASSWORD),
  HEALTH: getApiUrl(API_CONFIG.ENDPOINTS.HEALTH)
};
