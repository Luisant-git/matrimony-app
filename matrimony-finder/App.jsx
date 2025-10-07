import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import { HomeFooter, ProfileFooter } from './components/Footer';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import UserRegistrationPage from './components/UserRegistrationPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import WishlistPage from './components/WishlistPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigateToProfile = (userId = null) => {
    setSelectedUserId(userId);
    setCurrentPage('profile');
  };
  const navigateToHome = () => setCurrentPage('home');
  const navigateToLogin = () => setCurrentPage('login');
  const navigateToRegister = () => setCurrentPage('register');
  const navigateToAbout = () => setCurrentPage('about');
  const navigateToContact = () => setCurrentPage('contact');
  const navigateToWishlist = () => setCurrentPage('wishlist');

  const renderFooter = () => {
    if (currentPage === 'home') return <HomeFooter />;
    if (['profile', 'about', 'contact', 'wishlist'].includes(currentPage)) return (
      <ProfileFooter 
        onNavigateToAbout={navigateToAbout}
        onNavigateToContact={navigateToContact}
        onNavigateToWishlist={navigateToWishlist}
      />
    );
    return null;
  };

  return (
    <AuthProvider>
      <div className="bg-gray-50 text-secondary min-h-screen flex flex-col">
        <Header 
          onNavigateHome={navigateToHome} 
          onNavigateToLogin={navigateToLogin}
          onNavigateToAbout={navigateToAbout}
          onNavigateToContact={navigateToContact}
          onNavigateToWishlist={navigateToWishlist}
          currentPage={currentPage}
        />
        <main className="flex-grow">
          {currentPage === 'home' && <HomePage onNavigateToProfile={navigateToProfile} />}
          {currentPage === 'profile' && <ProfilePage selectedUserId={selectedUserId} onNavigateToLogin={navigateToLogin} />}
          {currentPage === 'login' && <LoginPage onNavigateToRegister={navigateToRegister} />}
          {currentPage === 'register' && <UserRegistrationPage onNavigateToLogin={navigateToLogin} />}
          {currentPage === 'about' && <AboutUsPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'wishlist' && <WishlistPage onNavigateToProfile={navigateToProfile} onNavigateToLogin={navigateToLogin} />}
        </main>
        {renderFooter()}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AuthProvider>
  );
};

export default App;