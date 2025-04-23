import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUp,
  TrendingUp,
  User,
  Calendar,
  MessageSquare,
  Image,
} from "lucide-react";

// Mock data for demonstration
const mockStats = {
  totalFollowers: 12456,
  newFollowers: 234,
  totalEngagement: 5678,
  engagementRate: 3.2,
  totalPosts: 87,
  scheduledPosts: 5,
};

const mockPlatforms = [
  { name: "اینستاگرام", followers: 8700, growth: 2.3, engagement: 4.2 },
  { name: "توییتر", followers: 2300, growth: 1.7, engagement: 2.8 },
  { name: "یوتیوب", followers: 1450, growth: 3.5, engagement: 5.1 },
];

const mockIdeas = [
  "محتوای آموزشی در مورد هوش مصنوعی و کاربردهای آن",
  "معرفی محصول جدید با تمرکز بر مزایای رقابتی",
  "مصاحبه با متخصصان حوزه دیجیتال مارکتینگ",
];

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">داشبورد</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                دنبال‌کنندگان
              </CardTitle>
              <User className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockStats.totalFollowers.toLocaleString("fa-IR")}
              </div>
              <div className="text-sm text-muted-foreground mt-2 flex items-center">
                <ArrowUp className="h-4 w-4 ml-1 text-green-500" />
                <span className="text-green-500">
                  {mockStats.newFollowers.toLocaleString("fa-IR")}
                </span>
                <span className="mr-1"> جدید در ماه اخیر</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">نرخ تعامل</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockStats.engagementRate}%
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {mockStats.totalEngagement.toLocaleString("fa-IR")} تعامل در ماه
                اخیر
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                زمانبندی محتوا
              </CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockStats.scheduledPosts.toLocaleString("fa-IR")}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                پست زمانبندی شده برای انتشار
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="platforms" className="mb-8" dir="rtl">
          <TabsList className="mb-4">
            <TabsTrigger value="platforms">پلتفرم‌ها</TabsTrigger>
            <TabsTrigger value="ideas">ایده‌های پیشنهادی</TabsTrigger>
            <TabsTrigger value="schedule">زمانبندی هفته</TabsTrigger>
          </TabsList>
          <TabsContent value="platforms">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockPlatforms.map((platform) => (
                <Card
                  key={platform.name}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                    <CardDescription>
                      {platform.followers.toLocaleString("fa-IR")} دنبال کننده
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        رشد ماهانه
                      </span>
                      <span className="text-green-500 flex items-center">
                        <ArrowUp className="h-3 w-3 ml-1" />
                        {platform.growth}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        نرخ تعامل
                      </span>
                      <span>{platform.engagement}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ideas">
            <Card>
              <CardHeader>
                <CardTitle>ایده‌های پیشنهادی برای محتوا</CardTitle>
                <CardDescription>
                  بر اساس تحلیل محتواهای موفق قبلی و روندهای فعلی
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mockIdeas.map((idea, index) => (
                    <li
                      key={index}
                      className="p-4 border rounded-md flex items-center gap-3"
                    >
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>زمانبندی محتوای هفته</CardTitle>
                <CardDescription>
                  محتواهای زمانبندی شده برای انتشار
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Image className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">معرفی محصول جدید</div>
                        <div className="text-sm text-muted-foreground">
                          اینستاگرام
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">دوشنبه، ساعت 18:00</div>
                  </div>

                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">
                          مقاله آموزشی هوش مصنوعی
                        </div>
                        <div className="text-sm text-muted-foreground">
                          وبلاگ
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">چهارشنبه، ساعت 10:00</div>
                  </div>

                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Image className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">مصاحبه با کارشناس</div>
                        <div className="text-sm text-muted-foreground">
                          یوتیوب
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">جمعه، ساعت 16:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
