import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Checkout from '../pages/CheckOut'
import AllOrders from '../pages/AllOrders'
import AboutUs from '../pages/AboutUs'
import NotFoundPage from '../pages/NotFoundPage'
import AllCategories from '../pages/AllCategories'
import MyCart from "../pages/MyCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassowrd />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "checkout/:id",
        element: <Checkout />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-categories",
            element: <AllCategories />,
          },
          {
            path: "all-orders",
            element: <AllOrders />,
          },
          {
            path: "all-categories",
            element: <AllOrders />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "my-cart",
        element: <MyCart />,
      },
    ],
  },
]);

export default router;