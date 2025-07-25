import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  format,
  subMonths,
  addMonths,
  startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MiniCalendar = ({ currentDate, setCurrentDate }) => {
  const today = startOfToday();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  let day = startDate;
  const days = [];

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrevMonth}>
          <ChevronLeft className="w-5 h-5 text-gray-300" />
        </button>
        <div className="font-semibold text-sm">{format(monthStart, 'MMMM yyyy')}</div>
        <button onClick={handleNextMonth}>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-center text-gray-400 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-xs gap-y-1 text-center">
        {days.map((dayItem, idx) => {
          const isToday = isSameDay(dayItem, today);
          const isInactive = !isSameMonth(dayItem, currentDate);

          return (
            <div
              key={idx}
              className={`py-1 rounded-full ${
                isToday ? 'bg-blue-500 text-white' : ''
              } ${isInactive ? 'text-gray-500' : ''}`}
            >
              {format(dayItem, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
