import React from "react";
import { format } from "date-fns";
import { X, Pencil, Trash2, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../redux/eventsSlice";

const TaskModal = ({ isOpen, onClose, event, onEdit }) => {
  const dispatch = useDispatch();

  if (!isOpen || !event) return null;

  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 z-50">
      <div className="absolute top-1/4 left-[60%] bg-gray-900 rounded-xl p-6 w-full max-w-md text-white shadow-xl">
        {/* Top-right icons row */}
        <div className="flex justify-end items-center gap-4 mb-4">
          <Pencil
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white"
            onClick={onEdit}
          />
          <Trash2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" onClick={handleDelete} />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            <X size={20} />
          </button>
        </div>

        {/* Event details */}
        <div className="rounded-lg px-4 py-3 space-y-4 shadow-md">
          {/* Title row */}
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: event.color }}
            ></div>
            <div className="text-base text-2xl font-semibold">
              {event.title}
            </div>
          </div>

          {/* Date and time */}
          <div className="flex items-start gap-3 text-lg text-gray-300">
            <Clock className="w-4 h-4 mt-0.5" />
            <div>
              <div>{format(new Date(event.start), "EEEE, MMMM d, yyyy")}</div>
              <div className="text-xs">
                {format(new Date(event.start), "hh:mm a")} –{" "}
                {format(new Date(event.end), "hh:mm a")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
