// import React from 'react';
// import { format, isSameDay, parseISO } from 'date-fns';
// import { useSelector } from 'react-redux';

// const DayCell = ({ day }) => {
//   const events = useSelector((state) => state.events);
//   const dayEvents = events.filter((event) =>
//     isSameDay(parseISO(event.start), day)
//   );

//   return (
//     <div className="border border-gray-800 p-2 h-full relative bg-gray-950 hover:bg-gray-900 transition rounded-lg flex flex-col">
//       <div className="text-xs text-right text-gray-500">
//         {format(day, 'd')}
//       </div>
//       <div className="space-y-1 mt-1 overflow-hidden">
//         {dayEvents.slice(0, 3).map((event) => (
//           <div
//             key={event.id}
//             className="text-[11px] rounded px-2 py-0.5 text-white truncate"
//             style={{ backgroundColor: event.color }}
//           >
//             <span className="font-medium">{format(parseISO(event.start), 'HH:mm')} </span>
//             {event.title}
//           </div>
//         ))}
//         {dayEvents.length > 3 && (
//           <div className="text-[10px] text-blue-400 cursor-pointer">
//             +{dayEvents.length - 3} more
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DayCell;


import React, { useState } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import EventModal from './EventModal';

const DayCell = ({ day }) => {
  const events = useSelector((state) => state.events);
  const dayEvents = events.filter((event) => isSameDay(parseISO(event.start), day));
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="border border-gray-800 p-2 h-full relative bg-gray-950 hover:bg-gray-900 transition rounded-lg flex flex-col">
        <div className="text-xs text-right text-gray-500">
          {format(day, 'd')}
        </div>
        <div className="space-y-1 mt-1 overflow-hidden text-xs">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="text-[11px] rounded px-2 py-0.5 text-white truncate"
              style={{ backgroundColor: event.color }}
            >
              <span className="font-medium">
                {format(parseISO(event.start), 'HH:mm')}{" "}
              </span>
              {event.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <button
              className="text-[10px] text-blue-400 mt-1 text-left"
              onClick={() => setIsModalOpen(true)}
            >
              +{dayEvents.length - 3} more
            </button>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        events={dayEvents}
        date={day}
      />
    </>
  );
};

export default DayCell;
