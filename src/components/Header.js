import React from 'react';
import { format, startOfToday } from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react';

const Header = ({ currentDate, setCurrentDate }) => {
  const handlePrev = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const handleToday = () => {
    setCurrentDate(startOfToday());
  };

  return (
    <div className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 border-b border-gray-800 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-400 w-6 h-6" />
          <span className="font-bold text-xl">Calendar</span>
        </div>
        <button
          className="bg-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-600"
          onClick={handleToday}
        >
          Today
        </button>
        <button onClick={handlePrev}>
          <ChevronLeft className="w-5 h-5 text-gray-300" />
        </button>
        <button onClick={handleNext}>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
        <h2 className="text-xl font-semibold ml-2">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>

      <div>
        <select className="bg-gray-800 text-white text-sm p-2 rounded">
          <option>Month</option>
          <option>Week</option>
          <option>Day</option>
          <option>Year</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
