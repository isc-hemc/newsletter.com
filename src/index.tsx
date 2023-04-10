import './assets/css/index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

import { Dashboard } from 'Dashboard';
import { i18n } from 'locales';
import { AnalyticsPage } from 'pages/Analytics';
import { BulksPage } from 'pages/Bulks';
import { ContactsPage } from 'pages/Contacts';
import { HomePage } from 'pages/Home';
import { NewsletterTypesPage } from 'pages/NewsletterTypes';
import { NotFoundPage } from 'pages/NotFound';
import { SubscriptionsPage } from 'pages/Subscriptions';
import { TemplatesPage } from 'pages/Templates';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from 'reportWebVitals';

const ROUTER = createBrowserRouter([
  {
    children: [
      {
        element: <AnalyticsPage />,
        path: '/analytics',
      },
      {
        element: <ContactsPage />,
        path: 'contacts',
      },
      {
        element: <BulksPage />,
        path: 'bulks',
      },
      {
        element: <TemplatesPage />,
        path: 'templates',
      },
      {
        element: <NewsletterTypesPage />,
        path: 'newsletter-types',
      },
    ],
    element: <Dashboard />,
  },
  {
    element: <SubscriptionsPage />,
    path: '/contacts/:id/subscriptions',
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
    <ToastContainer theme="colored" />
    <HelmetProvider>
      <QueryClientProvider client={QUERY_CLIENT}>
        <RouterProvider router={ROUTER} />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);

reportWebVitals();
