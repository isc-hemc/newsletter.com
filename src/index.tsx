import './assets/css/index.css';

import { i18n } from 'locales';
import { ContactsPage } from 'pages/Contacts';
import { DashboardPage } from 'pages/Dashboard';
import { NotFoundPage } from 'pages/NotFound';
import { SegmentsPage } from 'pages/Segments';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';

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
    <I18nextProvider i18n={i18n} />
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);

reportWebVitals();
