import { Routes, Route } from "react-router-dom";
import Dashboard from "@/screens/dashboards/DashboardScreen";
import BookScreen from "@/screens/books/BookScreen";
import CategoryScreen from "@/screens/categories/CategoryScreen";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<BookScreen />} />
      <Route path="/categories" element={<CategoryScreen />} />
    </Routes>
  );
}

export default RoutesApp;
