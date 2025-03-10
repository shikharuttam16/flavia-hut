import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import Checkout from '../pages/CheckOut';
import AllOrders from '../pages/AllOrders';
import AboutUs from '../pages/AboutUs';
import NotFoundPage from '../pages/NotFoundPage';
import AllCategories from '../pages/AllCategories';
import MainCartPage from '../pages/MainCartPage';
import AddFooterDescription from '../components/AddFooterDescription';
import MyAccount from '../pages/MyAccount';

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state?.user?.user);
  return user ? element : <Navigate to='/' />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'login/:id', element: <Home /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'product-category', element: <CategoryProduct /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'search', element: <SearchProduct /> },
      { path: 'checkout/:id', element: <Checkout /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'my-account', element: <ProtectedRoute element={<MyAccount />} /> },
      { path: 'admin-panel', element: <ProtectedRoute element={<AdminPanel />} />, children: [
          { path: 'all-users', element: <AllUsers /> },
          { path: 'all-products', element: <AllProducts /> },
          { path: 'all-categories', element: <AllCategories /> },
          { path: 'all-orders', element: <AllOrders /> },
          { path: 'add-footer-description', element: <AddFooterDescription /> },
      ]},
      { path: '*', element: <NotFoundPage /> },
      { path: 'my-cart', element: <MainCartPage /> },
    ],
  },
]);

export default router;
