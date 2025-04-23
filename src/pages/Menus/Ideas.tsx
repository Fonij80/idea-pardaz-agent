import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, TrendingUp, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data for trending topics
const trendingTopics = [
  {
    id: 1,
    name: "هوش مصنوعی برای کسب و کارها",
    category: "تکنولوژی",
    trend: "افزایشی",
  },
  {
    id: 2,
    name: "تولید محتوای ویدیویی کوتاه",
    category: "محتوا",
    trend: "ثابت",
  },
  {
    id: 3,
    name: "استراتژی‌های دیجیتال مارکتینگ",
    category: "بازاریابی",
    trend: "افزایشی",
  },
  { id: 4, name: "مهارت‌های کاری آینده", category: "آموزش", trend: "افزایشی" },
];

// Mock suggestions from agent
const mockSuggestions = [
  "تولید یک سلسله محتوای ویدیویی کوتاه درباره کاربردهای هوش مصنوعی در کسب‌وکارهای کوچک",
  "مصاحبه با متخصصان حوزه دیجیتال مارکتینگ و به اشتراک‌گذاری تجربیات آنها",
  "راه‌اندازی چالش هفتگی با مخاطبان درباره مهارت‌های جدید کاری",
];

// Mock sources for ideas
const mockSources = [
  { title: "مقاله جامع درباره AI در کسب و کارها", type: "مقاله", url: "#" },
  { title: "کتاب استراتژی‌های دیجیتال مارکتینگ", type: "کتاب", url: "#" },
  { title: "وبینار کاربردهای هوش مصنوعی", type: "وبینار", url: "#" },
];

export const Ideas = () => {
  const [idea, setIdea] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sources, setSources] = useState<typeof mockSources>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitIdea = () => {
    if (!idea.trim()) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفا ایده خود را وارد کنید.",
      });
      return;
    }

    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setSources(mockSources);
      setIsLoading(false);

      toast({
        title: "ایده ثبت شد",
        description: "ایده شما با موفقیت تحلیل شد و پیشنهادات آماده است.",
      });
    }, 1500);
  };

  return (
    <>
      <div className="container py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">ایده پرداز محتوا</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>ایده‌ی جدید</CardTitle>
                <CardDescription>
                  ایده خود را برای محتوا وارد کنید تا دستیار هوشمند به شما
                  پیشنهادات لازم را ارائه دهد.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="idea">ایده شما</Label>
                    <Textarea
                      id="idea"
                      placeholder="ایده‌ی خود را برای تولید محتوا توضیح دهید..."
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleSubmitIdea} disabled={isLoading}>
                    {isLoading ? "در حال تحلیل..." : "تحلیل و ارائه پیشنهاد"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {suggestions.length > 0 && (
              <Card className="mb-8 animate-fade-in">
                <CardHeader>
                  <CardTitle>پیشنهادات دستیار محتوا</CardTitle>
                  <CardDescription>
                    بر اساس ایده شما و تحلیل محتواهای موفق قبلی، این پیشنهادات
                    آماده شده است.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg flex items-start gap-3"
                      >
                        <MessageSquare className="h-5 w-5 mt-1 text-primary shrink-0" />
                        <div>
                          <p>{suggestion}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 ml-1" />
                              زمانبندی
                            </Button>
                            <Button variant="outline" size="sm">
                              ذخیره ایده
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {sources.length > 0 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>منابع مرتبط</CardTitle>
                  <CardDescription>
                    منابعی که می‌توانند به شما در تولید محتوای بهتر کمک کنند.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sources.map((source, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-1 rounded-md">
                            <span className="text-xs font-medium text-primary">
                              {source.type}
                            </span>
                          </div>
                          <span>{source.title}</span>
                        </div>
                        <a
                          href={source.url}
                          className="text-primary hover:underline text-sm"
                        >
                          مشاهده
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 ml-2" />
                  روندهای فعلی
                </CardTitle>
                <CardDescription>
                  موضوعات پرطرفدار در حوزه‌های مختلف که می‌توانند به شما ایده
                  بدهند.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="p-3 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{topic.name}</h4>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            topic.trend === "افزایشی"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          } dark:bg-opacity-20`}
                        >
                          {topic.trend}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {topic.category}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Input
                    type="search"
                    placeholder="جستجو در موضوعات..."
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
