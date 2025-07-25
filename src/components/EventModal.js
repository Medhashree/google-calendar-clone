import React from 'react';
import { format } from 'date-fns';

const EventModal = ({ isOpen, onClose, events, date }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative text-white">
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
              className="rounded px-3 py-1 text-sm text-white"
              style={{ backgroundColor: event.color }}
            >
              <span className="font-medium">{format(new Date(event.start), 'HH:mm')} </span>
              {event.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
