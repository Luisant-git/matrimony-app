import { apiCall } from './api';

export const filterAPI = {
  // Get all filter options
  getCommunities: () => apiCall('/community'),
  getCastes: () => apiCall('/caste'),
  getSubCastes: () => apiCall('/sub-caste'),
  getKulams: () => apiCall('/kulam'),
  getKothirams: () => apiCall('/kothiram'),

  // Get filtered users with pagination
  getFilteredUsers: async (filters, page = 1, pageSize = 10) => {
    const params = new URLSearchParams();
    
    // Add pagination
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    
    // Add filters
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

  // Get all users without filters
  getAllUsers: (page = 1, pageSize = 10) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    return apiCall(`/user/data?${params.toString()}`);
  }
};

// Helper function to build filter query
export const buildFilterQuery = (filters) => {
  const cleanFilters = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value) && value.length > 0) {
        cleanFilters[key] = value;
      } else if (!Array.isArray(value)) {
        cleanFilters[key] = value;
      }
    }
  });
  
  return cleanFilters;
};

// Validate filter values
export const validateFilters = (filters) => {
  const errors = {};
  
  // Add validation rules as needed
  if (filters.gender && !['MALE', 'FEMALE'].includes(filters.gender)) {
    errors.gender = 'Invalid gender value';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};