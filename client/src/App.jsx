import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/Admin/DashboardPage";
import OrdersPage from "./pages/Admin/OrdersPage";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminLayout from "./pages/Admin/AdminLayout";
import CreateProductPage from "./pages/Admin/CreateProductPage";
import EditProductPage from "./pages/Admin/EditProductPage";
import CreateVouchersPage from "./pages/Admin/CreateVouchersPage";
import ProductsPage from "./pages/Admin/ProductPage";
import VouchersPage from "./pages/Admin/VouchersPage";
import AdminUsersPage from "./pages/Admin/AdminUsersPage";
import HomePage from "./pages/User/HomePage";
import ProductDetail from "./components/user/ProductDetails";
import Checkout from "./pages/User/Checkout";
import UserProductsPage from "./pages/User/UserProductsPage";
import OrderConfirmation from "./pages/User/OrderConfirmation";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Checkout />} />
      <Route path="/products" element={<UserProductsPage />} />
      <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/*"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/:id/edit" element={<EditProductPage />} />
        <Route path="vouchers/create" element={<CreateVouchersPage />} />
        {/* <Route path="vouchers/:partnerId" element={<VouchersPage/>} /> */}
        <Route path="vouchers" element={<VouchersPage/>} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        {/* <Route path="products" element={<ProductsPage />} /> */}
        {/* <Route path="vouchers" element={<VouchersPage />} /> */}
        <Route path="orders" element={<OrdersPage />} />
      </Route>

    </Routes>
  );
}

export default App;
