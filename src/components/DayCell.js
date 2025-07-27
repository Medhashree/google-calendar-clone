import React, { useState } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import EventModal from './EventModal';
import TaskModal from './TaskModal';
import AddEvents from './AddEvents';

const DayCell = ({ day }) => {
  const events = useSelector((state) => state.events);
  const dayEvents = events.filter((event) =>
    isSameDay(
      typeof event.start === 'string' ? parseISO(event.start) : event.start,
      day
    )
  );

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddEventsOpen, setIsAddEventsOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  const openTaskModal = (event) => {
    setActiveEvent(event);
    setIsTaskModalOpen(true);
  };

  const openAddEvent = (event) => {
    setIsTaskModalOpen(false);
    setActiveEvent(event);
    setIsAddEventsOpen(true);
  };

  const handleCreateEvent = () => {
    setActiveEvent({});
    setIsAddEventsOpen(true);
  };

  return (
    <>
      <div
        className="border border-gray-800 p-2 h-full relative bg-gray-950 hover:bg-gray-900 transition rounded-lg flex flex-col"
        onClick={handleCreateEvent}
      >
        <div className="text-xs text-right text-gray-500">{format(day, 'd')}</div>
        <div className="space-y-1 mt-1 overflow-hidden text-xs">
          {dayEvents.slice(0, 2).map((event) => (
            <div
              key={`${event.id}-${event.start}`}
              className="text-[11px] rounded px-2 py-0.5 text-white truncate cursor-pointer"
              style={{ backgroundColor: event.color }}
              onClick={(e) => {
                e.stopPropagation();
                openTaskModal(event);
              }}
            >
              <span className="font-medium">
                {event.start ? format(new Date(event.start), 'HH:mm') : ''}
              </span>{' '}
              {event.title}
            </div>
          ))}
          {dayEvents.length > 2 && (
            <button
              className="text-[10px] text-blue-400 mt-1 text-left"
              onClick={(e) => {
                e.stopPropagation();
                setIsEventModalOpen(true);
              }}
            >
              +{dayEvents.length - 2} more
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
        currentDate={day}
      />
    </>
  );
};

export default DayCell;