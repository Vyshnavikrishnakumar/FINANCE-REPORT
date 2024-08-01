import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IncomeProvider } from './components/IncomeContext'; // Ensure the path is correct
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IncomeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IncomeProvider>
  </React.StrictMode>
);
