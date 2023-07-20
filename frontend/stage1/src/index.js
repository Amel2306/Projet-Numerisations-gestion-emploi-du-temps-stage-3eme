import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {MomentProvider} from './utils/tabMoments';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <MomentProvider>
        <App />
      </MomentProvider>
    </BrowserRouter>
  </React.StrictMode>,

);

reportWebVitals();
