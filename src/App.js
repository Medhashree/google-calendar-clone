// src/App.jsx
import React, { useState } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { startOfToday } from "date-fns";

import eventsReducer from "./redux/eventsSlice";
import Header from "./components/Header";
import CalendarMonth from "./components/CalendarMonth";
import CalendarLayout from "./components/CalendarLayout";

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

const App = () => {
  const [currentDate, setCurrentDate] = useState(startOfToday());

  return (
    <Provider store={store}>
      <div className="h-screen w-screen flex flex-col bg-gray-950 text-white">
        {/* <Header /> */}
        <CalendarLayout
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        >
          <CalendarMonth currentDate={currentDate} />
        </CalendarLayout>
      </div>
    </Provider>
  );
};

export default App;
