import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const KEY = "nile.user";
export type User = {
  username: string;
  email?: string | null;
  registered: boolean;
};

const defaultUser: User = { username: "guest", email: null, registered: false };

const AuthCtx = createContext<{
  user: User;
  signOut: () => void;
  requireEmail: (reason?: string) => Promise<boolean>;
} | null>(null);

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null") || defaultUser;
    } catch {
      return defaultUser;
    }
  });
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [pendingResolve, setPendingResolve] = useState<
    ((v: boolean) => void) | null
  >(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(user));
    } catch {}
  }, [user]);

  function signOut() {
    setUser(defaultUser);
  }

  function requireEmail(r?: string) {
    if (user.registered) return Promise.resolve(true);
    setReason(r);
    setOpen(true);
    return new Promise<boolean>((resolve) => setPendingResolve(() => resolve));
  }

  function submit() {
    const e = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return;
    const username = e.split("@")[0];
    setUser({ username, email: e, registered: true });
    setOpen(false);
    setEmail("");
    pendingResolve?.(true);
    setPendingResolve(null);
  }

  const value = useMemo(() => ({ user, signOut, requireEmail }), [user]);

  return (
    <AuthCtx.Provider value={value}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            pendingResolve?.(false);
            setPendingResolve(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in with email</DialogTitle>
            <DialogDescription>
              {reason || "Only registered users can perform this action."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                  pendingResolve?.(false);
                  setPendingResolve(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={submit}>Continue</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AuthCtx.Provider>
  );
}
