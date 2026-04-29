import { Routes, Route } from "react-router-dom";
import Dashboard from "@/screens/dashboards/DashboardScreen";
import BookScreen from "@/screens/books/BookScreen";
import CategoryScreen from "@/screens/categories/CategoryScreen";
import AddBookScreen from "@/screens/books/AddBookScreen";
import EditBookScreen from "@/screens/books/EditBookScreen";
import DashboardLayout from "@/components/dashboards/layout/dashboardLayout";
import LoginScreen from "@/screens/login/loginScreen";
import RegisterScreen from "@/screens/register/registerScreen";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<BookScreen />} />
        <Route path="/book/create" element={<AddBookScreen />} />
        <Route path="/book/edit/:id" element={<EditBookScreen />} />
        <Route path="/categories" element={<CategoryScreen />} />
        <Route path="/category/create" element={<CategoryScreen />} />\
      </Route>
    </Routes>
  );
}

export default RoutesApp;
