import { createSlice } from '@reduxjs/toolkit';
import { mockEvents } from '../data/mockEvents';

const eventsSlice = createSlice({
  name: 'events',
  initialState: mockEvents,
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload);
    },
    deleteEvent: (state, action) => {
      return state.filter(event => event.id !== action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    }
  }
});

export const { addEvent, deleteEvent, updateEvent } = eventsSlice.actions;
export default eventsSlice.reducer;