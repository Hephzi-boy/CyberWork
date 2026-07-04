"use client";

import { FormEvent, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectOverviewEmployees } from "@/store/slices/analysisSlice";
import { addManualLeakAlert } from "@/store/slices/uiSlice";

const reasonTemplates = [
  {
    label: "External File Share",
    value:
      "Potential attempt to send restricted files or findings outside the approved company domain.",
  },
  {
    label: "Unauthorized Export",
    value:
      "Potential attempt to export restricted company information to an unapproved destination.",
  },
  {
    label: "Unapproved Copy",
    value:
      "Potential attempt to copy sensitive material for use outside the approved internal workflow.",
  },
  {
    label: "Transaction History Leak",
    value:
      "Potential attempt to export transaction history or payment records for use outside the approved finance workflow.",
  },
  {
    label: "Wallet Transfer Concern",
    value:
      "Potential attempt to move company wallet funds or approve an unreviewed payout to an external destination.",
  },
];

const buildTimestamp = () => {
  const date = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "00";

  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
};

export function ManualFlagControl({
  title = "Raise a manual incident flag",
  description = "Create a possible information leak alert for a specific employee without changing the automatic detection flow.",
  className = "",
  mode = "panel",
  triggerLabel = "Flag Employee",
}: {
  title?: string;
  description?: string;
  className?: string;
  mode?: "panel" | "button";
  triggerLabel?: string;
}) {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectOverviewEmployees);
  const defaultEmployeeId = employees[0]?.employee.id ?? "";
  const [isOpen, setIsOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(defaultEmployeeId);
  const [reasonIndex, setReasonIndex] = useState(0);
  const [details, setDetails] = useState(reasonTemplates[0]?.value ?? "");

  const selectedEmployee = useMemo(
    () => employees.find((item) => item.employee.id === employeeId)?.employee ?? null,
    [employeeId, employees],
  );

  const openModal = () => {
    setEmployeeId(defaultEmployeeId);
    setReasonIndex(0);
    setDetails(reasonTemplates[0]?.value ?? "");
    setIsOpen(true);
  };

  const handleReasonChange = (nextIndex: number) => {
    setReasonIndex(nextIndex);
    setDetails(reasonTemplates[nextIndex]?.value ?? "");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!employeeId || !selectedEmployee) {
      return;
    }

    dispatch(
      addManualLeakAlert({
        id: `manual-${employeeId}-${Date.now()}`,
        employeeId,
        title: `${reasonTemplates[reasonIndex]?.label ?? "Manual Leak Flag"} reported`,
        detail: details.trim(),
        timestamp: buildTimestamp(),
        severity: "high",
        source: "manual",
      }),
    );

    setIsOpen(false);
  };

  return (
    <>
      {mode === "button" ? (
        <button className="flag-trigger" onClick={openModal} type="button">
          {triggerLabel}
        </button>
      ) : (
        <section className={className ? `flag-panel ${className}` : "flag-panel"}>
          <div className="flag-panel__copy">
            <span className="eyebrow eyebrow--dark">Manual Review Action</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <button className="flag-trigger" onClick={openModal} type="button">
            {triggerLabel}
          </button>
        </section>
      )}

      {isOpen ? (
        <div className="flag-modal-shell" role="dialog" aria-modal="true">
          <button
            aria-label="Close flag employee modal"
            className="flag-modal-shell__backdrop"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <div className="flag-modal">
            <div className="flag-modal__head">
              <div>
                <span className="eyebrow eyebrow--dark">Manual Incident Flag</span>
                <h2>Raise a possible information leak alert.</h2>
              </div>
              <button className="flag-modal__close" onClick={() => setIsOpen(false)} type="button">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form className="flag-form" onSubmit={handleSubmit}>
              <label>
                Employee
                <select value={employeeId} onChange={(event) => setEmployeeId(event.target.value)}>
                  {employees.map((item) => (
                    <option key={item.employee.id} value={item.employee.id}>
                      {item.employee.name} / {item.employee.department}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Alert Type
                <select
                  value={String(reasonIndex)}
                  onChange={(event) => handleReasonChange(Number(event.target.value))}
                >
                  {reasonTemplates.map((reason, index) => (
                    <option key={reason.label} value={String(index)}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flag-form__wide">
                Alert Details
                <textarea
                  rows={5}
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                />
              </label>

              <div className="flag-form__summary">
                <strong>{selectedEmployee?.name ?? "No employee selected"}</strong>
                <span>
                  This creates a manual high-priority leak alert and sends it into the same
                  top toast flow used by automatic detections.
                </span>
              </div>

              <div className="flag-form__actions">
                <button className="button button--ghost-dark" onClick={() => setIsOpen(false)} type="button">
                  Cancel
                </button>
                <button className="button button--dark" type="submit">
                  Flag Now
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
