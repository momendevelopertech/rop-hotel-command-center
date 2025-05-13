
import React from "react";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, TrendingUp } from "lucide-react";

export function EventStats() {
  const { events } = useData();

  // حساب إحصائيات الفعاليات
  const totalEvents = events.length;
  const upcomingEvents = events.filter(event => event.status === "upcoming").length;
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0);

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarDays className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">إجمالي الفعاليات</p>
              <h3 className="text-2xl font-bold">{totalEvents}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">فعاليات قادمة</p>
              <h3 className="text-2xl font-bold">{upcomingEvents}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-700" />
            </div>
            <div className="ms-3">
              <p className="text-sm font-medium text-muted-foreground">إجمالي الحضور</p>
              <h3 className="text-2xl font-bold">{totalAttendees}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
