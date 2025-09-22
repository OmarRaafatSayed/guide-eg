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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/planner", label: "Planner", icon: Calendar },
  { to: "/feed", label: "Feed", icon: Camera },
  { to: "/marketplace", label: "Market", icon: ShoppingBag },
  { to: "/account", label: "Account", icon: Shield },
];

export function Header() {
  const { user, signOut, requireEmail } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            N
          </span>
          <span className="font-extrabold tracking-tight text-lg">
            NileNavigator
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary transition",
                  isActive &&
                    "bg-primary text-primary-foreground hover:text-primary-foreground",
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
          {user.registered ? (
            <>
              <Button asChild variant="secondary" size="sm">
                <Link
                  to={`/u/${user.username}`}
                  className="flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  {user.username}
                </Link>
              </Button>
              <Button size="sm" onClick={signOut}>
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
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
