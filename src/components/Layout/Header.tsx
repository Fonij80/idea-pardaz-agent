import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Calendar, Image, MessageSquare, Settings } from "lucide-react";

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-6 border-b bg-background/80 backdrop-blur-lg">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient">ایده‌ساز</span>
          </Link>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-5">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                داشبورد
              </Link>
              <Link
                to="/ideas"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                ایده‌ها
              </Link>
              <Link
                to="/schedule"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                زمان‌بندی
              </Link>
              <Link
                to="/analytics"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                آنالیز
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button onClick={logout} variant="outline">
                خروج
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">ورود</Button>
              </Link>
              <Link to="/register">
                <Button>ثبت نام</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
