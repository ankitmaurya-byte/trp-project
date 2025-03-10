import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

// interface AuthData {
//   isAuthenticated: boolean;
//   role?: string;
// }

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const location = useLocation();

  const { data, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log(location.pathname);

  // If no auth data or not authenticated, redirect to login
  if (!data?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if roles are specified

  if (
    allowedRoles.length > 0 &&
    data.role &&
    !allowedRoles.includes(data.role)
  ) {
    toast.warning(
      `role ${data.role} are not have permission to ascess route ${location.pathname} `,
      {
        duration: 3000, // Toast will last for 3 seconds
        style: {
          backgroundColor: "yellow", // Set background to yellow
          color: "black", // You can also change text color if you want
        },
      }
    );
    return <Navigate to={`dashboard/${data.role}`} replace />;
  }

  return <>{children}</>;
};
