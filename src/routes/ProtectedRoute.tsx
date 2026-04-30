import { getProfile } from "@/services/auth_service";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getProfile();
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (isAuth === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
