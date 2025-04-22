
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function PageLayout({ children, showFooter = true }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
