// API Configuration for SafeCom Frontend
const API_CONFIG = {
  BASE_URL: 'https://safecom-backend-render-tempo.onrender.com',
  ENDPOINTS: {
    // Authentication
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH_TOKEN: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    
    // Tasks
    TASKS: '/api/tasks',
    TASK_BY_ID: (id) => `/api/tasks/${id}`,
    ACCEPT_TASK: (id) => `/api/tasks/${id}/accept`,
    COMPLETE_TASK: (id) => `/api/tasks/${id}/complete`,
    
    // Users
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    USERS: '/api/users',
    
    // Messages
    MESSAGES: '/api/messages',
    SEND_MESSAGE: '/api/messages/send',
    CONVERSATIONS: '/api/messages/conversations',
    
    // Notifications
    NOTIFICATIONS: '/api/notifications',
    MARK_READ: '/api/notifications/mark-read',
    FCM_TOKEN: '/api/notifications/fcm-token'
  },
  
  // Default headers
  getHeaders: () => {
    const token = localStorage.getItem('safecom-token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  },
  
  // Helper method for making API calls
  request: async (endpoint, options = {}) => {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const config = {
      headers: API_CONFIG.getHeaders(),
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API_CONFIG;
}
