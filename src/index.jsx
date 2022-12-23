import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "@fontsource/roboto";
import App from './components/App/App.jsx';
import Test from './Test.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: import.meta.env.VITE_TEST ? <Test /> : <App />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


