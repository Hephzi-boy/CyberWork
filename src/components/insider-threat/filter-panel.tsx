"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectDepartments } from "@/store/slices/employeeSlice";
import {
  setDepartmentFilter,
  setRiskFilter,
} from "@/store/slices/employeeSlice";
import { setDateRange, setSortBy } from "@/store/slices/uiSlice";
import { DateRange, RiskLevel, SortOption } from "@/types/insider-threat";

export function FilterPanel() {
  const dispatch = useAppDispatch();
  const departments = useAppSelector(selectDepartments);
  const { departmentFilter, riskFilter } = useAppSelector((state) => state.employees);
  const { dateRange, sortBy } = useAppSelector((state) => state.ui);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Filter Controls</p>
          <h2>Live monitoring scope</h2>
        </div>
      </div>
      <div className="filter-grid">
        <label>
          <span>Department</span>
          <select
            value={departmentFilter}
            onChange={(event) => dispatch(setDepartmentFilter(event.target.value))}
          >
            <option value="all">All departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Risk level</span>
          <select
            value={riskFilter}
            onChange={(event) =>
              dispatch(setRiskFilter(event.target.value as RiskLevel | "all"))
            }
          >
            <option value="all">All levels</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>
          <span>Date window</span>
          <select
            value={dateRange}
            onChange={(event) =>
              dispatch(setDateRange(event.target.value as DateRange))
            }
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </label>
        <label>
          <span>Sort by</span>
          <select
            value={sortBy}
            onChange={(event) =>
              dispatch(setSortBy(event.target.value as SortOption))
            }
          >
            <option value="riskScore">Risk score</option>
            <option value="sentimentScore">Sentiment score</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>
    </section>
  );
}
