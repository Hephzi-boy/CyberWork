"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPotentialLeakAlerts } from "@/store/slices/analysisSlice";
import { setSelectedEmployee } from "@/store/slices/employeeSlice";
import { dismissLeakAlert } from "@/store/slices/uiSlice";

const summarizeVectors = (vectors: string[]) => {
  if (vectors.length === 0) {
    return "suspicious leak-related behavior";
  }

  if (vectors.length === 1) {
    return vectors[0];
  }

  return `${vectors[0]} and ${vectors[1]}`;
};

export function GlobalLeakToast() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectPotentialLeakAlerts);
  const dismissedLeakAlertIds = useAppSelector((state) => state.ui.dismissedLeakAlertIds);
  const [isVisible, setIsVisible] = useState(false);

  const activeAlert =
    alerts.find((alert) => !dismissedLeakAlertIds.includes(alert.id)) ?? null;

  useEffect(() => {
    if (!activeAlert) {
      setIsVisible(false);
      return;
    }

    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [activeAlert]);

  if (!activeAlert) {
    return null;
  }

  const vectorSummary = summarizeVectors(activeAlert.analysis.watchVectors);

  const handleDismiss = () => {
    setIsVisible(false);
    dispatch(dismissLeakAlert(activeAlert.id));
  };

  const handleReview = () => {
    dispatch(setSelectedEmployee(activeAlert.employee.id));
    dispatch(dismissLeakAlert(activeAlert.id));
    setIsVisible(false);
    router.push("/features#case-review");
  };

  return (
    <div
      aria-live="assertive"
      className={isVisible ? "global-toast global-toast--visible" : "global-toast"}
      role="alert"
    >
      <div className="global-toast__badge">
        <span className="material-symbols-outlined">warning</span>
      </div>
      <div className="global-toast__copy">
        <span className="global-toast__eyebrow">
          {activeAlert.source === "manual"
            ? "Manual Leak Flag"
            : "Automated Board Alert"}
        </span>
        <strong>
          {activeAlert.employee.name} is showing suspicious {vectorSummary}.
        </strong>
        <p>
          {activeAlert.detail} Current composite risk score:{" "}
          {activeAlert.analysis.finalRiskScore}/100.
        </p>
      </div>
      <div className="global-toast__actions">
        <button className="global-toast__button global-toast__button--solid" onClick={handleReview} type="button">
          Review Case
        </button>
        <button className="global-toast__button" onClick={handleDismiss} type="button">
          Dismiss
        </button>
      </div>
    </div>
  );
}
