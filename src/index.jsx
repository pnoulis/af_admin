import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "@fontsource/roboto";
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App/App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline/>
    <RouterProvider router={router} />
  </React.StrictMode>
);


