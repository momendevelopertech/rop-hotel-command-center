
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { CalendarDays } from "lucide-react";

export function EventsCalendar() {
  const { events } = useData();

  // تبسيط تاريخ الفعاليات للعرض في التقويم
  const simplifiedEvents = events.map(event => {
    const dateParts = event.date.split('/');
    return {
      ...event,
      day: parseInt(dateParts[0]),
      month: parseInt(dateParts[1]),
      year: parseInt(dateParts[2])
    };
  });

  // الشهر الحالي (لأغراض العرض)
  const currentMonth = 5; // May
  const currentYear = 2025;
  
  // إنشاء مصفوفة للأيام
  const daysInMonth = 31; // لشهر مايو
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">تقويم الفعاليات</CardTitle>
        <CalendarDays className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <h3 className="font-medium text-lg">مايو 2025</h3>
          <div className="grid grid-cols-7 gap-1 mt-2 text-xs">
            {["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"].map(day => (
              <div key={day} className="p-1 font-medium">
                {day}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {/* ترك مسافة للأيام قبل بداية الشهر (افتراضي أن الأحد هو أول يوم) */}
          {Array.from({ length: 3 }, (_, i) => (
            <div key={`empty-${i}`} className="p-1 text-center text-xs text-gray-400"></div>
          ))}
          
          {days.map(day => {
            const eventsOnDay = simplifiedEvents.filter(
              event => event.day === day && event.month === currentMonth && event.year === currentYear
            );
            
            return (
              <div 
                key={day} 
                className={`
                  p-1 text-center border rounded-md text-xs relative
                  ${eventsOnDay.length > 0 ? 'bg-blue-50 border-blue-200' : ''}
                `}
              >
                {day}
                {eventsOnDay.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${eventsOnDay.length > 0 ? 'bg-blue-500' : ''}`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">الفعاليات القادمة:</h4>
          <div className="space-y-2">
            {simplifiedEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex text-xs">
                <div className="w-1 bg-blue-500 rounded-full mr-2"></div>
                <div>
                  <p className="font-medium">{event.name}</p>
                  <p className="text-gray-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
