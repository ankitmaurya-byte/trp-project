import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import Candidate from "./pages/dashboard/Candidate";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          // <PublicRoute>
          <SignIn />
          // </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="candidate/dashboard"
        element={
          // <ProtectedRoute allowedRoles={["candidate"]}>
          <Candidate />
          // </ProtectedRoute>
        }
      />
      <Route
        path="recruiter"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <Contact />
          </ProtectedRoute>
        }
      />
      {/* Protected routes within Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
