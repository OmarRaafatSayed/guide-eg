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
import ProductDetailPage from "./pages/ProductDetail";
import LocationDetailPage from "./pages/LocationDetail";
import AccountPage from "./pages/Account";
import ProfilePage from "./pages/Profile";
import TraditionalFoodPage from "./pages/TraditionalFood";
import TraditionalFoodRegionsPage from "./pages/TraditionalFoodRegions";
import TraditionalFoodStoriesPage from "./pages/TraditionalFoodStories";
import GreenTourismPage from "./pages/GreenTourism";
import GreenTourismPlacesPage from "./pages/GreenTourismPlaces";
import GreenTourismPlaceDetailPage from "./pages/GreenTourismPlaceDetail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmation";
import BookExperiencePage from "./pages/BookExperience";
import ExperienceCheckoutPage from "./pages/ExperienceCheckout";
import ExperienceConfirmationPage from "./pages/ExperienceConfirmation";
import PlaceDetailPage from "./pages/PlaceDetail";
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
              <Route path="/marketplace/product/:id" element={<ProductDetailPage />} />
              <Route path="/marketplace/location/:id" element={<LocationDetailPage />} />
              <Route path="/traditional-food" element={<TraditionalFoodPage />} />
              <Route path="/traditional-food/regions" element={<TraditionalFoodRegionsPage />} />
              <Route path="/traditional-food/regions/:region" element={<TraditionalFoodRegionsPage />} />
              <Route path="/traditional-food/stories" element={<TraditionalFoodStoriesPage />} />
              <Route path="/traditional-food/stories/:id" element={<TraditionalFoodStoriesPage />} />
              <Route path="/green-tourism" element={<GreenTourismPage />} />
              <Route path="/green-tourism/places" element={<GreenTourismPlacesPage />} />
              <Route path="/green-tourism/places/:category" element={<GreenTourismPlacesPage />} />
              <Route path="/green-tourism/places/:category/:id" element={<GreenTourismPlaceDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/book-experience/:experienceId" element={<BookExperiencePage />} />
              <Route path="/experience-checkout" element={<ExperienceCheckoutPage />} />
              <Route path="/experience-confirmation" element={<ExperienceConfirmationPage />} />
              <Route path="/place/:id" element={<PlaceDetailPage />} />
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
