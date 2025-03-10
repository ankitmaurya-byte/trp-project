// @ts-nocheck
import { UnAuthLayout, UserLayout } from "./layouts/Layout";

// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { PublicRoute } from "./utils/protector/PublicRoute";
import { ProtectedRoute } from "./utils/protector/ProtectedRoute";
import {
  candidateRoutes,
  publicRoutes,
  recruiterRoutes,
} from "./utils/route/Routes";
import NotFoundPage from "./pages/NotFoundPage";

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Protected Candidate Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          {candidateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        {/* Protected Recruiter Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          {recruiterRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        {/* Public Routes */}
        <Route
          element={
            <PublicRoute>
              <UnAuthLayout />
            </PublicRoute>
          }
        >
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        {/* <Route path="/auth/success" element={<AuthSuccess />} /> */}
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>{" "}
    </Suspense>
  );
}

export default App;
