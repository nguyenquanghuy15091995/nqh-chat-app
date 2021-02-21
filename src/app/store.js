import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import roomReducer from 'features/chat/roomSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
  },
});
