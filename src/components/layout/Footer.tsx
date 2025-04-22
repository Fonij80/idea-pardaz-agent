
export function Footer() {
  return (
    <footer className="py-6 px-4 md:px-6 border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© ۱۴۰۴ ایدی پرداز. تمام حقوق محفوظ است.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground">قوانین و مقررات</a>
          <a href="#" className="hover:text-foreground">حریم خصوصی</a>
          <a href="#" className="hover:text-foreground">تماس با ما</a>
        </div>
      </div>
    </footer>
  );
}
