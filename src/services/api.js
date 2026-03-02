// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    // Check if response is OK
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`API endpoint ${endpoint} not found (404). Please check your backend.`);
      }
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}`);
    }
    
    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON but got HTML. Endpoint ${endpoint} may not exist.`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Mock auth for development (remove when backend is ready)
const mockAuth = {
  login: async (email, password) => {
    console.warn('🔶 Using mock authentication - backend not connected');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = {
      id: 1,
      name: email.includes('admin') ? 'Admin User' : 'John Doe',
      email: email,
      role: email.includes('admin') ? 'admin' : 'user',
      avatar: 'https://github.com/shadcn.png'
    };
    
    const mockToken = 'mock-token-' + Date.now();
    return { user: mockUser, token: mockToken };
  },
  
  register: async (userData) => {
    console.warn('🔶 Using mock authentication - backend not connected');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = {
      id: Date.now(),
      ...userData,
      role: 'user',
      avatar: 'https://github.com/shadcn.png'
    };
    
    const mockToken = 'mock-token-' + Date.now();
    return { user: mockUser, token: mockToken };
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Trips API
export const tripsApi = {
  getUserTrips: (userId) => apiCall(`/trips/${userId}`).catch(() => []),
  createTrip: (tripData) => apiCall('/trips', { method: 'POST', body: JSON.stringify(tripData) }),
  updateTrip: (id, tripData) => apiCall(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(tripData) }),
  deleteTrip: (id) => apiCall(`/trips/${id}`, { method: 'DELETE' }),
};

// Expenses API
export const expensesApi = {
  getTripExpenses: (tripId) => apiCall(`/expenses/${tripId}`).catch(() => []),
  addExpense: (expenseData) => apiCall('/expenses', { 
    method: 'POST', 
    body: JSON.stringify(expenseData) 
  }),
};

// Auth API - use mock for now
export const authApi = mockAuth;

export default { trips: tripsApi, expenses: expensesApi, auth: authApi };