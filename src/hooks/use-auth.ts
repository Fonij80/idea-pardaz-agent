import { useState, useEffect } from "react";

type User = {
  id: string;
  username: string;
  email?: string;
  name: string;
  phoneNumber?: string;
  avatar?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = (phoneNumber: string, _otp: string): Promise<User> => {
    return new Promise((resolve) => {
      const mockUser: User = {
        id: "phone-user-" + phoneNumber,
        username: phoneNumber,
        name: "کاربر ایده‌ساز",
        phoneNumber: phoneNumber,
      };

      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);
      resolve(mockUser);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: true,
  };
}
