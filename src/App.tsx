// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard/dashboard/dashboard";
import Product from "./pages/dashboard/product/product";
import Layout from "./pages/dashboard/layout";
import ProtectedRoute from "./middleware/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="product" element={<Product />} />
        {/* <Route path="calendar" element={<div>Calendar Page</div>} />
        <Route path="search" element={<div>Search Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} /> */}
      </Route>
    </Routes>
  );
}

export default App;
