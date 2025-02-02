import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-dark-blue/theme.css'
import {ToastProvider} from "./providers/toast";
import {AuthProvider} from "./providers/authProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <PrimeReactProvider>
          <AuthProvider>
          <ToastProvider>
          <App />
          </ToastProvider>
          </AuthProvider>
      </PrimeReactProvider>
  </React.StrictMode>
);


reportWebVitals();
