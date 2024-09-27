import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import axios, { AxiosError } from 'axios';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

axios.interceptors.response.use(
  response => {
    return response;
  },
  function (error: AxiosError) {
    const statusCode = error.response?.status
    switch (statusCode) {
      case 400:
        alert(error.response?.data);
        break;
      case 401:
        alert("Unauthorized");
        break;
      case 403:
        alert("Forbidden");
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </React.StrictMode>

);
