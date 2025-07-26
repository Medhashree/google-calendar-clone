import React, { useMemo, useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isAfter,
  isBefore,
  lastDayOfMonth
} from 'date-fns';
import DayCell from './DayCell';

const CalendarMonth = ({ currentDate }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);

  // First day to render in calendar (from previous month)
  let startDate = startOfWeek(monthStart);
  // Last day to render in calendar
  let endDate = endOfWeek(monthEnd);

  // Ensure last row contains at least one current month date
  const tempDay = endDate;
  let lastRowHasCurrentMonth = false;
  for (let i = 0; i < 7; i++) {
    const d = addDays(tempDay, -i);
    if (isSameMonth(d, monthStart)) {
      lastRowHasCurrentMonth = true;
      break;
    }
  }
  if (!lastRowHasCurrentMonth) {
    endDate = addDays(endDate, -7);
  }

  const totalDays = useMemo(() => {
    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [startDate, endDate]);

  const rows = [];
  for (let i = 0; i < totalDays.length; i += 7) {
    rows.push(totalDays.slice(i, i + 7));
  }

  const rowHeight = `calc(100% / ${rows.length})`;

  return (
    <div className="p-4 rounded-xl shadow-lg bg-black border border-gray-800 h-full">
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="flex flex-col h-[calc(100%-2rem)]">
        {rows.map((week, i) => (
          <div
            key={i}
            className="grid grid-cols-7 gap-2 w-full"
            style={{ height: rowHeight }}
          >
            {week.map((day) => (
              <div
                key={day.toISOString()}
                className={`${!isSameMonth(day, monthStart) ? 'bg-gray-900' : ''} p-1 h-full`}
              >
                <DayCell day={day} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarMonth;
