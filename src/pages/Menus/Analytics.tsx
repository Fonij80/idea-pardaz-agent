import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUp,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Share,
} from "lucide-react";

// Mock analytics data
const mockPerformance = {
  followers: {
    total: 15420,
    change: 324,
    percentage: 2.1,
  },
  engagement: {
    total: 2345,
    change: 156,
    percentage: 7.1,
  },
  impressions: {
    total: 45600,
    change: -890,
    percentage: -1.9,
  },
  comments: {
    total: 987,
    change: 54,
    percentage: 5.8,
  },
};

// Mock top performing content
const mockTopContent = [
  {
    id: 1,
    title: "معرفی تکنیک‌های جدید بازاریابی دیجیتال",
    platform: "اینستاگرام",
    type: "کاروسل",
    engagement: 1245,
    comments: 87,
    shares: 32,
  },
  {
    id: 2,
    title: "آموزش کاربردهای هوش مصنوعی در کسب و کار",
    platform: "یوتیوب",
    type: "ویدئو",
    engagement: 895,
    comments: 63,
    shares: 41,
  },
  {
    id: 3,
    title: "۷ روش افزایش بهره‌وری در محیط کار",
    platform: "وبلاگ",
    type: "مقاله",
    engagement: 734,
    comments: 46,
    shares: 28,
  },
];

// Mock comments data
const mockComments = [
  {
    id: 1,
    user: "سارا محمدی",
    content: "محتوای بسیار مفید و کاربردی. منتظر مطالب بیشتر شما هستم!",
    post: "معرفی تکنیک‌های جدید بازاریابی دیجیتال",
    platform: "اینستاگرام",
    sentiment: "مثبت",
  },
  {
    id: 2,
    user: "علی رضایی",
    content:
      "آیا در مورد تکنیک‌های سئو هم مطلبی دارید؟ این حوزه برام خیلی جذابه.",
    post: "آموزش کاربردهای هوش مصنوعی در کسب و کار",
    platform: "یوتیوب",
    sentiment: "خنثی",
  },
  {
    id: 3,
    user: "نیما کریمی",
    content: "اطلاعات خیلی سطحی بود. انتظار داشتم بیشتر به جزئیات پرداخته شود.",
    post: "۷ روش افزایش بهره‌وری در محیط کار",
    platform: "وبلاگ",
    sentiment: "منفی",
  },
];

// Mock audience demographics
const mockDemographics = {
  age: [
    { group: "۱۸-۲۴", percentage: 15 },
    { group: "۲۵-۳۴", percentage: 42 },
    { group: "۳۵-۴۴", percentage: 28 },
    { group: "۴۵-۵۴", percentage: 10 },
    { group: "۵۵+", percentage: 5 },
  ],
  gender: [
    { type: "مرد", percentage: 58 },
    { type: "زن", percentage: 42 },
  ],
  location: [
    { city: "تهران", percentage: 45 },
    { city: "اصفهان", percentage: 15 },
    { city: "مشهد", percentage: 12 },
    { city: "شیراز", percentage: 8 },
    { city: "سایر", percentage: 20 },
  ],
};

export default function Analytics() {
  const [platform, setPlatform] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("month");

  return (
    <>
      <div className="container py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">آنالیز عملکرد</h1>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="انتخاب پلتفرم" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه پلتفرم‌ها</SelectItem>
                <SelectItem value="instagram">اینستاگرام</SelectItem>
                <SelectItem value="twitter">توییتر</SelectItem>
                <SelectItem value="youtube">یوتیوب</SelectItem>
                <SelectItem value="blog">وبلاگ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="بازه زمانی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">هفته اخیر</SelectItem>
                <SelectItem value="month">ماه اخیر</SelectItem>
                <SelectItem value="quarter">سه ماهه اخیر</SelectItem>
                <SelectItem value="year">سال اخیر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                دنبال‌کنندگان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockPerformance.followers.total.toLocaleString("fa-IR")}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div
                  className={`flex items-center ${
                    mockPerformance.followers.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {mockPerformance.followers.change > 0 ? (
                    <ArrowUp className="h-4 w-4 ml-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 ml-1" />
                  )}
                  {mockPerformance.followers.change > 0 ? "+" : ""}
                  {mockPerformance.followers.percentage}%
                </div>
                <div className="text-muted-foreground mr-1">
                  در{" "}
                  {timeRange === "week"
                    ? "هفته"
                    : timeRange === "month"
                    ? "ماه"
                    : timeRange === "quarter"
                    ? "سه ماه"
                    : "سال"}{" "}
                  اخیر
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">تعامل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockPerformance.engagement.total.toLocaleString("fa-IR")}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div
                  className={`flex items-center ${
                    mockPerformance.engagement.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {mockPerformance.engagement.change > 0 ? (
                    <ArrowUp className="h-4 w-4 ml-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 ml-1" />
                  )}
                  {mockPerformance.engagement.change > 0 ? "+" : ""}
                  {mockPerformance.engagement.percentage}%
                </div>
                <div className="text-muted-foreground mr-1">
                  در{" "}
                  {timeRange === "week"
                    ? "هفته"
                    : timeRange === "month"
                    ? "ماه"
                    : timeRange === "quarter"
                    ? "سه ماه"
                    : "سال"}{" "}
                  اخیر
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">بازدید</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockPerformance.impressions.total.toLocaleString("fa-IR")}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div
                  className={`flex items-center ${
                    mockPerformance.impressions.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {mockPerformance.impressions.change > 0 ? (
                    <ArrowUp className="h-4 w-4 ml-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 ml-1" />
                  )}
                  {mockPerformance.impressions.change > 0 ? "+" : ""}
                  {mockPerformance.impressions.percentage}%
                </div>
                <div className="text-muted-foreground mr-1">
                  در{" "}
                  {timeRange === "week"
                    ? "هفته"
                    : timeRange === "month"
                    ? "ماه"
                    : timeRange === "quarter"
                    ? "سه ماه"
                    : "سال"}{" "}
                  اخیر
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">نظرات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockPerformance.comments.total.toLocaleString("fa-IR")}
              </div>
              <div className="mt-2 flex items-center text-sm">
                <div
                  className={`flex items-center ${
                    mockPerformance.comments.change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {mockPerformance.comments.change > 0 ? (
                    <ArrowUp className="h-4 w-4 ml-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 ml-1" />
                  )}
                  {mockPerformance.comments.change > 0 ? "+" : ""}
                  {mockPerformance.comments.percentage}%
                </div>
                <div className="text-muted-foreground mr-1">
                  در{" "}
                  {timeRange === "week"
                    ? "هفته"
                    : timeRange === "month"
                    ? "ماه"
                    : timeRange === "quarter"
                    ? "سه ماه"
                    : "سال"}{" "}
                  اخیر
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="content">محتواهای برتر</TabsTrigger>
            <TabsTrigger value="audience">مخاطبین</TabsTrigger>
            <TabsTrigger value="comments">نظرات</TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>محتواهای با بیشترین تعامل</CardTitle>
                <CardDescription>
                  محتواهایی که بیشترین میزان تعامل را داشته‌اند.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopContent.map((content) => (
                    <div key={content.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium">{content.title}</h3>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                          {content.platform}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        نوع: {content.type}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 bg-secondary/50 rounded-md text-center">
                          <div className="text-xs text-muted-foreground">
                            تعامل
                          </div>
                          <div className="font-medium">
                            {content.engagement.toLocaleString("fa-IR")}
                          </div>
                        </div>
                        <div className="p-2 bg-secondary/50 rounded-md text-center">
                          <div className="text-xs text-muted-foreground">
                            نظرات
                          </div>
                          <div className="font-medium">
                            {content.comments.toLocaleString("fa-IR")}
                          </div>
                        </div>
                        <div className="p-2 bg-secondary/50 rounded-md text-center">
                          <div className="text-xs text-muted-foreground">
                            اشتراک‌گذاری
                          </div>
                          <div className="font-medium">
                            {content.shares.toLocaleString("fa-IR")}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          تحلیل بیشتر
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="audience">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>توزیع سنی</CardTitle>
                  <CardDescription>ترکیب سنی مخاطبان شما</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDemographics.age.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span>{item.group}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توزیع جنسیتی</CardTitle>
                  <CardDescription>ترکیب جنسیتی مخاطبان شما</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDemographics.gender.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span>{item.type}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div
                            className={`${
                              index === 0 ? "bg-blue-500" : "bg-purple-500"
                            } h-2 rounded-full`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>توزیع جغرافیایی</CardTitle>
                  <CardDescription>محل زندگی مخاطبان شما</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDemographics.location.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span>{item.city}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>تحلیل نظرات</CardTitle>
                <CardDescription>
                  تحلیل احساسات و بازخوردهای مخاطبان
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {comment.user.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{comment.user}</div>
                            <div className="text-xs text-muted-foreground">
                              {comment.platform}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            comment.sentiment === "مثبت"
                              ? "bg-green-100 text-green-800"
                              : comment.sentiment === "منفی"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          } dark:bg-opacity-20`}
                        >
                          {comment.sentiment}
                        </div>
                      </div>
                      <div className="mt-3 bg-secondary/30 p-3 rounded-md">
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        در پست: {comment.post}
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <MessageSquare className="h-3 w-3 ml-1" />
                          پاسخ
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Share className="h-3 w-3 ml-1" />
                          اشتراک‌گذاری
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-center">
                    <Button variant="outline">مشاهده تمام نظرات</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
