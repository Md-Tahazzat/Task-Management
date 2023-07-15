import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import AllTaks from "./Pages/AllTaks.jsx";
import AddTask from "./Pages/AddTask.jsx";
import UpdateTask from "./Pages/UpdateTask.jsx";
import AuthProvider from "./Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Loading from "./Pages/Loading";
import VerifyUser from "./VerifyUser/VerifyUser";

// Main route for navigation
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: (
          <VerifyUser>
            {" "}
            <AllTaks></AllTaks>
          </VerifyUser>
        ),
      },
      {
        path: "add-task",
        element: (
          <VerifyUser>
            <AddTask></AddTask>
          </VerifyUser>
        ),
      },
      {
        path: "update/:id",
        element: (
          <VerifyUser>
            <UpdateTask></UpdateTask>
          </VerifyUser>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
