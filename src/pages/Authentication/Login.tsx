import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

// Mock function for sending OTP
const sendOTP = async (phoneNumber: string) => {
  console.log(`Sending OTP to ${phoneNumber}`);
  return new Promise((resolve) => setTimeout(() => resolve("123456"), 1000));
};

// Mock function for verifying OTP
const verifyOTP = async (phoneNumber: string, otp: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === "123456") {
        resolve(true);
      } else {
        reject(new Error("کد تایید اشتباه است"));
      }
    }, 1000);
  });
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفا شماره تلفن را وارد کنید",
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendOTP(phoneNumber);
      setOtpSent(true);
      toast({
        title: "کد تایید ارسال شد",
        description: "کد تایید به شماره شما ارسال شد.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "مشکلی در ارسال کد تایید پیش آمده است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفا کد تایید را وارد کنید",
      });
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP(phoneNumber, otp);
      await login(phoneNumber, "otp_verified"); // Adapt login for phone auth
      toast({
        title: "ورود موفق",
        description: "خوش آمدید!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: error.message || "مشکلی در تایید کد تایید پیش آمده است.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center py-12 animate-fade-in">
      <div className="w-full max-w-md p-8">
        <Card className="glass-effect">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl mb-2">ورود به ایده‌ساز</CardTitle>
            <CardDescription>
              برای ورود، شماره تلفن خود را وارد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!otpSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">شماره تلفن</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="09123456789"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  {isLoading ? "در حال ارسال کد..." : "ارسال کد تایید"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">کد تایید</Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="کد تایید را وارد کنید"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleVerifyOTP}
                  disabled={isLoading}
                >
                  {isLoading ? "در حال تایید کد..." : "تایید کد"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
