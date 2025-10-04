export const encryptToken = (token) => {
  return token; // Store token directly
};

export const decryptToken = (token) => {
  return token; // Return token directly
};

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
};

export const getAuthData = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = parseJwt(token);
      return decodedToken;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }
  return null;
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
};