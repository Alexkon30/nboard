import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ArticlePage, ErrorPage, NewsPage } from './pages/index.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <NewsPage />
      },
      {
        path: 'articles/:id',
        element: <ArticlePage />,
        errorElement: <ErrorPage/>
      },
      {
        path: '/*',
        element: <ErrorPage/>,
      }
    ],
    
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
