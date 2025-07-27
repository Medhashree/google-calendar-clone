import React, { useState } from 'react';
import { format } from 'date-fns';
import TaskModal from './TaskModal';
import AddEvents from './AddEvents';

const EventModal = ({ isOpen, onClose, events, date }) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddEventsOpen, setIsAddEventsOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState({});

  if (!isOpen) return null;

  const isTaskOpen = (event) => {
    setIsTaskModalOpen(true);
    setActiveEvent(event);
  }

  const openAddEvent = (event) => {
    setIsTaskModalOpen(false);
    setActiveEvent(event);
    setIsAddEventsOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-sm relative text-white">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-sm text-gray-400">{format(date, 'EEEE')}</div>
          <div className="text-lg font-semibold">{format(date, 'PPP')}</div>
        </div>

        {/* Event List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded px-3 py-1 text-sm text-white cursor-pointer"
              style={{ backgroundColor: event.color }}
              onClick={() => isTaskOpen(event)}
            >
              <span className="font-medium">{format(new Date(event.start), 'HH:mm')} </span>
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>

    <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        event={activeEvent}
        onEdit={() => openAddEvent(activeEvent)}
      />

      <AddEvents
        isOpen={isAddEventsOpen}
        onClose={() => setIsAddEventsOpen(false)}
        event={activeEvent}
        currentDate={date}
      />
    </>
  );
};

export default EventModal;
