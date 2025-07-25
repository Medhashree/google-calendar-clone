import React from 'react';
import Header from './Header';
import MiniCalendar from './MiniCalendar';

const CalendarLayout = ({ currentDate, setCurrentDate, children }) => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-950 text-white">
      <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-neutral-800 border-r border-gray-800 p-4">
          <MiniCalendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CalendarLayout;
