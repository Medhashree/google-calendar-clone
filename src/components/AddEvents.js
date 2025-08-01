import React, { useState, useEffect } from "react";
import { format, parseISO, isValid } from "date-fns";
import { X, Trash2, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateEvent, deleteEvent, addEvent } from "../redux/eventsSlice";

const colorOptions = [
  "#3f51b5",
  "#e91e63",
  "#4caf50",
  "#ff9800",
  "#f44336",
  "#00bcd4",
  "#9c27b0",
  "#ffc107",
  "#607d8b",
  "#795548",
];

const AddEvents = ({ isOpen, onClose, event, currentDate }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3f51b5");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if(!event) return;
    const now = new Date();

    if (Object.keys(event).length === 0) {
      const defaultDate = currentDate || now;

      setTitle("");
      setDescription("");
      setSelectedColor("#3f51b5");
      setStartTime(format(now, "HH:mm"));
      setEndTime(format(now, "HH:mm"));
      return;
    }

    const parsedStart = event.start ? new Date(event.start) : now;
    const parsedEnd = event.end ? new Date(event.end) : now;

    setTitle(event.title || "");
    setDescription(event.description || "");
    setSelectedColor(event.color || "#3f51b5");

    setStartTime(
      isValid(parsedStart) ? format(parsedStart, "HH:mm") : format(now, "HH:mm")
    );
    setEndTime(
      isValid(parsedEnd) ? format(parsedEnd, "HH:mm") : format(now, "HH:mm")
    );
  }, [event, isOpen, currentDate]); // Run every time modal opens or event changes

  if (!isOpen || !event) return null;

  const handleSave = () => {
  const isNew = Object.keys(event).length === 0;

  const baseDate = currentDate || new Date(); // default date
  const start = new Date(baseDate);
  const end = new Date(baseDate);

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  start.setHours(startHours, startMinutes);
  end.setHours(endHours, endMinutes);

  const newEvent = {
    id: isNew ? Date.now().toString() : event.id, // for new events, assign a unique ID
    title,
    description,
    color: selectedColor,
    start: start.toISOString(),
    end: end.toISOString(),
  };

  if (isNew) {
    dispatch(addEvent(newEvent));
  } else {
    dispatch(updateEvent(newEvent));
  }

  onClose();
};


  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 z-50">
      <div className="absolute top-1/4 left-[60%] bg-gray-900 rounded-xl p-6 w-full max-w-md text-white shadow-xl">
        {/* Top-right icons row */}
        <div className="flex justify-end items-center gap-4 mb-4">
          <Trash2
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white"
            onClick={handleDelete}
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            <X size={20} />
          </button>
        </div>

        {/* Title input */}
        <input
          type="text"
          value={title}
          placeholder="Add title and time"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl bg-transparent border-b border-gray-600 outline-none mb-6 placeholder-gray-400"
        />

        {/* Date and Time */}
        <div className="flex items-center gap-3 text-sm text-white mb-6">
          <Clock className="w-4 h-4" />
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-gray-800 rounded text-sm">
              {format(
                isValid(new Date(event?.start))
                  ? new Date(event.start)
                  : currentDate || new Date(),
                "LLL d, yyyy"
              )}
            </div>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-3 py-1 bg-gray-800 rounded text-sm outline-none"
            />
            <span className="text-gray-400">–</span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-3 py-1 bg-gray-800 rounded text-sm outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <textarea
          placeholder="Add description"
          className="w-full bg-gray-800 text-white p-3 rounded resize-none text-sm h-24 placeholder-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Color Palette */}
        <div className="mt-4 mb-6">
          <div className="text-sm text-gray-400 mb-2">Choose color:</div>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-4 ${
                  selectedColor === color
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvents;
