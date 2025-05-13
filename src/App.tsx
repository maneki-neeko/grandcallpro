import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Calls from "./pages/Calls";
import Users from "./pages/Users";
import Extensions from "./pages/Extensions";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Added import
import ForgotPassword from "./pages/ForgotPassword"; // Added import
import Reports from "./pages/Reports";
import { AuthProvider, useAuth } from "./lib/auth";
import { Layout } from "./components/Layout";
import Backup from "./pages/Backup";
import ConsentForm from "./components/lgpd/ConsentForm";
import { NotificationHistory } from "./pages/NotificationHistory";
import { AppProvider } from "./contexts";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    window.location.pathname = "/login";
    return null;
  }
  return children;
};

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/lgpd-consent" element={<ConsentForm />} />

                <Route
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/calls"
                    element={
                      <ProtectedRoute>
                        <Calls />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/extensions"
                    element={
                      <ProtectedRoute>
                        <Extensions />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/backup"
                    element={
                      <ProtectedRoute>
                        <Backup />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notifications-history"
                    element={
                      <ProtectedRoute>
                        <NotificationHistory />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
