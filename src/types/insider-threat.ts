export type RiskLevel = "low" | "medium" | "high";
export type DateRange = "24h" | "7d" | "30d";
export type SortOption = "riskScore" | "sentimentScore" | "name";
export type ComparisonMode = "individual" | "department";

export type Employee = {
  id: string;
  name: string;
  department: string;
  role: string;
  location: string;
  riskLevel: RiskLevel;
  clearance: "standard" | "elevated" | "privileged";
};

export type BehaviorSignal = {
  employeeId: string;
  anomalyScore: number;
  afterHoursAccessCount: number;
  policyViolationCount: number;
  usbTransferFlag: boolean;
  irregularAccessWindow: string;
  unusualDownloadVolumeGb: number;
  externalEmailCount: number;
  externalChatDisclosureCount: number;
  offPlatformCallMinutes: number;
  rivalContactCount: number;
  suspiciousAttachmentCount: number;
  transactionHistoryExportCount: number;
  walletTransferAttempts: number;
  walletTransferAmountUsd: number;
  unapprovedPayoutCount: number;
};

export type SentimentRecord = {
  employeeId: string;
  currentScore: number;
  baselineScore: number;
  trend: Array<{
    label: string;
    score: number;
  }>;
  negativeKeywordHits: number;
  latestSummary: string;
};

export type SuspiciousEvent = {
  id: string;
  employeeId: string;
  timestamp: string;
  title: string;
  detail: string;
  severity: "low" | "medium" | "high";
  type: "behavior" | "sentiment" | "access" | "policy" | "communication" | "finance" | "transfer";
};

export type ThreatIndicator = {
  label: string;
  value: string;
  severity: "low" | "medium" | "high";
};

export type ThreatAnalysisResult = {
  employeeId: string;
  sentimentScore: number;
  anomalyScore: number;
  policyViolationCount: number;
  afterHoursAccessCount: number;
  usbTransferFlag: boolean;
  unusualDownloadVolumeGb: number;
  externalEmailCount: number;
  externalChatDisclosureCount: number;
  offPlatformCallMinutes: number;
  rivalContactCount: number;
  suspiciousAttachmentCount: number;
  transactionHistoryExportCount: number;
  walletTransferAttempts: number;
  walletTransferAmountUsd: number;
  unapprovedPayoutCount: number;
  communicationRiskScore: number;
  financialRiskScore: number;
  finalRiskScore: number;
  riskLevel: RiskLevel;
  flaggedReasons: string[];
  watchVectors: string[];
  caseSynopsis: string;
  boardRecommendation: string;
  indicators: ThreatIndicator[];
  recommendations: string[];
};
