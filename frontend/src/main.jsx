import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

//const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

//console.log("Google Client ID:", googleClientId);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);