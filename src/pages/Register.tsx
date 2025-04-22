
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { PageLayout } from "@/components/layout/PageLayout";
import { toast } from "@/components/ui/use-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "رمز عبور و تکرار آن مطابقت ندارند.",
      });
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      toast({
        title: "ثبت نام موفق",
        description: "حساب کاربری شما با موفقیت ایجاد شد.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطایی در ثبت نام رخ داده است. لطفا مجددا تلاش کنید.",
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
              <CardTitle className="text-2xl mb-2">ایجاد حساب کاربری</CardTitle>
              <CardDescription>
                برای استفاده از خدمات ایدی پرداز، یک حساب کاربری ایجاد کنید.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="نام کامل خود را وارد کنید"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
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
                  <Label htmlFor="password">رمز عبور</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="رمز عبور خود را وارد کنید"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="رمز عبور را مجددا وارد کنید"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="text-center w-full">
                قبلا ثبت نام کرده‌اید؟{" "}
                <Link to="/login" className="text-primary hover:underline">
                  وارد شوید
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
