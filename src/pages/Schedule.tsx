
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Image, Calendar as CalendarIcon, Clock, Instagram, MessageSquare, Share, Twitter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { faIR } from "date-fns-jalali/locale";

// Mock scheduled content
const initialEvents = [
  {
    id: 1,
    title: "معرفی محصول جدید",
    description: "پست معرفی ویژگی‌های جدید محصول",
    platform: "instagram",
    date: "2025-06-10",
    time: "18:00",
    contentType: "image",
    status: "scheduled"
  },
  {
    id: 2,
    title: "مقاله آموزشی هوش مصنوعی",
    description: "آموزش کاربردهای هوش مصنوعی در زندگی روزمره",
    platform: "blog",
    date: "2025-06-12",
    time: "10:00",
    contentType: "text",
    status: "scheduled"
  },
  {
    id: 3,
    title: "مصاحبه با کارشناس",
    description: "گفتگو با متخصص دیجیتال مارکتینگ",
    platform: "youtube",
    date: "2025-06-14",
    time: "16:00",
    contentType: "video",
    status: "scheduled"
  }
];

// Platform icons mapping
const platformIcons = {
  instagram: <Instagram className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  youtube: <Image className="h-5 w-5" />,
  blog: <MessageSquare className="h-5 w-5" />
};

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    platform: "",
    date: "",
    time: "",
    contentType: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveEvent = () => {
    // Validation
    if (!newEvent.title || !newEvent.platform || !newEvent.date || !newEvent.time) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "لطفا همه فیلدهای ضروری را پر کنید."
      });
      return;
    }

    const event = {
      id: events.length + 1,
      ...newEvent,
      status: "scheduled"
    };

    setEvents([...events, event]);
    setIsDialogOpen(false);
    resetForm();

    toast({
      title: "محتوا زمانبندی شد",
      description: "محتوای شما با موفقیت زمانبندی شد."
    });
  };

  const resetForm = () => {
    setNewEvent({
      title: "",
      description: "",
      platform: "",
      date: "",
      time: "",
      contentType: ""
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setNewEvent({ ...newEvent, date: formattedDate });
    }
  };

  // Filter events for the selected date
  const filteredEvents = date
    ? events.filter(event => event.date === date.toISOString().split('T')[0])
    : events;

  return (
    <PageLayout>
      <div className="container py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">زمانبندی محتوا</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <CalendarIcon className="h-4 w-4 ml-2" />
                زمانبندی جدید
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>زمانبندی محتوای جدید</DialogTitle>
                <DialogDescription>
                  جزئیات محتوا و زمان انتشار آن را وارد کنید.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-left">عنوان</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-left">توضیحات</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-left">پلتفرم</Label>
                  <Select
                    value={newEvent.platform}
                    onValueChange={(value) => setNewEvent({ ...newEvent, platform: value })}
                  >
                    <SelectTrigger id="platform" className="col-span-3">
                      <SelectValue placeholder="انتخاب پلتفرم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">اینستاگرام</SelectItem>
                      <SelectItem value="twitter">توییتر</SelectItem>
                      <SelectItem value="youtube">یوتیوب</SelectItem>
                      <SelectItem value="blog">وبلاگ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contentType" className="text-left">نوع محتوا</Label>
                  <Select
                    value={newEvent.contentType}
                    onValueChange={(value) => setNewEvent({ ...newEvent, contentType: value })}
                  >
                    <SelectTrigger id="contentType" className="col-span-3">
                      <SelectValue placeholder="انتخاب نوع محتوا" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">تصویر</SelectItem>
                      <SelectItem value="video">ویدیو</SelectItem>
                      <SelectItem value="text">متن</SelectItem>
                      <SelectItem value="carousel">کاروسل</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-left">تاریخ انتشار</Label>
                  <div className="col-span-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      locale={faIR}
                      className="border rounded-md p-3"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-left">زمان انتشار</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>لغو</Button>
                <Button onClick={handleSaveEvent}>ذخیره</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>تقویم</CardTitle>
                <CardDescription>
                  تاریخ مورد نظر را برای مشاهده محتواهای زمانبندی شده انتخاب کنید.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  locale={faIR}
                  className="border rounded-md p-3"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">کل محتواهای زمانبندی شده</span>
                    <span className="font-medium">{events.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">محتواهای امروز</span>
                    <span className="font-medium">
                      {events.filter(e => e.date === new Date().toISOString().split('T')[0]).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>محتواهای زمانبندی شده</CardTitle>
                <CardDescription>
                  {date
                    ? `محتواهای زمانبندی شده برای تاریخ ${new Intl.DateTimeFormat('fa-IR').format(date)}`
                    : "همه محتواهای زمانبندی شده"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-full shrink-0">
                              {platformIcons[event.platform as keyof typeof platformIcons] || <Share className="h-5 w-5" />}
                            </div>
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                            </div>
                          </div>
                          <div className="bg-secondary/50 px-2 py-1 rounded text-xs font-medium">
                            {event.status === "scheduled" ? "زمانبندی شده" : "منتشر شده"}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(event.date).toLocaleDateString('fa-IR')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">ویرایش</Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">حذف</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <CalendarIcon className="h-12 w-12 mb-4 mx-auto opacity-50" />
                    <p>برای این تاریخ محتوایی زمانبندی نشده است.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                      افزودن محتوای جدید
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
