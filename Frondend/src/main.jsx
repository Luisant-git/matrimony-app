import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JobContextProvider } from './Context/JobContext';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import 'swiper/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './store';
import './i18n'; // Import the i18n configuration
import "react-image-lightbox/style.css"; // Import styles for lightbox
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <JobContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </JobContextProvider>
</Provider>
);
