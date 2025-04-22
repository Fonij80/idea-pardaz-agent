
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { PageLayout } from "@/components/layout/PageLayout";
import { toast } from "@/components/ui/use-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast({
        title: "ورود موفق",
        description: "خوش آمدید!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "نام کاربری یا رمز عبور اشتباه است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageLayout>
      <div className="container flex items-center justify-center py-12 animate-fade-in">
        <div className="w-full max-w-md">
          <Card className="glass-effect">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl mb-2">ورود به ایدی پرداز</CardTitle>
              <CardDescription>
                وارد حساب کاربری خود شوید تا به دستیار هوشمند تولید محتوا دسترسی پیدا کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">رمز عبور</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      فراموشی رمز عبور؟
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="رمز عبور خود را وارد کنید"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "در حال ورود..." : "ورود"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="text-center w-full">
                حساب کاربری ندارید؟{" "}
                <Link to="/register" className="text-primary hover:underline">
                  ثبت نام کنید
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
