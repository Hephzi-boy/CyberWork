"use client";

import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/store/hooks";
import { setSelectedEmployee } from "@/store/slices/employeeSlice";
import {
  Employee,
  SentimentRecord,
  ThreatAnalysisResult,
} from "@/types/insider-threat";

type Props = {
  employee: Employee;
  analysis: ThreatAnalysisResult;
  sentiment: SentimentRecord | null;
};

const getThreatClassName = (riskLevel: ThreatAnalysisResult["riskLevel"]) => {
  if (riskLevel === "high") {
    return "threat-flag threat-flag--high";
  }

  if (riskLevel === "medium") {
    return "threat-flag threat-flag--medium";
  }

  return "threat-flag threat-flag--low";
};

export function EmployeeCard({ employee, analysis, sentiment }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(setSelectedEmployee(employee.id));
    router.push("/analysis");
  };

  const exfiltrationProbability = Math.min(
    0.98,
    analysis.finalRiskScore / 100 + analysis.anomalyScore / 250,
  );

  return (
    <button className="watch-card evidence-card" onClick={handleOpen} type="button">
      <div className="watch-card__head">
        <div>
          <h4>SUBJECT {employee.id.replace("emp-", "").toUpperCase()}</h4>
          <p>{employee.role.replace(/\s+/g, "_").toUpperCase()}</p>
        </div>
        <span className={getThreatClassName(analysis.riskLevel)}>
          {analysis.riskLevel === "high"
            ? "CRITICAL_ALERT"
            : analysis.riskLevel === "medium"
              ? "ELEVATED_RISK"
              : "BASELINE_NORMAL"}
        </span>
      </div>

      <div className="watch-card__metrics">
        <div className="watch-card__bar">
          <div style={{ width: `${analysis.finalRiskScore}%` }} />
        </div>
        <div className="watch-card__metric-line">
          <span>
            {analysis.sentimentScore < 45 ? "SENTIMENT_FRUSTRATION" : "SENTIMENT_BASELINE"}
          </span>
          <span>{analysis.finalRiskScore}%</span>
        </div>
        <div className="watch-card__detail-grid">
          <span>Sentiment {analysis.sentimentScore}/100</span>
          <span>Anomaly {analysis.anomalyScore}/100</span>
          <span>{sentiment?.negativeKeywordHits ?? 0} keyword hits</span>
        </div>
      </div>

      <div className="watch-card__foot">
        <span>Exfiltration Probability: {exfiltrationProbability.toFixed(2)}</span>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </div>
    </button>
  );
}
