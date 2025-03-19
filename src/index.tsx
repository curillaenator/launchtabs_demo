import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Loader } from '@launch-ui/loader';

import { AuthProvider, ThemeProvider } from './appProviders';

import { Layout } from './layout';
import { LaunchTabs, Notes, Palette } from './pages';

import { ROOT_ROUTE, NOTES_ROUTE, PALETTE_ROUTE } from './routes';

import './index.css';

const appContainer = document.querySelector('#root') as Element;
const reactRoot = createRoot(appContainer);

const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROOT_ROUTE} element={<Layout />}>
      <Route index element={<LaunchTabs />} />
      <Route path={NOTES_ROUTE} element={<Notes />} />
      <Route path={PALETTE_ROUTE} element={<Palette />} />
    </Route>,
  ),
);

reactRoot.render(
  <QueryClientProvider client={client}>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} fallbackElement={<Loader view='fullscreen' iconSize='48px' />} />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>,
);
