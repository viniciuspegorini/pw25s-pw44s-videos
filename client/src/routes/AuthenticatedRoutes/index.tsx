import { NavBar } from "@/components/NavBar";
import AuthService from "@/services/AuthService";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function AuthenticatedRoutes() {
  const isAthenticated = AuthService.isAuthenticaded();
  const location = useLocation();

  return isAthenticated ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
