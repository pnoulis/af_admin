import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto";
import App from "./components/App/App.jsx";
import Test from "./Test.jsx";
import Login from "./components/Auth/Login.jsx";
import { GlobalStore } from "/src/stores";
import Registration from "./pages/Registration.jsx";
import AddPlayer from "./pages/AddPlayer.jsx";
import MQTT_START from "/src/mqtt";
import routes from "./routes";

// MQTT_START();

// const router = createBrowserRouter([
//   {
//     path: '*',
//     element: <DEV/>,
//   }
// ]);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     // element: import.meta.env.VITE_TEST ? <Test /> : <App />,
//     element: <DEV/>,
//     children: [
//       {
//         path: 'registration',
//         element: <Registration />,
//         children: [
//           {
//             path: 'team/player/add',
//             element: <AddPlayer />
//           },
//           {
//             path: 'team/create',
//             element: <div>create team</div>
//           },
//           {
//             path: 'team/package/create',
//             element: <div>create package</div>
//           },
//           {
//             path: 'team/package/add',
//             element: <div>submit</div>
//           }
//         ]
//       },
//       {
//         path: 'manager',
//         element: <div>manager</div>
//       },
//       {
//         path: 'scoreboard',
//         element: <div>scoreboard</div>,
//       },
//       {
//         path: 'statistics',
//         element: <div>statistics</div>,
//       },
//       {
//         path: 'cashier',
//         element: <div>cashier</div>
//       }
//     ],
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
// ]);

// function GlobalState({ children }) {
//   const [state, dispatch] = GlobalStore.init();
//   return (
//     <GlobalStore.Provide value={{ state, dispatch }}>
//       {children}
//     </GlobalStore.Provide>
//   );
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
