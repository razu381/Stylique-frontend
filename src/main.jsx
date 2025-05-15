import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@smastrom/react-rating/style.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SingleProduct from "./pages/single product/SingleProduct";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Root from "./pages/Root";
import Signup from "./shared components/Signup";
import Login from "./shared components/Login";
import AuthProvider from "./Auth/AuthProvider";
import CartProvider from "./pages/cart/CartProvider";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import UserDashboard from "./pages/user/UserDashboard";
import AllProducts from "./pages/All products/AllProducts";

const queryClient = new QueryClient();

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        loader: ({ params }) =>
          fetch(`https://stylique-backend.vercel.app//products/${params.id}`),
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/user",
        element: <UserDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
