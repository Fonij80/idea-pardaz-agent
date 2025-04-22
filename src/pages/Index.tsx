
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { Calendar, Image, MessageSquare, TrendingUp } from "lucide-react";

export default function Index() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 lg:pt-32 pb-16 md:pb-24">
        <div className="container flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-24">
          <div className="flex flex-col items-center md:items-start text-center md:text-right space-y-6 flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight animate-fade-in">
              <span className="text-gradient">ایدی پرداز</span> <br />
              دستیار هوشمند تولید محتوا
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] animate-fade-in" style={{ animationDelay: "150ms" }}>
              با کمک هوش مصنوعی، ایده‌های خلاقانه تولید کنید، محتوا را زمانبندی کنید و عملکرد آن را تحلیل کنید.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/register">
                <Button size="lg">شروع رایگان</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">ورود به حساب کاربری</Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 glass-effect p-4 rounded-xl animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="rounded-md overflow-hidden aspect-video">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                alt="ایدی پرداز - دستیار هوشمند محتوا"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ویژگی‌های ایدی پرداز</h2>
            <p className="text-muted-foreground text-lg max-w-[700px] mx-auto">
              هوش مصنوعی که به شما در تمام مراحل تولید و انتشار محتوای جذاب کمک می‌کند
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">تولید ایده خلاقانه</h3>
              <p className="text-muted-foreground">
                با تحلیل روندهای برتر و محتواهای موفق قبلی شما، ایده‌های جذاب برای محتوای جدید پیشنهاد می‌دهد.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">زمانبندی هوشمند</h3>
              <p className="text-muted-foreground">
                محتوای شما را در بهترین زمان‌ها زمانبندی و منتشر می‌کند تا بیشترین تعامل را داشته باشید.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">تحلیل نظرات</h3>
              <p className="text-muted-foreground">
                نظرات و بازخوردهای مخاطبان را تحلیل و دسته‌بندی می‌کند تا از عملکرد محتوای خود آگاه شوید.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">تنوع محتوایی</h3>
              <p className="text-muted-foreground">
                برای انواع محتوا از متن و تصویر گرفته تا ویدئو و پادکست، پیشنهادات متناسب ارائه می‌دهد.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">داشبورد تحلیلی</h3>
              <p className="text-muted-foreground">
                عملکرد محتوای شما را در قالب نمودارها و آمارهای دقیق و قابل فهم نمایش می‌دهد.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">پیشنهاد منابع</h3>
              <p className="text-muted-foreground">
                منابع مرتبط و معتبر برای تقویت محتوای شما و افزایش اعتبار آن پیشنهاد می‌دهد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">آماده برای متحول کردن استراتژی محتوای خود هستید؟</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              با ایدی پرداز، دیگر نگران ایده‌های جدید، زمانبندی و تحلیل نباشید. تمام این کارها را به دستیار هوشمند خود بسپارید.
            </p>
            <Link to="/register">
              <Button size="lg" className="px-8 py-6 text-lg">
                همین حالا شروع کنید
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
