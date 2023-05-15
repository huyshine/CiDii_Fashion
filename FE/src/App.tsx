import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./components/admin/PrivateRouter";
import NotFound from "./components/NotFound";
import CategoryAdd from "./pages/admin/categories/CategoryAdd";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";
import CategoryList from "./pages/admin/categories/CategoryList";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";
import ProductList from "./pages/admin/products/ProductList";
import AdminLayout from "./pages/layouts/AdminLayout";
import WebsiteLayout from "./pages/layouts/WebsiteLayout";
import Signin from "./pages/user/auth/Signin";
import Signup from "./pages/user/auth/Signup";
import HomePage from "./pages/user/HomePage";
import ProductDetail from "./pages/user/products/ProductDetail";
import ProductByCategory from "./pages/user/ProductByCategory";
import { CartProvider } from 'react-use-cart'
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import ThankPage from "./pages/user/ThankPage";
import OrderEdit from "./pages/admin/order/OrderEdit";
import OrderList from "./pages/admin/order/OrderList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CartProvider><WebsiteLayout /></CartProvider>}>
          <Route index element={<CartProvider><HomePage /></CartProvider>} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="detail/:id" element={<CartProvider><ProductDetail /></CartProvider>} />
          <Route path="category">
            <Route index element={<Navigate to=":id" />} />
            <Route path=":id" element={<CartProvider><ProductByCategory /></CartProvider>} />
          </Route>
          <Route path="cart" element={<CartProvider><Cart/></CartProvider>} />
          <Route path="checkout" element={<CartProvider><Checkout/></CartProvider>}/>
          <Route path="thankyou" element={<ThankPage/>}/>
        </Route>
        <Route
          path="admin"
          element={
            <PrivateRouter>
              <AdminLayout />
            </PrivateRouter>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path="edit/:id" element={<ProductEdit />} />
          </Route>
          <Route path="category">
            <Route index element={<CategoryList />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
          </Route>
          <Route path="order">
            <Route index element={<OrderList />}/>
            <Route path="detail/:id" element={<OrderEdit />}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
