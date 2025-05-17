
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Edit, Calendar, Users, ClipboardList } from "lucide-react";

// Sample reservation data
const reservations = [
  {
    id: "RES-001",
    guestNameEn: "Ali Al-Balushi",
    guestNameAr: "علي البلوشي",
    tableNumber: "12",
    partySize: 4,
    time: "18:00",
    date: "2025-05-17",
    status: "Confirmed",
    statusAr: "مؤكد",
    specialRequest: "Window seat preferred",
    specialRequestAr: "يفضل مقعد بجانب النافذة",
    contactNumber: "+968 9123 4567",
    officerRank: "Captain",
    officerRankAr: "نقيب"
  },
  {
    id: "RES-002",
    guestNameEn: "Mohammed Al-Busaidi",
    guestNameAr: "محمد البوسعيدي",
    tableNumber: "05",
    partySize: 2,
    time: "19:30",
    date: "2025-05-17",
    status: "Confirmed",
    statusAr: "مؤكد",
    specialRequest: null,
    specialRequestAr: null,
    contactNumber: "+968 9567 1234",
    officerRank: "Major",
    officerRankAr: "رائد"
  },
  {
    id: "RES-003",
    guestNameEn: "Fatma Al-Siyabi",
    guestNameAr: "فاطمة السيابي",
    tableNumber: "08",
    partySize: 6,
    time: "19:00",
    date: "2025-05-17",
    status: "Cancelled",
    statusAr: "ملغي",
    specialRequest: "Birthday celebration",
    specialRequestAr: "احتفال عيد ميلاد",
    contactNumber: "+968 9234 5671",
    officerRank: "Lieutenant",
    officerRankAr: "ملازم"
  },
  {
    id: "RES-004",
    guestNameEn: "Abdullah Al-Habsi",
    guestNameAr: "عبدالله الحبسي",
    tableNumber: "14",
    partySize: 3,
    time: "20:30",
    date: "2025-05-17",
    status: "No-show",
    statusAr: "لم يحضر",
    specialRequest: null,
    specialRequestAr: null,
    contactNumber: "+968 9345 6712",
    officerRank: "Colonel",
    officerRankAr: "عقيد"
  },
  {
    id: "RES-005",
    guestNameEn: "Ahmed Al-Harthi",
    guestNameAr: "أحمد الحارثي",
    tableNumber: "03",
    partySize: 2,
    time: "18:30",
    date: "2025-05-17",
    status: "Seated",
    statusAr: "جالس",
    specialRequest: "Quiet area",
    specialRequestAr: "منطقة هادئة",
    contactNumber: "+968 9456 7123",
    officerRank: "Captain",
    officerRankAr: "نقيب"
  },
  {
    id: "RES-006",
    guestNameEn: "Saeed Al-Maskari",
    guestNameAr: "سعيد المسكري",
    tableNumber: "07",
    partySize: 8,
    time: "19:45",
    date: "2025-05-17",
    status: "Waiting",
    statusAr: "في الانتظار",
    specialRequest: "Large table needed",
    specialRequestAr: "بحاجة لطاولة كبيرة",
    contactNumber: "+968 9671 2345",
    officerRank: "General",
    officerRankAr: "جنرال"
  }
];

export function TableReservationsTable() {
  const { t, language } = useLanguage();

  // Helper function to get badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-blue-100 text-blue-800">{language === "ar" ? "مؤكد" : "Confirmed"}</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">{language === "ar" ? "ملغي" : "Cancelled"}</Badge>;
      case "No-show":
        return <Badge className="bg-red-100 text-red-800">{language === "ar" ? "لم يحضر" : "No-show"}</Badge>;
      case "Seated":
        return <Badge className="bg-green-100 text-green-800">{language === "ar" ? "جالس" : "Seated"}</Badge>;
      case "Waiting":
        return <Badge className="bg-amber-100 text-amber-800">{language === "ar" ? "في الانتظار" : "Waiting"}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("Reservation ID")}</TableHead>
          <TableHead>{t("Guest")}</TableHead>
          <TableHead className="text-center">{t("Table #")}</TableHead>
          <TableHead className="text-center">{t("Party Size")}</TableHead>
          <TableHead>{t("Time")}</TableHead>
          <TableHead>{t("Status")}</TableHead>
          <TableHead>{t("Special Request")}</TableHead>
          <TableHead className="text-center">{t("Actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.id}</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">
                  {language === "ar" ? reservation.guestNameAr : reservation.guestNameEn}
                </div>
                <div className="text-sm text-gray-500">
                  {language === "ar" ? reservation.officerRankAr : reservation.officerRank}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">{reservation.tableNumber}</TableCell>
            <TableCell className="text-center">{reservation.partySize}</TableCell>
            <TableCell>{reservation.time}</TableCell>
            <TableCell>{getStatusBadge(reservation.status)}</TableCell>
            <TableCell>
              {reservation.specialRequest ? (
                language === "ar" ? reservation.specialRequestAr : reservation.specialRequest
              ) : (
                <span className="text-gray-400">{t("None")}</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex justify-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Calendar size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ClipboardList size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
