import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ComparisonMode, DateRange, SortOption } from "@/types/insider-threat";

type UiState = {
  dateRange: DateRange;
  sortBy: SortOption;
  comparisonMode: ComparisonMode;
  dismissedLeakAlertIds: string[];
};

const initialState: UiState = {
  dateRange: "7d",
  sortBy: "riskScore",
  comparisonMode: "individual",
  dismissedLeakAlertIds: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDateRange(state, action: PayloadAction<DateRange>) {
      state.dateRange = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    },
    setComparisonMode(state, action: PayloadAction<ComparisonMode>) {
      state.comparisonMode = action.payload;
    },
    dismissLeakAlert(state, action: PayloadAction<string>) {
      if (!state.dismissedLeakAlertIds.includes(action.payload)) {
        state.dismissedLeakAlertIds.push(action.payload);
      }
    },
  },
});

export const {
  setDateRange,
  setSortBy,
  setComparisonMode,
  dismissLeakAlert,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
