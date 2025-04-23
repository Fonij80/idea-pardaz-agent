import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  showFooter?: boolean;
}

export function Layout({ showFooter = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
