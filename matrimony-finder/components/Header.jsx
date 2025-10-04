import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { clearAuthData } from '../utils/auth';

const Logo = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center space-x-2 focus:outline-none">
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
    </svg>
    <span className="font-bold text-xl text-primary-dark">MATRIMONY</span>
  </button>
);

// Icons for the side modal
const LocationPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const FacebookIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>;
const PinterestIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 .992.371 1.931.82 2.491.063.079.07.168.02.269l-.335 1.378c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.379l-.749 2.85c-.271 1.031-1.002 2.35-1.492 3.146 1.124.343 2.317.535 3.554.535 6.627 0 12-5.373 12-12s-5.373-12-12-12z" /></svg>;
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.22 3.803 4.659-.623.169-1.282.23-1.966.23-.299 0-.588-.028-.875-.083.593 1.879 2.345 3.226 4.394 3.262-1.616 1.28-3.674 2.023-5.863 2.023-.381 0-.757-.022-1.127-.065 2.089 1.353 4.581 2.148 7.24 2.148 8.683 0 13.44-7.22 13.44-13.44 0-.204-.005-.407-.014-.61a9.619 9.619 0 002.323-2.41z" /></svg>;
const InstagramIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z" /></svg>;

const Header = ({ onNavigateHome, onNavigateToLogin, onNavigateToAbout, onNavigateToContact, onNavigateToWishlist, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    onNavigateHome();
    setShowLogoutModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleLinkClick = (e, action) => {
    if (action) {
      e.preventDefault();
      action();
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', action: onNavigateHome },
    { name: 'About Us', action: onNavigateToAbout },
    { name: 'Contact', action: onNavigateToContact },
  ];

  const userNavLinks = user ? [
    ...navLinks,
    { name: 'Saved Profiles', action: onNavigateToWishlist },
  ] : navLinks;

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          <Logo onClick={() => handleLinkClick(new MouseEvent('click'), onNavigateHome)} />
          
          {currentPage !== 'login' ? (
            <>
              <nav className="hidden md:flex items-center space-x-8">
                {userNavLinks.map((link) => {
                  const isActive = 
                    (link.name === 'Home' && currentPage === 'home') ||
                    (link.name === 'About Us' && currentPage === 'about') ||
                    (link.name === 'Contact' && currentPage === 'contact') ||
                    (link.name === 'Wishlist' && currentPage === 'wishlist');
                  
                  return (
                    <a
                      key={link.name}
                      href={'#'}
                      onClick={(e) => handleLinkClick(e, link.action)}
                      className={`${isActive ? 'text-primary' : 'text-secondary'} hover:text-primary transition-colors font-medium cursor-pointer`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>
              <div className="hidden md:block">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <button onClick={handleLogout} className="bg-gray-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition-colors shadow">
                      Logout
                    </button>
                  </div>
                ) : (
                  <button onClick={onNavigateToLogin} className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-dark transition-colors shadow">
                    Login
                  </button>
                )}
              </div>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-secondary focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </button>
              </div>
            </>
          ) : (
             <button onClick={onNavigateHome} className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-dark transition-colors shadow">
                Home
            </button>
          )}
        </div>
      </header>

      {/* Mobile Side Menu */}
      <div className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <Logo onClick={() => handleLinkClick(new MouseEvent('click'), onNavigateHome)} />
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <nav className="flex flex-col">
              {userNavLinks.map((link) => {
                const isActive = 
                  (link.name === 'Home' && currentPage === 'home') ||
                  (link.name === 'About Us' && currentPage === 'about') ||
                  (link.name === 'Contact' && currentPage === 'contact') ||
                  (link.name === 'Wishlist' && currentPage === 'wishlist');
                
                return (
                  <a 
                    key={link.name} 
                    href={'#'} 
                    onClick={(e) => handleLinkClick(e, link.action)} 
                    className={`py-3 border-b border-gray-200 ${isActive ? 'text-primary' : 'text-gray-800'} font-semibold hover:text-primary transition-colors`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Info</h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-md"><LocationPinIcon /></div>
                  <span>10221 Salem, Tamil Nadu India</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-md"><PhoneIcon /></div>
                  <span>(+99)012345678</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-md"><MailIcon /></div>
                  <span>matrimony@gmail.com</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-6">
              {user ? (
                <div className="space-y-3">
                  <button onClick={(e) => { handleLinkClick(e); handleLogout(); }} className="w-full bg-gray-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors shadow">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={(e) => handleLinkClick(e, onNavigateToLogin)} className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-primary-dark transition-colors shadow">
                  Login
                </button>
              )}
              <div className="flex justify-center space-x-6 mt-6">
                <a href="#" className="text-gray-500 hover:text-primary transition-colors"><FacebookIcon /></a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors"><PinterestIcon /></a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors"><TwitterIcon /></a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors"><InstagramIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg text-primary font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={confirmLogout} className="flex-1 bg-primary text-white py-2 px-4 rounded hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;