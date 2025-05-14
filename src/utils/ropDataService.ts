
import { generateMockData } from './mockData';
import { useLanguage } from '@/contexts/LanguageContext';

export function useRopDataService() {
  const { language, translate } = useLanguage();
  const initialData = generateMockData();
  
  // Function to translate a single booking based on current language
  const translateBooking = (booking) => {
    return {
      ...booking,
      name: translate(booking.name, 'names'),
      rank: translate(booking.rank, 'ranks'),
      room: translate(booking.room, 'rooms'),
      status: translate(booking.status, 'status')
    };
  };
  
  // Function to translate a single dining order based on current language
  const translateDiningOrder = (order) => {
    return {
      ...order,
      name: translate(order.name, 'names'),
      meal: translate(order.meal, 'meals'),
      dietary: translate(order.dietary, 'dietary'),
      status: translate(order.status, 'status')
    };
  };
  
  // Function to translate a single event based on current language
  const translateEvent = (event) => {
    return {
      ...event,
      name: translate(event.name, 'events'),
      location: translate(event.location, 'locations'),
      status: translate(event.status, 'status')
    };
  };
  
  // Get translated data based on current language
  const getTranslatedData = () => {
    return {
      bookings: initialData.bookings.map(translateBooking),
      diningOrders: initialData.diningOrders.map(translateDiningOrder),
      events: initialData.events.map(translateEvent),
      // ... and so on for other data types
    };
  };
  
  // Export the translation helpers
  return {
    translateBooking,
    translateDiningOrder,
    translateEvent,
    getTranslatedData
  };
}
