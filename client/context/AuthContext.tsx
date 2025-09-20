import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TravelBadge } from "@/lib/social-data";
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
  fullName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  bio?: string;
  travelInterests?: string[];
  badges?: (TravelBadge & { earnedAt: string })[];
  joinedAt?: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  notificationSettings?: {
    likes: boolean;
    comments: boolean;
    followers: boolean;
    posts: boolean;
    badges: boolean;
  };
  privacySettings?: {
    privateAccount: boolean;
    showBadges: boolean;
    showFollowCount: boolean;
    allowTagging: boolean;
  };
};



const defaultUser: User = { 
  username: "guest", 
  email: null, 
  registered: false,
  badges: [],
  travelInterests: [],
  followersCount: 0,
  followingCount: 0,
  postsCount: 0
};

const AuthCtx = createContext<{
  user: User;
  signOut: () => void;
  requireEmail: (reason?: string) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  awardBadge: (badge: TravelBadge & { earnedAt: string }) => void;
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
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState<'email' | 'details'>('email');
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

  function submitEmail() {
    const e = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return;
    setStep('details');
  }

  function submitDetails() {
    const e = email.trim();
    const name = fullName.trim();
    const phone = phoneNumber.trim();
    
    if (!name || !phone) return;
    
    const username = e.split("@")[0];
    setUser({ 
      username, 
      email: e, 
      fullName: name,
      phoneNumber: phone,
      registered: true,
      joinedAt: new Date().toISOString(),
      badges: [],
      travelInterests: [],
      followersCount: 0,
      followingCount: 0,
      postsCount: 0
    });
    setOpen(false);
    setEmail("");
    setFullName("");
    setPhoneNumber("");
    setStep('email');
    pendingResolve?.(true);
    setPendingResolve(null);
  }

  function handleCancel() {
    setOpen(false);
    setEmail("");
    setFullName("");
    setPhoneNumber("");
    setStep('email');
    pendingResolve?.(false);
    setPendingResolve(null);
  }

  function updateUser(updates: Partial<User>) {
    setUser(prev => ({ ...prev, ...updates }));
  }

  function awardBadge(badge: TravelBadge & { earnedAt: string }) {
    setUser(prev => ({
      ...prev,
      badges: [...(prev.badges || []), badge]
    }));
  }

  const value = useMemo(() => ({ 
    user, 
    signOut, 
    requireEmail, 
    updateUser, 
    awardBadge 
  }), [user]);

  return (
    <AuthCtx.Provider value={value}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) handleCancel();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {step === 'email' ? 'Sign in with email' : 'Complete your profile'}
            </DialogTitle>
            <DialogDescription>
              {step === 'email' 
                ? (reason || "Only registered users can perform this action.")
                : "Please provide your name and phone number to complete registration."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {step === 'email' ? (
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitEmail()}
              />
            ) : (
              <>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitDetails()}
                />
              </>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              {step === 'email' ? (
                <Button onClick={submitEmail} disabled={!email.trim()}>
                  Continue
                </Button>
              ) : (
                <Button onClick={submitDetails} disabled={!fullName.trim() || !phoneNumber.trim()}>
                  Complete Registration
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AuthCtx.Provider>
  );
}
