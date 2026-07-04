import { configureStore } from "@reduxjs/toolkit";

import { analysisReducer } from "@/store/slices/analysisSlice";
import { employeeReducer } from "@/store/slices/employeeSlice";
import { uiReducer } from "@/store/slices/uiSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    analysis: analysisReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
