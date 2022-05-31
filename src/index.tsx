import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserView from './views/UserView';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreProvider>
    <React.StrictMode>
      <div className=' bg-gray-200'>
        <UserView />
      </div>
    </React.StrictMode>
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
