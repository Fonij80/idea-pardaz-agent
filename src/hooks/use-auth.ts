
import { useState, useEffect } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is saved in localStorage for demo purposes
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // This is a mock login - in a real app, you would call your Django API
      setTimeout(() => {
        if (email && password) {
          const mockUser: User = {
            id: "123",
            username: email.split('@')[0],
            email: email,
            name: "کاربر ایدی پرداز",
          };
          
          localStorage.setItem("user", JSON.stringify(mockUser));
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error("نام کاربری یا رمز عبور نادرست است"));
        }
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const register = (email: string, password: string, name: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // This is a mock register - in a real app, you would call your Django API
      setTimeout(() => {
        if (email && password) {
          const mockUser: User = {
            id: "123",
            username: email.split('@')[0],
            email: email,
            name: name,
          };
          
          localStorage.setItem("user", JSON.stringify(mockUser));
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error("خطا در ثبت نام"));
        }
      }, 800);
    });
  };

  return {
    user,
    isLoading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };
}
