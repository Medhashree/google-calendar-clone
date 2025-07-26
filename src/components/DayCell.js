import React, { useState } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import EventModal from './EventModal';
import TaskModal from './TaskModal';
import AddEvents from './AddEvents';

const DayCell = ({ day }) => {
  const events = useSelector((state) => state.events);
  const dayEvents = events.filter((event) => isSameDay(parseISO(event.start), day));

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddEventsOpen, setIsAddEventsOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState({});

  const openTaskModal = (event) => {
    setActiveEvent(event);
    setIsTaskModalOpen(true);
  };

  const openAddEvent = (event) => {
    setIsTaskModalOpen(false);
    setActiveEvent(event);
    setIsAddEventsOpen(true);
  };

  return (
    <>
      <div className="border border-gray-800 p-2 h-full relative bg-gray-950 hover:bg-gray-900 transition rounded-lg flex flex-col">
        <div className="text-xs text-right text-gray-500">{format(day, 'd')}</div>
        <div className="space-y-1 mt-1 overflow-hidden text-xs">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="text-[11px] rounded px-2 py-0.5 text-white truncate cursor-pointer"
              style={{ backgroundColor: event.color }}
              onClick={() => openTaskModal(event)}
            >
              <span className="font-medium">
                {format(parseISO(event.start), 'HH:mm')}
              </span>{' '}
              {event.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <button
              className="text-[10px] text-blue-400 mt-1 text-left"
              onClick={() => setIsEventModalOpen(true)}
            >
              +{dayEvents.length - 3} more
            </button>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        events={dayEvents}
        date={day}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onEdit={() => openAddEvent(activeEvent)}
        event={activeEvent}
      />
      
      <AddEvents
        isOpen={isAddEventsOpen}
        onClose={() => setIsAddEventsOpen(false)}
        event={activeEvent}
      />
    </>
  );
};

export default DayCell;
