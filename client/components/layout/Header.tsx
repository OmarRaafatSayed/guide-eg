import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Calendar,
  Camera,
  ShoppingBag,
  Home,
  Shield,
  User,
  ClipboardList,
  Leaf,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/feed", label: "Community", icon: Camera },
  { to: "/marketplace", label: "Handmade", icon: ShoppingBag },
  { to: "/traditional-food", label: "Traditional Food", icon: Calendar },
  { to: "/green-tourism", label: "Green Tourism", icon: Leaf },
];

export function Header() {
  const { user, signOut, requireEmail } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#004A58]/10 bg-[#004A58] shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center ml-4">
          <img src="/logo-new.png" alt="The Guide" className="h-14 w-14 object-contain" />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300",
                  isActive &&
                    "bg-gradient-to-r from-[#FFC211] to-[#2E2F2D] text-white hover:text-white shadow-md",
                )
              }
              end={to === "/"}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* My Plan Button - Show if user has a saved plan */}
          <Button asChild variant="outline" size="sm" className="hidden md:flex border-[#FFC211] text-[#FFC211] hover:bg-[#FFC211] hover:text-[#2E2F2D] bg-transparent">
            <Link to="/planner" className="flex items-center gap-1">
              <ClipboardList className="h-4 w-4" />
              My Plan
            </Link>
          </Button>
          
          {user.registered ? (
            <>
              <Button asChild variant="secondary" size="sm" className="bg-[#FFC211] text-[#2E2F2D] hover:bg-[#FFC211]/90">
                <Link
                  to={`/u/${user.username}`}
                  className="flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  {user.username}
                </Link>
              </Button>
              <Button size="sm" onClick={signOut} className="bg-[#2E2F2D] text-white hover:bg-[#2E2F2D]/90">
                Sign out
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() =>
                requireEmail(
                  "Register with your email to unlock likes, comments, and shares.",
                )
              }
              className="bg-[#FFC211] text-[#2E2F2D] hover:bg-[#FFC211]/90"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
