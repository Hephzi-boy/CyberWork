import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

import { mockEmployees } from "@/data/mockEmployees";
import { RootState } from "@/store";
import { Employee, RiskLevel } from "@/types/insider-threat";

type EmployeeState = {
  items: Employee[];
  selectedEmployeeId: string | null;
  departmentFilter: string;
  riskFilter: RiskLevel | "all";
};

const initialState: EmployeeState = {
  items: mockEmployees,
  selectedEmployeeId: mockEmployees[0]?.id ?? null,
  departmentFilter: "all",
  riskFilter: "all",
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSelectedEmployee(state, action: PayloadAction<string>) {
      state.selectedEmployeeId = action.payload;
    },
    setDepartmentFilter(state, action: PayloadAction<string>) {
      state.departmentFilter = action.payload;
    },
    setRiskFilter(state, action: PayloadAction<RiskLevel | "all">) {
      state.riskFilter = action.payload;
    },
  },
});

export const { setSelectedEmployee, setDepartmentFilter, setRiskFilter } =
  employeeSlice.actions;

export const employeeReducer = employeeSlice.reducer;

export const selectEmployeesState = (state: RootState) => state.employees;
export const selectEmployees = (state: RootState) => state.employees.items;
export const selectSelectedEmployeeId = (state: RootState) =>
  state.employees.selectedEmployeeId;
export const selectSelectedEmployee = createSelector(
  [selectEmployees, selectSelectedEmployeeId],
  (employees, selectedEmployeeId) =>
    employees.find((employee) => employee.id === selectedEmployeeId) ?? null,
);

export const selectDepartments = createSelector([selectEmployees], (employees) =>
  Array.from(new Set(employees.map((employee) => employee.department))),
);
