import React, { useState, useEffect } from "react";
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
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import AddEvents from "./AddEvents";

const MiniCalendar = ({ currentDate, setCurrentDate }) => {
  const [displayedMonth, setDisplayedMonth] = useState(currentDate);
  const [isAddEventsOpen, setIsAddEventsOpen] = useState(false);
  const today = startOfToday();

  const monthStart = startOfMonth(displayedMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  useEffect(() => {
    setDisplayedMonth(currentDate);
  }, [currentDate]);

  const handlePrevMonth = () => setDisplayedMonth((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setDisplayedMonth((prev) => addMonths(prev, 1));

  let day = startDate;
  const days = [];

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <>
      <div className="text-white">
      {/* Create Button */}
      <button
        onClick={() => setIsAddEventsOpen(true)}
        className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-600 transition px-6 py-3 rounded-full font-semibold text-base mb-10 mx-auto"
      >
        <Plus className="w-5 h-5" />
        Create
      </button>

      {/* Month Header */}
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrevMonth}>
          <ChevronLeft className="w-5 h-5 text-gray-300" />
        </button>
        <div className="font-semibold text-sm">
          {format(monthStart, "MMMM yyyy")}
        </div>
        <button onClick={handleNextMonth}>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-xs text-center text-gray-400 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
          <div key={index} className="font-semibold">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 text-xs gap-y-1 text-center">
        {days.map((dayItem, idx) => {
          const isToday = isSameDay(dayItem, today);
          const isInactive = !isSameMonth(dayItem, displayedMonth);
          const isSelected = !isToday && isSameDay(dayItem, currentDate);

          return (
            <div
              key={idx}
              className={`py-1 rounded-full cursor-pointer transition
                ${isToday ? "bg-blue-500 text-white" : ""}
                ${isSelected ? "border border-blue-400 text-white" : ""}
                ${isInactive ? "text-gray-500" : ""}
                ${
                  !isToday && !isSelected
                    ? "hover:bg-gray-500 hover:text-white"
                    : ""
                }
              `}
              onClick={() => setCurrentDate(dayItem)}
            >
              {format(dayItem, "d")}
            </div>
          );
        })}
      </div>
    </div>

    <AddEvents
        isOpen={isAddEventsOpen}
        onClose={() => setIsAddEventsOpen(false)}
        event={{}}
        currentDate={currentDate}
      />
    </>
  );
};

export default MiniCalendar;
