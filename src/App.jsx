import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import NewCollaborator from "./pages/NewCollaborator";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_OAUTH_GOOGLE}`}>
        <AuthProvider>
          <ProjectsProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route
                  path="forgot-password/:token"
                  element={<NewPassword />}
                />
                <Route
                  path="confirm-account/:id"
                  element={<ConfirmAccount />}
                />
              </Route>

              <Route path="/projects" element={<ProtectedRoute />}>
                <Route index element={<Projects />} />
                <Route path="create-project" element={<NewProject />} />
                <Route
                  path="new-collaborator/:id"
                  element={<NewCollaborator />}
                />
                <Route path=":id" element={<Project />} />
                <Route path="edit/:id" element={<EditProject />} />
              </Route>
            </Routes>
          </ProjectsProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;

