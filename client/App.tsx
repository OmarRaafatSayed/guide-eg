import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MapPage from "./pages/Map";
import FeedPage from "./pages/Feed";
import PlannerPage from "./pages/Planner";
import MarketplacePage from "./pages/Marketplace";
import AccountPage from "./pages/Account";
import ProfilePage from "./pages/Profile";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/u/:handle" element={<ProfilePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")! as any;
// Reuse root across HMR updates to avoid duplicate createRoot warnings
const root = (window as any).__app_root || createRoot(container);
(window as any).__app_root = root;
root.render(<App />);
