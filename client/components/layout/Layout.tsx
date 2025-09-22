import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import { OfflineBanner } from "@/components/OfflineBanner";
import { WelcomePlannerDialog } from "@/components/home/WelcomePlannerDialog";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <OfflineBanner />
      <WelcomePlannerDialog />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
