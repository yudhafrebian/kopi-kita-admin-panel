import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { admin } = useAuth();
  const token = localStorage.getItem("token");
  if (!admin && !token) {
    return <Navigate to="/login" replace />;    
  }

  return <>{children}</>;
};

export default ProtectedRoute;
