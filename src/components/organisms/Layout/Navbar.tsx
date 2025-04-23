import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, MessageSquare, Settings, X } from "lucide-react";
import { NavigationLink, Logo } from "@/components/atoms";
import { ChatbotSidebar } from "@/components/molecules";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".hamburger-btn")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-6 border-b bg-background/80 backdrop-blur-lg transition-all ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* left section */}
          <div className="flex items-center gap-6">
            <Logo />
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-5">
                <NavigationLink menuName="داشبورد" to="/dashboard" />
                <NavigationLink menuName="ایده‌ها" to="/ideas" />
                <NavigationLink menuName="زمان‌بندی" to="/schedule" />
                <NavigationLink menuName="آنالیز" to="/analytics" />
              </nav>
            )}
          </div>

          {/* right section */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* desktop icons */}
                <div className="hidden md:flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/calendar")}
                  >
                    <Calendar className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setChatOpen(true)}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>

                {/* logout & hamburger */}
                <Button
                  onClick={logout}
                  variant="outline"
                  className="hidden md:flex"
                >
                  خروج
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hamburger-btn"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button>ورود/ثبت‌نام</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ------------ MOBILE MENU ------------ */}
      {isAuthenticated && (
        <div
          className={`fixed top-16 inset-x-0 z-40 md:hidden mobile-menu transition-all duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="bg-background/95 backdrop-blur-lg border-b shadow-lg">
            <nav className="container py-4 flex flex-col gap-4">
              <NavigationLink
                menuName="داشبورد"
                to="/dashboard"
                onClick={() => setIsOpen(false)}
              />
              <NavigationLink
                menuName="ایده‌ها"
                to="/ideas"
                onClick={() => setIsOpen(false)}
              />
              <NavigationLink
                menuName="زمان‌بندی"
                to="/schedule"
                onClick={() => setIsOpen(false)}
              />
              <NavigationLink
                menuName="آنالیز"
                to="/analytics"
                onClick={() => setIsOpen(false)}
              />

              {/* mobile extra actions */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/calendar");
                  }}
                >
                  <Calendar className="h-5 w-5 ml-2" />
                  تقویم
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    setIsOpen(false);
                    setChatOpen(true);
                  }}
                >
                  <MessageSquare className="h-5 w-5 ml-2" />
                  پیام‌ها
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Settings className="h-5 w-5 ml-2" />
                  تنظیمات
                </Button>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="justify-start"
                >
                  خروج از حساب
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* ------------ CHATBOT SIDEBAR ------------ */}
      <ChatbotSidebar open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};
