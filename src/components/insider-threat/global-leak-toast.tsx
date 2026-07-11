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

  const pendingAlerts = alerts.filter((alert) => !dismissedLeakAlertIds.includes(alert.id));
  const activeAlert = pendingAlerts[0] ?? null;
  const queuedAlertCount = Math.max(pendingAlerts.length - 1, 0);

  useEffect(() => {
    void router.prefetch("/features");
  }, [router]);

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
  }, [activeAlert?.id]);

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
    <aside
      aria-live="polite"
      className={isVisible ? "global-toast global-toast--visible" : "global-toast"}
      role="status"
    >
      <div className="global-toast__surface">
        <div className="global-toast__badge">
          <span className="material-symbols-outlined">notifications_active</span>
        </div>
        <div className="global-toast__copy">
          <span className="global-toast__eyebrow">Automated Board Alert</span>
          <strong>You have a new notification.</strong>
          <p>
            {activeAlert.employee.name} was flagged for suspicious {vectorSummary}. Open the
            case in Solutions to review the incident safely.
          </p>
        </div>
        <button
          className="global-toast__button global-toast__button--solid global-toast__button--wide"
          onClick={handleReview}
          type="button"
        >
          Open flagged case
        </button>
      </div>
      <div className="global-toast__meta">
        <span className="global-toast__queue">
          {queuedAlertCount > 0
            ? `${queuedAlertCount} more automated alert${
                queuedAlertCount === 1 ? "" : "s"
              } queued after this review.`
            : "The flagged case opens directly in the Solutions review panel."}
        </span>
        <button
          className="global-toast__button global-toast__button--quiet"
          onClick={handleDismiss}
          type="button"
        >
          Dismiss
        </button>
      </div>
    </aside>
  );
}
