import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";

axios.interceptors.request.use(function (request) {
  console.log(request);
  return request;
}, function (error) {
  return Promise.reject(error);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

reportWebVitals();
