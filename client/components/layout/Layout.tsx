import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";
import { OfflineBanner } from "@/components/OfflineBanner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <OfflineBanner />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
