import { Routes, Route } from "react-router-dom";
import Dashboard from "@/screens/dashboards/DashboardScreen";
import BookScreen from "@/screens/books/BookScreen";
import CategoryScreen from "@/screens/categories/CategoryScreen";
import AddBookScreen from "@/screens/books/AddBookScreen";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<BookScreen />} />
      <Route path="/book/create" element={<AddBookScreen />} />

      <Route path="/categories" element={<CategoryScreen />} />
      <Route path="/category/create" element={<CategoryScreen />} />
    </Routes>
  );
}

export default RoutesApp;
