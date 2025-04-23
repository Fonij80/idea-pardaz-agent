import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatbotSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const ChatbotSidebar = ({ open, onClose }: ChatbotSidebarProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // close when clicking outside the panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <>
      {/* semi-transparent backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* sliding panel */}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[90%] bg-background shadow-lg transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* header */}
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold">Chatbot</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </header>

        {/* message list – scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* TODO: render messages here */}
          <div className="text-muted-foreground text-sm">
            👋 هنوز پیامی ارسال نشده است
          </div>
        </div>

        {/* composer */}
        <form
          className="flex gap-2 border-t px-4 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: handle send
          }}
        >
          <input
            className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none"
            placeholder="پیام خود را بنویسید…"
          />
          <Button type="submit">ارسال</Button>
        </form>
      </div>
    </>
  );
};
