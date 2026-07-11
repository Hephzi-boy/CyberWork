"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPotentialLeakAlerts } from "@/store/slices/analysisSlice";
import { setSelectedEmployee } from "@/store/slices/employeeSlice";
import { dismissLeakAlert } from "@/store/slices/uiSlice";

export function GlobalLeakToast() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const alerts = useAppSelector(selectPotentialLeakAlerts);
  const dismissedLeakAlertIds = useAppSelector((state) => state.ui.dismissedLeakAlertIds);
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pendingAlerts = alerts.filter((alert) => !dismissedLeakAlertIds.includes(alert.id));
  const activeAlert = pendingAlerts[0] ?? null;
  const pendingAlertCount = pendingAlerts.length;

  useEffect(() => {
    void router.prefetch("/features");
  }, [router]);

  useEffect(() => {
    if (!activeAlert) {
      setIsVisible(false);
      setIsCollapsed(false);
      return;
    }

    setIsCollapsed(false);
    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [activeAlert?.id]);

  if (!activeAlert) {
    return null;
  }

  const handleDismiss = () => {
    setIsCollapsed(true);
    setIsVisible(true);
  };

  const handleReview = () => {
    dispatch(setSelectedEmployee(activeAlert.employee.id));
    dispatch(dismissLeakAlert(activeAlert.id));
    setIsCollapsed(false);
    setIsVisible(false);
    router.push("/features#case-review");
  };

  const handleExpand = () => {
    setIsCollapsed(false);
    setIsVisible(true);
  };

  if (isCollapsed) {
    return (
      <aside
        aria-live="polite"
        className={
          isVisible
            ? "global-toast global-toast--visible global-toast--collapsed"
            : "global-toast global-toast--collapsed"
        }
        role="status"
      >
        <button
          aria-label={`Open ${pendingAlertCount} flagged notification${pendingAlertCount === 1 ? "" : "s"}`}
          className="global-toast__collapsed-trigger"
          onClick={handleExpand}
          type="button"
        >
          <span className="global-toast__badge global-toast__badge--small">
            <span className="material-symbols-outlined">notifications_active</span>
          </span>
          <span className="global-toast__count">{pendingAlertCount}</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-live="polite"
      className={isVisible ? "global-toast global-toast--visible" : "global-toast"}
      role="status"
    >
      <div className="global-toast__surface">
        <div className="global-toast__badge global-toast__badge--small">
          <span className="material-symbols-outlined">notifications_active</span>
        </div>
        <div className="global-toast__copy">
          <strong>You have a new notification.</strong>
          <p>
            {pendingAlertCount} flagged worker{pendingAlertCount === 1 ? "" : "s"} waiting for
            review.
          </p>
        </div>
      </div>
      <div className="global-toast__meta">
        <div className="global-toast__actions">
          <button
            className="global-toast__button global-toast__button--solid"
            onClick={handleReview}
            type="button"
          >
            Open case
          </button>
          <button
            className="global-toast__button global-toast__button--quiet"
            onClick={handleDismiss}
            type="button"
          >
            Dismiss
          </button>
        </div>
      </div>
    </aside>
  );
}
