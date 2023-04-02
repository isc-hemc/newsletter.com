import './assets/css/index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ContactsPage } from './pages/Contacts';
import { DashboardPage } from './pages/Dashboard';
import { NotFoundPage } from './pages/NotFound';
import { SegmentsPage } from './pages/Segments';
import reportWebVitals from './reportWebVitals';

export const router = createBrowserRouter([
  {
    element: <DashboardPage />,
    path: '/',
  },
  {
    element: <ContactsPage />,
    path: '/contacts',
  },
  {
    element: <SegmentsPage />,
    path: '/segments',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);

reportWebVitals();
