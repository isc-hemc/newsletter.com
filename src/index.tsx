import './assets/css/index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <h1 className="font-bold text-3xl">Stori | Newsletter</h1>
  </StrictMode>,
);

reportWebVitals();
