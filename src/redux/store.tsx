import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import schoolReducer from '../redux/slices/schoolSlice';
import circuitReducer from '../redux/slices/circuitSlice';
import districtReducer from '../redux/slices/districtSlice';
import regionReducer from '../redux/slices/regionSlice';
import calendarReducer from '../redux/slices/calendarSlice';
import departmentReducer from '../redux/slices/departmentSlice';
import programReducer from '../redux/slices/programSlice';
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    school: schoolReducer,
    circuit: circuitReducer,
    district: districtReducer,
    region: regionReducer,
    calendar: calendarReducer,
    department: departmentReducer,
    program: programReducer,
  }
})