import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

import LoadingSpinner from "../../components/LoadingSpinner";

import { useAuth } from "../../hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const location = useLocation();
  console.log("this is public");

  const { data, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data?.isAuthenticated) {
    const from = location.state?.from?.pathname || `/dashboard/${data.role}`;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
