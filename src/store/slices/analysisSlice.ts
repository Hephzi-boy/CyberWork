import { createSelector, createSlice } from "@reduxjs/toolkit";

import { mockBehaviorSignals, mockSentimentRecords, mockSuspiciousEvents } from "@/data/mockSignals";
import { RootState } from "@/store";
import {
  BehaviorSignal,
  ManualLeakAlert,
  RiskLevel,
  SentimentRecord,
  ThreatAnalysisResult,
  ThreatIndicator,
} from "@/types/insider-threat";
import {
  selectEmployees,
  selectEmployeesState,
  selectSelectedEmployeeId,
} from "@/store/slices/employeeSlice";

type AnalysisState = {
  activeScoreModel: "default";
  behaviorSignals: BehaviorSignal[];
  sentimentRecords: SentimentRecord[];
  eventFeed: typeof mockSuspiciousEvents;
  resultsByEmployeeId: Record<string, ThreatAnalysisResult>;
};

const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const joinList = (items: string[]) => {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
};

const getRiskLevel = (score: number): RiskLevel => {
  if (score >= 75) {
    return "high";
  }
  if (score >= 45) {
    return "medium";
  }
  return "low";
};

const buildAnalysisResult = (
  signal: BehaviorSignal,
  sentiment: SentimentRecord | undefined,
): ThreatAnalysisResult => {
  const sentimentRisk = 100 - (sentiment?.currentScore ?? 50);
  const anomalyRisk = signal.anomalyScore;
  const afterHoursRisk = Math.min(signal.afterHoursAccessCount * 12, 100);
  const policyRisk = Math.min(signal.policyViolationCount * 20, 100);
  const usbRisk = signal.usbTransferFlag ? 12 : 0;
  const downloadRisk = Math.min(signal.unusualDownloadVolumeGb * 2.5, 20);
  const emailRisk = Math.min(
    signal.externalEmailCount * 14 +
      signal.suspiciousAttachmentCount * 10 +
      signal.rivalContactCount * 9,
    100,
  );
  const chatRisk = Math.min(signal.externalChatDisclosureCount * 16, 100);
  const callRisk = Math.min(
    signal.offPlatformCallMinutes * 1.2 + signal.rivalContactCount * 8,
    100,
  );
  const communicationRiskScore = clampScore(emailRisk * 0.45 + chatRisk * 0.25 + callRisk * 0.3);
  const financialRiskScore = clampScore(
    signal.transactionHistoryExportCount * 17 +
      signal.walletTransferAttempts * 24 +
      signal.unapprovedPayoutCount * 20 +
      signal.walletTransferAmountUsd / 1800,
  );

  const finalRiskScore = clampScore(
    sentimentRisk * 0.16 +
      anomalyRisk * 0.2 +
      afterHoursRisk * 0.08 +
      policyRisk * 0.11 +
      communicationRiskScore * 0.2 +
      financialRiskScore * 0.22 +
      usbRisk +
      downloadRisk,
  );

  const flaggedReasons = [
    sentimentRisk >= 50
      ? "Communication sentiment fell materially below baseline."
      : null,
    anomalyRisk >= 65 ? "Behavioral anomaly score exceeded the alert threshold." : null,
    signal.afterHoursAccessCount >= 4
      ? "Repeated after-hours system access was detected."
      : null,
    signal.policyViolationCount >= 2
      ? "Multiple policy violations occurred during the review window."
      : null,
    signal.usbTransferFlag ? "Removable media activity was flagged." : null,
    signal.externalEmailCount >= 2 || signal.suspiciousAttachmentCount >= 1
      ? "Outbound email activity included suspicious recipients or restricted attachments."
      : null,
    signal.externalChatDisclosureCount >= 2
      ? "Chat surveillance detected attempts to discuss sensitive material outside approved workflow."
      : null,
    signal.offPlatformCallMinutes >= 20
      ? "Call monitoring detected sustained off-platform contact around restricted work topics."
      : null,
    signal.transactionHistoryExportCount >= 2
      ? "Transaction history exports exceeded the approved finance review pattern."
      : null,
    signal.walletTransferAttempts >= 1 || signal.unapprovedPayoutCount >= 1
      ? "Financial monitoring detected suspicious wallet transfer or payout activity."
      : null,
  ].filter((reason): reason is string => Boolean(reason));

  const watchVectors = [
    signal.externalEmailCount >= 2 || signal.suspiciousAttachmentCount >= 1
      ? "external email activity"
      : null,
    signal.externalChatDisclosureCount >= 2 ? "chat disclosure attempts" : null,
    signal.offPlatformCallMinutes >= 20 ? "off-platform call activity" : null,
    signal.transactionHistoryExportCount >= 2 ? "transaction history exports" : null,
    signal.walletTransferAttempts >= 1 || signal.unapprovedPayoutCount >= 1
      ? "wallet or payout movement"
      : null,
    signal.usbTransferFlag || signal.unusualDownloadVolumeGb >= 8
      ? "bulk data transfer behavior"
      : null,
  ].filter((item): item is string => Boolean(item));

  const caseSynopsis =
    watchVectors.length > 0
      ? `The worker shows coordinated risk across ${joinList(watchVectors)}.`
      : "The worker remains in watch status due to unusual operational behavior.";

  const boardRecommendation =
    signal.walletTransferAttempts >= 1 || signal.unapprovedPayoutCount >= 1
      ? "Freeze high-value transfer authority, review approvals, and open an urgent board-led investigation."
      : signal.externalEmailCount >= 2 || signal.externalChatDisclosureCount >= 2
        ? "Escalate the case to security leadership, preserve communications evidence, and inspect outbound sharing paths."
        : "Maintain elevated monitoring, preserve evidence, and require management review before any new privileged action.";

  const indicators: ThreatIndicator[] = [
    {
      label: "Sentiment drift",
      value: `${sentiment?.currentScore ?? 50}/100`,
      severity: sentimentRisk >= 50 ? "high" : sentimentRisk >= 30 ? "medium" : "low",
    },
    {
      label: "Anomaly index",
      value: `${signal.anomalyScore}/100`,
      severity: anomalyRisk >= 70 ? "high" : anomalyRisk >= 45 ? "medium" : "low",
    },
    {
      label: "After-hours access",
      value: `${signal.afterHoursAccessCount} sessions`,
      severity:
        signal.afterHoursAccessCount >= 5
          ? "high"
          : signal.afterHoursAccessCount >= 2
            ? "medium"
            : "low",
    },
    {
      label: "Policy violations",
      value: `${signal.policyViolationCount}`,
      severity:
        signal.policyViolationCount >= 3
          ? "high"
          : signal.policyViolationCount >= 1
            ? "medium"
            : "low",
    },
    {
      label: "External email risk",
      value: `${signal.externalEmailCount} attempts`,
      severity: emailRisk >= 70 ? "high" : emailRisk >= 35 ? "medium" : "low",
    },
    {
      label: "Call monitoring",
      value: `${signal.offPlatformCallMinutes} minutes`,
      severity: callRisk >= 70 ? "high" : callRisk >= 35 ? "medium" : "low",
    },
    {
      label: "Finance exposure",
      value: `${signal.walletTransferAttempts} transfer attempts`,
      severity:
        financialRiskScore >= 70 ? "high" : financialRiskScore >= 35 ? "medium" : "low",
    },
  ];

  const recommendations = [
    "Require manager and security review before granting new privileged access.",
    "Increase activity monitoring on email, chat, call, and file transfer channels.",
    "Schedule a targeted insider-risk interview with HR and security operations.",
  ];

  if (signal.walletTransferAttempts >= 1 || signal.unapprovedPayoutCount >= 1) {
    recommendations[0] =
      "Temporarily suspend transaction approval authority and reconcile every recent wallet movement.";
    recommendations[2] =
      "Notify finance leadership and board oversight to inspect destination accounts and export history.";
  } else if (!signal.usbTransferFlag) {
    recommendations[1] =
      "Monitor high-value document access, external communications, and unusual off-hours workflow changes.";
  }

  return {
    employeeId: signal.employeeId,
    sentimentScore: sentiment?.currentScore ?? 50,
    anomalyScore: signal.anomalyScore,
    policyViolationCount: signal.policyViolationCount,
    afterHoursAccessCount: signal.afterHoursAccessCount,
    usbTransferFlag: signal.usbTransferFlag,
    unusualDownloadVolumeGb: signal.unusualDownloadVolumeGb,
    externalEmailCount: signal.externalEmailCount,
    externalChatDisclosureCount: signal.externalChatDisclosureCount,
    offPlatformCallMinutes: signal.offPlatformCallMinutes,
    rivalContactCount: signal.rivalContactCount,
    suspiciousAttachmentCount: signal.suspiciousAttachmentCount,
    transactionHistoryExportCount: signal.transactionHistoryExportCount,
    walletTransferAttempts: signal.walletTransferAttempts,
    walletTransferAmountUsd: signal.walletTransferAmountUsd,
    unapprovedPayoutCount: signal.unapprovedPayoutCount,
    communicationRiskScore,
    financialRiskScore,
    finalRiskScore,
    riskLevel: getRiskLevel(finalRiskScore),
    flaggedReasons,
    watchVectors,
    caseSynopsis,
    boardRecommendation,
    indicators,
    recommendations,
  };
};

const resultsByEmployeeId = Object.fromEntries(
  mockBehaviorSignals.map((signal) => [
    signal.employeeId,
    buildAnalysisResult(
      signal,
      mockSentimentRecords.find((record) => record.employeeId === signal.employeeId),
    ),
  ]),
);

const initialState: AnalysisState = {
  activeScoreModel: "default",
  behaviorSignals: mockBehaviorSignals,
  sentimentRecords: mockSentimentRecords,
  eventFeed: mockSuspiciousEvents,
  resultsByEmployeeId,
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {},
});

export const analysisReducer = analysisSlice.reducer;

export const selectAnalysisState = (state: RootState) => state.analysis;
export const selectResultsByEmployeeId = (state: RootState) =>
  state.analysis.resultsByEmployeeId;
export const selectBehaviorSignals = (state: RootState) => state.analysis.behaviorSignals;
export const selectSentimentRecords = (state: RootState) =>
  state.analysis.sentimentRecords;
export const selectEventFeed = (state: RootState) => state.analysis.eventFeed;

export const selectSelectedAnalysis = createSelector(
  [selectResultsByEmployeeId, selectSelectedEmployeeId],
  (resultsByEmployeeId, selectedEmployeeId) =>
    selectedEmployeeId ? resultsByEmployeeId[selectedEmployeeId] ?? null : null,
);

export const selectEmployeeTimeline = createSelector(
  [selectEventFeed, selectSelectedEmployeeId],
  (eventFeed, selectedEmployeeId) =>
    eventFeed
      .filter((event) => event.employeeId === selectedEmployeeId)
      .sort((left, right) => right.timestamp.localeCompare(left.timestamp)),
);

export const selectOverviewEmployees = createSelector(
  [selectEmployees, selectResultsByEmployeeId, selectSentimentRecords, selectEmployeesState, (state: RootState) => state.ui.sortBy],
  (employees, resultsByEmployeeId, sentimentRecords, employeesState, sortBy) => {
    const decorated = employees
      .filter((employee) => {
        const departmentMatch =
          employeesState.departmentFilter === "all" ||
          employee.department === employeesState.departmentFilter;
        const riskMatch =
          employeesState.riskFilter === "all" ||
          resultsByEmployeeId[employee.id]?.riskLevel === employeesState.riskFilter;
        return departmentMatch && riskMatch;
      })
      .map((employee) => ({
        employee,
        analysis: resultsByEmployeeId[employee.id],
        sentiment:
          sentimentRecords.find((record) => record.employeeId === employee.id) ?? null,
      }));

    decorated.sort((left, right) => {
      if (sortBy === "name") {
        return left.employee.name.localeCompare(right.employee.name);
      }
      if (sortBy === "sentimentScore") {
        return (left.analysis?.sentimentScore ?? 0) - (right.analysis?.sentimentScore ?? 0);
      }
      return (right.analysis?.finalRiskScore ?? 0) - (left.analysis?.finalRiskScore ?? 0);
    });

    return decorated;
  },
);

export const selectDashboardMetrics = createSelector(
  [selectEmployees, selectResultsByEmployeeId, selectSentimentRecords, selectBehaviorSignals],
  (employees, resultsByEmployeeId, sentimentRecords, behaviorSignals) => {
    const analyses = Object.values(resultsByEmployeeId);
    const highRiskEmployees = analyses.filter(
      (analysis) => analysis.riskLevel === "high",
    ).length;
    const negativeSentimentAlerts = sentimentRecords.filter(
      (record) => record.currentScore < 45,
    ).length;
    const unusualActivityAlerts = behaviorSignals.filter(
      (signal) =>
        signal.anomalyScore > 65 ||
        signal.afterHoursAccessCount >= 4 ||
        signal.externalEmailCount >= 2 ||
        signal.externalChatDisclosureCount >= 2 ||
        signal.transactionHistoryExportCount >= 2 ||
        signal.walletTransferAttempts >= 1,
    ).length;
    const averageRiskScore = clampScore(
      analyses.reduce((sum, analysis) => sum + analysis.finalRiskScore, 0) /
        analyses.length,
    );

    return {
      totalEmployees: employees.length,
      highRiskEmployees,
      negativeSentimentAlerts,
      unusualActivityAlerts,
      averageRiskScore,
    };
  },
);

export const selectDepartmentPressure = createSelector(
  [selectEmployees, selectResultsByEmployeeId],
  (employees, resultsByEmployeeId) =>
    Array.from(new Set(employees.map((employee) => employee.department))).map(
      (department) => {
        const departmentEmployees = employees.filter(
          (employee) => employee.department === department,
        );
        const avgRisk = clampScore(
          departmentEmployees.reduce(
            (sum, employee) => sum + (resultsByEmployeeId[employee.id]?.finalRiskScore ?? 0),
            0,
          ) / departmentEmployees.length,
        );
        return {
          department,
          avgRisk,
        };
      },
    ),
);

export const selectPotentialLeakAlerts = createSelector(
  [
    selectEventFeed,
    selectEmployees,
    selectResultsByEmployeeId,
    selectBehaviorSignals,
    (state: RootState) => state.ui.manualLeakAlerts,
  ],
  (eventFeed, employees, resultsByEmployeeId, behaviorSignals, manualLeakAlerts) => {
    const automaticAlerts = behaviorSignals
      .map((signal) => {
        const employee = employees.find((item) => item.id === signal.employeeId) ?? null;
        const analysis = resultsByEmployeeId[signal.employeeId] ?? null;
        const latestEvent = [...eventFeed]
          .filter((event) => event.employeeId === signal.employeeId)
          .sort((left, right) => right.timestamp.localeCompare(left.timestamp))[0] ?? null;

        if (!employee || !analysis) {
          return null;
        }

        const isLeakCandidate =
          analysis.finalRiskScore >= 55 &&
          (analysis.watchVectors.length > 0 ||
            signal.transactionHistoryExportCount >= 1 ||
            signal.walletTransferAttempts >= 1);

        if (!isLeakCandidate) {
          return null;
        }

        const focusArea =
          analysis.walletTransferAttempts >= 1 || analysis.unapprovedPayoutCount >= 1
            ? "potential fund or transaction leak"
            : "potential sensitive data leak";

        return {
          id: `auto-${signal.employeeId}`,
          employeeId: signal.employeeId,
          timestamp: latestEvent?.timestamp ?? "Live monitoring",
          title: `Automated ${focusArea} alert`,
          detail: `${analysis.caseSynopsis} ${analysis.boardRecommendation}`,
          severity:
            analysis.riskLevel === "high" || analysis.walletTransferAttempts >= 1
              ? ("high" as const)
              : ("medium" as const),
          type:
            analysis.walletTransferAttempts >= 1 || analysis.unapprovedPayoutCount >= 1
              ? ("finance" as const)
              : analysis.externalEmailCount >= 2 ||
                  analysis.externalChatDisclosureCount >= 2 ||
                  analysis.offPlatformCallMinutes >= 20
                ? ("communication" as const)
                : ("transfer" as const),
          employee,
          analysis,
          source: "automatic" as const,
        };
      })
      .filter(
        (
          item,
        ): item is NonNullable<typeof item> => Boolean(item),
      );

    const manualAlertsDecorated = manualLeakAlerts
      .map((alert: ManualLeakAlert) => {
        const employee = employees.find((item) => item.id === alert.employeeId) ?? null;
        const analysis = resultsByEmployeeId[alert.employeeId] ?? null;

        return {
          ...alert,
          employee,
          analysis,
        };
      })
      .filter(
        (
          item,
        ): item is typeof item & {
          employee: NonNullable<typeof item.employee>;
          analysis: NonNullable<typeof item.analysis>;
        } => Boolean(item.employee && item.analysis),
      );

    return [...manualAlertsDecorated, ...automaticAlerts].sort((left, right) => {
      if (left.source !== right.source) {
        return left.source === "manual" ? -1 : 1;
      }

      if (right.analysis.finalRiskScore !== left.analysis.finalRiskScore) {
        return right.analysis.finalRiskScore - left.analysis.finalRiskScore;
      }

      return right.timestamp.localeCompare(left.timestamp);
    });
  },
);
