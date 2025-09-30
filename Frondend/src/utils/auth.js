import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';

// Secret key used for encryption and decryption
const secretKey = "your-secret-key";

// Encrypt function
export const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, secretKey).toString();
};

// Decrypt function
export const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Get authentication data (all decoded information) from localStorage
export const getAuthData = () => {
  const encryptedToken = localStorage.getItem("token");
  if (encryptedToken) {
    const decryptedToken = decryptToken(encryptedToken);
   
    
    try {
      const decodedToken = jwtDecode(decryptedToken);


      // Return all decoded data
      return decodedToken;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  } else {
    console.log("No token found in localStorage");
    return null;
  }
};

// Function to clear the token from localStorage
export const clearAuthData = () => {
  localStorage.removeItem("token");
};

// utils.js
export const truncateDescription = (description, wordLimit) => {
  if (!description) return '';

  const words = description.split(' ');
  if (words.length <= wordLimit) {
    return description;
  }

  return words.slice(0, wordLimit).join(' ') + '...';
};
