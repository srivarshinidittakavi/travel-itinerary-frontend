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
    
    // Try to parse JSON even for error responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      // Handle HTML error pages
      if (text.includes('<!DOCTYPE html>')) {
        throw new Error('Server returned HTML instead of JSON. Backend may be down.');
      }
      throw new Error(`Unexpected response: ${text.substring(0, 100)}`);
    }
    
    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==================== AUTH API ====================
export const authApi = {
  login: async (email, password) => {
    const data = await apiCall('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    });
    
    // Store token when login successful
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },
  
  register: async (userData) => {
    const data = await apiCall('/auth/register', { 
      method: 'POST', 
      body: JSON.stringify(userData) 
    });
    
    // Store token when registration successful
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },
  
  getProfile: async () => {
    return await apiCall('/auth/profile');
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// ==================== TRIPS API ====================
export const tripsApi = {
  // Get all trips for the authenticated user (no userId param needed)
  getUserTrips: () => apiCall('/trips').catch(() => []),
  
  // Get single trip by ID
  getTripById: (id) => apiCall(`/trips/${id}`),
  
  // Create a new trip
  createTrip: (tripData) => apiCall('/trips', { 
    method: 'POST', 
    body: JSON.stringify(tripData) 
  }),
  
  // Update a trip
  updateTrip: (id, tripData) => apiCall(`/trips/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify(tripData) 
  }),
  
  // Delete a trip
  deleteTrip: (id) => apiCall(`/trips/${id}`, { 
    method: 'DELETE' 
  }),
};

// ==================== EXPENSES API ====================
export const expensesApi = {
  // Get expenses for a specific trip
  getTripExpenses: (tripId) => apiCall(`/expenses/${tripId}`).catch(() => []),
  
  // Get single expense by ID
  getExpenseById: (id) => apiCall(`/expenses/${id}`),
  
  // Add an expense to a trip
  addExpense: (expenseData) => apiCall('/expenses', { 
    method: 'POST', 
    body: JSON.stringify(expenseData) 
  }),
  
  // Update an expense
  updateExpense: (id, expenseData) => apiCall(`/expenses/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify(expenseData) 
  }),
  
  // Delete an expense
  deleteExpense: (id) => apiCall(`/expenses/${id}`, { 
    method: 'DELETE' 
  }),
};

export const wishlistApi = {
  getWishlist: () => {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  },
  
  addToWishlist: (item) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updated = [...wishlist, { ...item, id: Date.now() }];
    localStorage.setItem('wishlist', JSON.stringify(updated));
    return updated;
  },
  
  removeFromWishlist: (itemId) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updated = wishlist.filter(item => item.id !== itemId);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    return updated;
  },
  
  clearWishlist: () => {
    localStorage.setItem('wishlist', '[]');
    return [];
  }
};

export default { 
  auth: authApi, 
  trips: tripsApi, 
  expenses: expensesApi,
  wishlist: wishlistApi
};