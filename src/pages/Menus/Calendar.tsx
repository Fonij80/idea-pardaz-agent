// CalendarPage.tsx – Large grid calendar (React 18 + Tailwind + react‑multi‑date‑picker)
// -----------------------------------------------------------------------------
// ➊ Install deps
//    npm i react-multi-date-picker react-date-object clsx
// ➋ Add a global Tailwind layer override (e.g. src/index.css) to reset the day‑cell padding/flex:
//    @layer utilities {
//      .big-day { @apply w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-lg font-medium rounded-md transition; }
//      .big-day:hover { @apply bg-gray-200 dark:bg-gray-700; }
//      .ceremony   { @apply bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200; }
//    }
// -----------------------------------------------------------------------------

import React, { useState, useMemo } from "react";
import clsx from "clsx";
import DatePicker, { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";

// Base stylesheet (layout only) – keep colours minimal, we’ll style via Tailwind
import "react-multi-date-picker/styles/layouts/prime.css";

// shadcn/ui primitives
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ceremonies = [
  { date: "2025-03-21", title: "Nowruz" },
  { date: "2025-02-11", title: "Islamic Revolution Day" },
  { date: "2025-04-22", title: "Eid al-Fitr" },
];

const CALENDAR_TYPES = { GREGORIAN: "gregorian", JALALI: "jalali" } as const;

type CalType = (typeof CALENDAR_TYPES)[keyof typeof CALENDAR_TYPES];

export const Calendar = () => {
  const [calendarType, setCalendarType] = useState<CalType>(
    CALENDAR_TYPES.GREGORIAN
  );
  const [anchorDate, setAnchorDate] = useState<Date>(new Date());

  const PickerCalendar =
    calendarType === CALENDAR_TYPES.GREGORIAN ? gregorian : persian;
  const locale =
    calendarType === CALENDAR_TYPES.GREGORIAN ? gregorian_en : persian_fa;

  const monthLabel = useMemo(() => {
    const dObj = new DateObject({
      date: anchorDate,
      calendar: PickerCalendar,
      locale,
    });
    return `${dObj.format("MMMM")} ${dObj.year}`;
  }, [anchorDate, PickerCalendar, locale]);

  const shiftMonth = (delta: number) => {
    setAnchorDate((prev) => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() + delta);
      return d;
    });
  };

  // Style EVERY day as a large square; add ceremony highlight if needed
  const mapDays = ({ date }: { date: DateObject }) => {
    const iso = date.toDate().toISOString().slice(0, 10);
    const isCeremony = ceremonies.some((c) => c.date === iso);
    return {
      className: clsx("big-day", isCeremony && "ceremony"),
      onClick: () => {
        const c = ceremonies.find((x) => x.date === iso);
        if (c) alert(c.title);
      },
      children: <span>{date.format("D")}</span>,
    };
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-6xl shadow-xl">
        <CardContent className="p-6 space-y-6">
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => shiftMonth(-1)}
              >
                &lt;
              </Button>
              <Button variant="outline" size="sm" onClick={() => shiftMonth(1)}>
                &gt;
              </Button>
            </div>
            <h2 className="text-2xl font-semibold select-none whitespace-nowrap">
              {monthLabel}
            </h2>
            <ToggleGroup
              type="single"
              value={calendarType}
              onValueChange={(val) => val && setCalendarType(val as CalType)}
              className="gap-1"
            >
              <ToggleGroupItem value={CALENDAR_TYPES.GREGORIAN}>
                Gregorian
              </ToggleGroupItem>
              <ToggleGroupItem value={CALENDAR_TYPES.JALALI}>
                Jalali
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Calendar grid */}
          <DatePicker
            value={anchorDate}
            onChange={(d: DateObject | undefined) =>
              d && setAnchorDate(d.toDate())
            }
            calendar={PickerCalendar}
            locale={locale}
            mapDays={mapDays}
            weekStartDayIndex={calendarType === CALENDAR_TYPES.JALALI ? 6 : 0}
            onlyCalendar
            numberOfMonths={1}
            className="w-full"
            calendarPosition="bottom-center"
            style={{ width: "100%" }}
          />
        </CardContent>
      </Card>
    </div>
  );
};
