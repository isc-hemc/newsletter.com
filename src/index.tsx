import './assets/css/index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { App } from 'App';
import { i18n } from 'locales';
import { ContactsPage } from 'pages/Contacts';
import { DashboardPage } from 'pages/Dashboard';
import { HomePage } from 'pages/Home';
import { NotFoundPage } from 'pages/NotFound';
import { SegmentsPage } from 'pages/Segments';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from 'reportWebVitals';

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <DashboardPage />,
        path: '/dashboard',
      },
      {
        element: <ContactsPage />,
        path: 'contacts',
      },
      {
        element: <SegmentsPage />,
        path: 'segments',
      },
    ],
    element: <App />,
  },
  {
    element: <HomePage />,
    path: '/',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
]);

const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MOUNT_NODE = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

MOUNT_NODE.render(
  <StrictMode>
    <I18nextProvider i18n={i18n} />
    <HelmetProvider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);

reportWebVitals();
