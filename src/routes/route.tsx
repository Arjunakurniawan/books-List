import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/screens/dashboards/DashboardScreen";
import BookScreen from "@/screens/books/BookScreen";
import CategoryScreen from "@/screens/categories/CategoryScreen";
import AddBookScreen from "@/screens/books/AddBookScreen";
import EditBookScreen from "@/screens/books/EditBookScreen";
import LoginScreen from "@/screens/authentication/LoginScreen";
import RegisterScreen from "@/screens/authentication/RegisterScreen";
import ProtectedRoute from "@/routes/ProtectedRoute";
import DashboardLayout from "@/layout/MainLayout";
import LoginLayout from "@/layout/AuthLayout";

function RoutesApp() {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<BookScreen />} />
          <Route path="/book/create" element={<AddBookScreen />} />
          <Route path="/book/edit/:id" element={<EditBookScreen />} />
          <Route path="/categories" element={<CategoryScreen />} />
          <Route path="/category/create" element={<CategoryScreen />} />\
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default RoutesApp;
