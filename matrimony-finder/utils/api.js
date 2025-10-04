const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const userAPI = {
  login: (mobileNo, password) => 
    apiCall('/user/login', {
      method: 'POST',
      body: JSON.stringify({ mobileNo, password }),
    }),
  
  getUser: (userId) => 
    apiCall(`/user/data/${userId}`),
  
  getAllUsers: () => 
    apiCall('/user/data'),
  
  getFilteredUsers: (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          params.append(key, value.join(','));
        } else if (!Array.isArray(value)) {
          params.append(key, value);
        }
      }
    });
    return apiCall(`/user/filter?${params.toString()}`);
  },

  filterUsers: (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });
    return apiCall(`/user/filter?${searchParams.toString()}`);
  },

  addToWishlist: (userId, profileId) => 
    apiCall('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ userId, profileId }),
    }),

  getWishlist: (userId) => 
    apiCall(`/wishlist?userId=${userId}`),

  removeFromWishlist: (userId, profileId) => 
    apiCall('/wishlist', {
      method: 'DELETE',
      body: JSON.stringify({ userId, profileId }),
    }),
};