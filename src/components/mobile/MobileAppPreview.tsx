
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  Bed, 
  Utensils, 
  CalendarDays, 
  Bell, 
  CreditCard,
  Clock,
  ChevronRight,
  LogOut,
  Wifi,
  Battery,
  Signal
} from "lucide-react";

interface MobileAppPreviewProps {
  screen: string;
  setScreen: (screen: string) => void;
}

export function MobileAppPreview({ screen, setScreen }: MobileAppPreviewProps) {
  // شاشات التطبيق
  const screens = {
    home: {
      title: "الرئيسية",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h3 className="font-bold mb-1">مرحباً، النقيب عمر</h3>
            <p className="text-sm text-gray-600">درجة الضابط: نقيب</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => setScreen("rooms")}>
              <Bed className="h-6 w-6 mb-1" />
              <span>الغرف</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => setScreen("dining")}>
              <Utensils className="h-6 w-6 mb-1" />
              <span>المطعم</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => setScreen("events")}>
              <CalendarDays className="h-6 w-6 mb-1" />
              <span>الفعاليات</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" onClick={() => setScreen("profile")}>
              <User className="h-6 w-6 mb-1" />
              <span>الملف الشخصي</span>
            </Button>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <h4 className="text-sm font-bold mb-1">إعلان</h4>
            <p className="text-xs">فعالية خاصة للضباط يوم الخميس القادم</p>
          </div>
        </div>
      )
    },
    rooms: {
      title: "حجز الغرف",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <h3 className="font-medium mb-1">البحث عن غرف</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-white rounded p-2 text-xs">
                <p className="text-gray-500">تاريخ الوصول</p>
                <p className="font-medium">١٥ مايو ٢٠٢٥</p>
              </div>
              <div className="bg-white rounded p-2 text-xs">
                <p className="text-gray-500">تاريخ المغادرة</p>
                <p className="font-medium">١٧ مايو ٢٠٢٥</p>
              </div>
            </div>
            <Button className="w-full" size="sm">بحث</Button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg border p-3 relative">
              <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs py-0.5 px-2 rounded-full">متاح</span>
              <div className="h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                [صورة الغرفة]
              </div>
              <h4 className="font-medium">غرفة فاخرة مزدوجة</h4>
              <p className="text-xs text-gray-600 mb-2">سرير مزدوج، إطلالة على الحديقة</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">٦٠٠ ج.م/ليلة</span>
                <Button size="sm" variant="outline">احجز الآن</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-3 relative">
              <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs py-0.5 px-2 rounded-full">محجوزة</span>
              <div className="h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                [صورة الغرفة]
              </div>
              <h4 className="font-medium">جناح تنفيذي</h4>
              <p className="text-xs text-gray-600 mb-2">سرير ملكي، غرفة معيشة منفصلة</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">٩٠٠ ج.م/ليلة</span>
                <Button size="sm" variant="outline" disabled>غير متاحة</Button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    dining: {
      title: "المطعم",
      content: (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button size="sm" variant="outline" className="whitespace-nowrap">الكل</Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">أطباق رئيسية</Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">مقبلات</Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">حلويات</Button>
            <Button size="sm" variant="outline" className="whitespace-nowrap">مشروبات</Button>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg border p-3 flex">
              <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <h4 className="font-medium">لحم مشوي مع الخضروات</h4>
                <p className="text-xs text-gray-600 mb-1">لحم مشوي مع تشكيلة من الخضروات الموسمية</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">٨٥ ج.م</span>
                  <Button size="sm" variant="outline">أضف للسلة</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-3 flex">
              <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <h4 className="font-medium">سلطة موسمية</h4>
                <p className="text-xs text-gray-600 mb-1">سلطة طازجة مع خضروات موسمية</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">٢٥ ج.م</span>
                  <Button size="sm" variant="outline">أضف للسلة</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-3 flex">
              <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
              <div className="ml-3 flex-grow">
                <h4 className="font-medium">أرز بالبخاري</h4>
                <p className="text-xs text-gray-600 mb-1">أرز بالبخاري بالمكسرات والزبيب</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">٣٠ ج.م</span>
                  <Button size="sm" variant="outline">أضف للسلة</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    events: {
      title: "الفعاليات",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">فعاليات هذا الشهر</h3>
              <Button size="sm" variant="outline">التقويم</Button>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button variant="outline" size="sm" className="flex flex-col h-16 w-12">
                <span className="text-xs">الأحد</span>
                <span className="font-bold">١٥</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-16 w-12">
                <span className="text-xs">الاثنين</span>
                <span className="font-bold">١٦</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-16 w-12">
                <span className="text-xs">الثلاثاء</span>
                <span className="font-bold">١٧</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-16 w-12">
                <span className="text-xs">الأربعاء</span>
                <span className="font-bold">١٨</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col h-16 w-12">
                <span className="text-xs">الخميس</span>
                <span className="font-bold">١٩</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg border p-3">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">حفل عشاء للضباط</h4>
                <span className="text-xs text-gray-500">١٥ مايو</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">حفل عشاء خاص للضباط بمناسبة يوم القوات المسلحة</p>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>٧:٠٠ مساءًا</span>
              </div>
              <Button size="sm" className="w-full">التسجيل</Button>
            </div>
            
            <div className="bg-white rounded-lg border p-3">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">ندوة تثقيفية</h4>
                <span className="text-xs text-gray-500">١٧ مايو</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">ندوة تثقيفية حول التطورات العسكرية الحديثة</p>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Clock className="h-3 w-3 mr-1" />
                <span>٤:٠٠ مساءًا</span>
              </div>
              <Button size="sm" className="w-full">التسجيل</Button>
            </div>
          </div>
        </div>
      )
    },
    profile: {
      title: "الملف الشخصي",
      content: (
        <div className="space-y-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
              <User className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="font-bold">النقيب عمر محمد</h3>
            <p className="text-sm text-gray-600">الرتبة: نقيب</p>
            <p className="text-sm text-gray-600">رقم العضوية: #12345</p>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>المعلومات الشخصية</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>الحجوزات السابقة</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>طلبات الطعام</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="w-full flex justify-between items-center">
              <span>الإعدادات</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="w-full flex justify-between items-center text-red-500">
              <span>تسجيل الخروج</span>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }
  };

  const currentScreen = screens[screen as keyof typeof screens] || screens.home;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>تطبيق الهاتف - معاينة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-4 border-gray-900 rounded-3xl overflow-hidden max-w-[320px] mx-auto">
          {/* شريط الحالة */}
          <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
            <div className="text-xs">9:41 AM</div>
            <div className="flex space-x-1 items-center">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <Battery className="h-3 w-3" />
            </div>
          </div>
          
          {/* محتوى الشاشة */}
          <div className="bg-gray-100 p-3 h-[460px] overflow-y-auto">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-bold mb-4">{currentScreen.title}</h2>
              {currentScreen.content}
            </div>
          </div>
          
          {/* شريط التنقل */}
          <div className="bg-white border-t border-gray-200 py-2 px-3 flex justify-around">
            <Button variant="ghost" size="sm" className="h-12 w-12 p-0" onClick={() => setScreen("home")}>
              <div className="flex flex-col items-center">
                <Home className="h-4 w-4" />
                <span className="text-xs mt-1">الرئيسية</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="h-12 w-12 p-0" onClick={() => setScreen("rooms")}>
              <div className="flex flex-col items-center">
                <Bed className="h-4 w-4" />
                <span className="text-xs mt-1">الغرف</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="h-12 w-12 p-0" onClick={() => setScreen("dining")}>
              <div className="flex flex-col items-center">
                <Utensils className="h-4 w-4" />
                <span className="text-xs mt-1">المطعم</span>
              </div>
            </Button>
            <Button variant="ghost" size="sm" className="h-12 w-12 p-0" onClick={() => setScreen("profile")}>
              <div className="flex flex-col items-center">
                <User className="h-4 w-4" />
                <span className="text-xs mt-1">الملف</span>
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
