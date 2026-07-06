# Nexora Technologies System Documentation

## 3.2 Data Sources

The Nexora Technologies application uses simulated insider-risk data stored inside the project source code. The data represents workers, departments, communication behavior, access patterns, transaction behavior, sentiment records, and suspicious event alerts.

The main data sources are:

- Employee profile data: worker ID, name, department, role, location, clearance level, and initial risk category.
- Behavioral signal data: anomaly score, after-hours access count, policy violation count, USB transfer flag, unusual download volume, and irregular access window.
- Communication monitoring data: external email count, suspicious attachments, external chat disclosure attempts, off-platform call minutes, and rival contact count.
- Financial monitoring data: transaction history export count, wallet transfer attempts, wallet transfer amount, and unapproved payout count.
- Sentiment data: current sentiment score, baseline score, negative keyword hits, trend history, and latest communication summary.
- Suspicious event feed: timestamped operational events with title, detail, severity, and event type.
- Manual incident flags: user-generated leak alerts created from the manual flag control.

In the current implementation, these sources are represented by mock datasets in `src/data/mockEmployees.ts` and `src/data/mockSignals.ts`.

## 3.3 Data Collection Methods

The current application uses preloaded mock data rather than live backend ingestion. In a production deployment, the same structure would support automated collection from enterprise systems.

The expected collection methods are:

- System log collection from access control systems and endpoint activity records.
- Communication metadata collection from email, chat, and call monitoring platforms.
- File and transfer monitoring from document repositories, export logs, USB activity, and bulk download records.
- Finance and transaction monitoring from approval systems, wallet transfer logs, payout systems, and transaction export activity.
- Sentiment signal extraction from approved internal communication channels.
- Manual incident reporting through the application's manual flag module.

The current manual collection method is implemented through the `ManualFlagControl` component, which allows an operator to flag a worker and trigger a high-priority alert in the application.

## 3.4 Data Characteristics (5Vs)

### Volume

The prototype uses a small mock dataset of employees and signals. A real deployment would handle a much larger volume of logs, communication records, transaction records, and user activity events across many departments.

### Velocity

The current data is static at runtime except for manual flags created by the user. In production, the system would require near real-time ingestion of access events, communication changes, financial activity, and suspicious behavior alerts.

### Variety

The application combines several types of data: structured employee records, numerical behavior signals, sentiment scores, communication indicators, finance indicators, event feed records, and manually created alerts.

### Veracity

Because insider-risk analysis can produce false positives, the system includes explainable flagged reasons, watch vectors, and board recommendations. This helps users understand why a risk score was generated instead of relying only on a final score.

### Value

The main value of the data is early detection. By combining behavior, communication, finance, and sentiment signals, the application helps security and leadership teams identify possible data leakage, fund misuse, or policy violations before the incident becomes severe.

## 3.5 Existing System Analysis

The existing system for insider-risk monitoring is typically manual, fragmented, and reactive. Security teams may review access logs separately from communication systems, finance teams may review transfers separately from HR or compliance teams, and leadership may only receive information after an incident has already escalated.

In such an existing system:

- Employee behavior records are not centrally analyzed.
- Suspicious emails, chats, calls, and file activity are reviewed separately.
- Financial anomalies may not be connected to communication or access anomalies.
- Manual reports are not integrated into a single risk model.
- Board-level recommendations are delayed because evidence is scattered across different systems.

## 3.6 Problems of Existing System

The major problems of the existing system include:

- Delayed detection of insider threats.
- Lack of unified employee risk scoring.
- Difficulty correlating communication, access, and finance behavior.
- Manual review processes that are slow and inconsistent.
- Limited visibility into why a worker is considered high risk.
- Poor prioritization of cases for leadership or board review.
- Weak connection between automated alerts and human/manual escalation.
- High chance of missing early warning signals because evidence is distributed across multiple tools.

## 3.7 Proposed System

The proposed system is Nexora Technologies, a corporate intelligence and insider-risk monitoring application. It provides a centralized interface for reviewing worker behavior, communication risk, financial risk, sentiment drift, and suspicious events.

The system provides:

- Employee monitoring dashboard.
- Composite risk scoring.
- Communication risk analysis.
- Financial and wallet transfer risk analysis.
- Sentiment trend analysis.
- Manual employee flagging.
- Global leak toast alerts.
- Case review dashboard.
- Board recommendation output.
- Department-level pressure metrics.
- Responsive corporate website interface for home, solutions, about, contact, analysis, and results pages.

The application is implemented as a Next.js and React frontend with Redux Toolkit state management.

## 3.8 System Architecture

The system follows a client-side application architecture.

Main architecture layers:

- Presentation layer: Next.js pages and React components render the user interface.
- State management layer: Redux Toolkit stores employee data, analysis results, selected worker state, UI filters, and manual alerts.
- Data layer: mock employee and signal data are imported from local TypeScript files.
- Analysis layer: selector functions and scoring logic calculate risk scores, flagged reasons, dashboard metrics, department pressure, and leak alerts.
- Interaction layer: components such as manual flag controls, navigation, alert toast, and case review panels allow users to interact with the system.

Important implementation files:

- `src/app/page.tsx`: home page.
- `src/app/features/page.tsx`: solutions and case review page.
- `src/app/about/page.tsx`: company and people/project page.
- `src/app/contact/page.tsx`: contact and office page.
- `src/store/slices/analysisSlice.ts`: risk scoring and analytical selectors.
- `src/store/slices/employeeSlice.ts`: employee selection and filters.
- `src/components/insider-threat/manual-flag-control.tsx`: manual flag module.
- `src/components/insider-threat/global-leak-toast.tsx`: global alert display.

## 3.9 Data Flow Diagram

Text-based data flow:

```text
Employee Records
Behavior Signals
Sentiment Records
Suspicious Events
Manual Flags
        |
        v
Redux Store and Analysis Selectors
        |
        v
Risk Scoring and Case Generation
        |
        v
Dashboard Metrics, Alerts, Recommendations
        |
        v
User Interface Pages
        |
        v
User Reviews Case / Flags Worker / Navigates Reports
```

Detailed flow:

```text
Mock Data Files -> Redux Initial State -> Analysis Slice
Analysis Slice -> Risk Scores, Watch Vectors, Recommendations
Employee Slice -> Selected Worker and Filters
UI Components -> Display Metrics, Cards, Alerts, Case Review
Manual Flag Control -> Manual Alert -> Global Toast and Case Review
```

## 3.10 Database Design

The current prototype does not use a physical database. It uses TypeScript objects as mock data. However, the data model can be converted directly into relational database tables or document collections.

Suggested database tables:

### Employees

| Field | Type | Description |
| --- | --- | --- |
| id | string | Unique employee ID |
| name | string | Employee full name |
| department | string | Employee department |
| role | string | Job role |
| location | string | Work location |
| risk_level | string | Low, medium, or high |
| clearance | string | Standard, elevated, or privileged |

### BehaviorSignals

| Field | Type | Description |
| --- | --- | --- |
| employee_id | string | Linked employee |
| anomaly_score | number | Behavioral anomaly score |
| after_hours_access_count | number | Number of after-hours sessions |
| policy_violation_count | number | Policy violations |
| usb_transfer_flag | boolean | USB transfer detection |
| unusual_download_volume_gb | number | Download size |
| external_email_count | number | External email attempts |
| external_chat_disclosure_count | number | Chat disclosure attempts |
| off_platform_call_minutes | number | Suspicious call duration |
| transaction_history_export_count | number | Finance export count |
| wallet_transfer_attempts | number | Wallet transfer count |
| wallet_transfer_amount_usd | number | Transfer value |
| unapproved_payout_count | number | Unapproved payout count |

### SentimentRecords

| Field | Type | Description |
| --- | --- | --- |
| employee_id | string | Linked employee |
| current_score | number | Current sentiment score |
| baseline_score | number | Normal sentiment baseline |
| negative_keyword_hits | number | Negative keyword count |
| latest_summary | text | Summary of communication behavior |

### SuspiciousEvents

| Field | Type | Description |
| --- | --- | --- |
| id | string | Event ID |
| employee_id | string | Linked employee |
| timestamp | string | Event time |
| title | string | Event title |
| detail | text | Event description |
| severity | string | Low, medium, or high |
| type | string | Behavior, sentiment, access, policy, communication, finance, or transfer |

### ManualLeakAlerts

| Field | Type | Description |
| --- | --- | --- |
| id | string | Alert ID |
| employee_id | string | Flagged employee |
| title | string | Alert title |
| detail | text | Alert details |
| timestamp | string | Time of flag |
| severity | string | High |
| source | string | Manual |

## 3.11 Data Preprocessing

The current system preprocesses data inside the analysis slice before displaying it.

Preprocessing activities include:

- Matching behavior signals to employee records using `employeeId`.
- Matching sentiment records to employee records.
- Converting raw numeric counts into bounded risk scores.
- Clamping calculated values between 0 and 100.
- Generating communication risk from email, chat, call, attachment, and rival contact indicators.
- Generating financial risk from transaction exports, wallet transfer attempts, payout count, and transfer amount.
- Creating flagged reasons from threshold checks.
- Creating watch vectors from risky behavior categories.
- Sorting employees by risk score, sentiment score, or name.
- Aggregating department-level risk averages.

## 3.12 Analytical Techniques

The system uses rule-based and weighted scoring techniques.

Key analytical methods:

- Weighted composite scoring: final risk score combines sentiment risk, anomaly risk, after-hours access, policy violations, communication risk, financial risk, USB transfer behavior, and unusual download volume.
- Threshold classification: scores are classified as low, medium, or high risk.
- Communication risk scoring: external email, suspicious attachments, rival contacts, chat disclosures, and off-platform call minutes are combined into a communication score.
- Financial risk scoring: transaction exports, wallet transfer attempts, unapproved payouts, and transfer value are converted into a financial exposure score.
- Sentiment drift analysis: current sentiment is compared against expected healthy communication behavior.
- Department aggregation: employee scores are grouped by department to identify operational pressure areas.
- Explainable alerts: flagged reasons and watch vectors explain why an employee is under review.

Risk levels:

```text
0-44: Low risk
45-74: Medium risk
75-100: High risk
```

## 3.13 Hardware Requirements

Minimum development hardware:

- Processor: Dual-core CPU or higher.
- Memory: 4 GB RAM minimum, 8 GB recommended.
- Storage: 1 GB free space for source code and dependencies.
- Display: 1366x768 or higher.
- Network: Required for dependency installation and production deployment.

Recommended production/client hardware:

- Processor: Modern quad-core CPU.
- Memory: 8 GB RAM or higher.
- Stable internet connection.
- Modern browser-capable workstation or laptop.

## 3.14 Software Requirements

Development software:

- Node.js compatible with Next.js 16.
- npm package manager.
- Next.js 16.
- React 19.
- React DOM 19.
- Redux Toolkit.
- React Redux.
- TypeScript.
- Modern browser such as Chrome, Edge, Firefox, or Safari.

Runtime software:

- Web browser for client access.
- Node.js server environment for Next.js deployment.
- Optional production hosting platform such as Vercel, Netlify, or a Node-compatible server.

## 4.2 System Design

The system is designed as a responsive web application with multiple pages and shared state. The user can move between the home page, solutions page, about page, contact page, analysis route, and results route.

Main modules:

- App frame: shared header, navigation, footer, and global alert area.
- Home module: overview, metrics, intelligence cards, impact panel, and latest events.
- Features module: selected worker case review, monitoring coverage, analytics, and system specifications.
- About module: mission, people roster, projects, and timeline.
- Contact module: inquiry form, office information, and priority case summary.
- Manual flag module: allows users to manually flag an employee.
- Global toast module: displays urgent leak alerts.
- Scroll reveal module: applies section reveal animations as users scroll.

## 4.3 User Interface Design

The user interface uses a corporate technology visual style branded as Nexora Technologies. The interface uses dark surfaces, blue/purple logo accents, cards, dashboards, hero sections, and responsive layouts.

Important UI characteristics:

- Fixed top header with Nexora logo and navigation.
- Mobile top navigation for smaller screens.
- Hero sections with visual backgrounds.
- Dashboard metric ribbons.
- Card-based case review and monitoring sections.
- Manual flag modal and alert toast.
- Scroll reveal effects for major sections.
- Responsive design for desktop and mobile.
- Brand-aligned Nexora logo mark rendered inline in the application frame.

## 4.4 Database Implementation

The current implementation uses local TypeScript mock data instead of a live database. This was done to make the prototype run immediately without backend setup.

Current data implementation:

- Employee records are stored in `mockEmployees`.
- Behavior, sentiment, and suspicious events are stored in `mockSignals`.
- Redux Toolkit initializes the application state from these datasets.
- Selectors compute dashboard metrics, department pressure, case results, and leak alerts.

Recommended production implementation:

- Store employee, behavior, sentiment, event, and manual alert data in a database.
- Expose API routes or backend services for data retrieval.
- Persist manual flags instead of keeping them only in frontend state.
- Add authentication and role-based access control.
- Add audit logging for all case review and flagging actions.

## 4.5 Login Module

The current application does not include a completed login module. It is currently designed as a frontend prototype/dashboard where all pages are accessible without authentication.

Recommended login module design:

- Login form with email and password.
- Authentication service connected to backend user accounts.
- Role-based access levels such as analyst, manager, finance reviewer, HR reviewer, and administrator.
- Protected routes for analysis, results, and manual flagging.
- Session management with secure cookies or token-based authentication.
- Logout function.
- Audit logs for login attempts and privileged actions.

Suggested roles:

| Role | Permission |
| --- | --- |
| Analyst | View employee risk and case details |
| Manager | Review department-level cases |
| Finance Reviewer | Review financial and wallet transfer indicators |
| HR Reviewer | Review sentiment and employee conduct indicators |
| Administrator | Manage users, settings, and system access |

## 4.9 System Testing

Testing should verify that the system works correctly across data processing, UI rendering, manual flags, navigation, and responsiveness.

Current verification performed during development:

- TypeScript compilation using `tsc --noEmit`.
- Page-level inspection of home, features, about, contact, analysis, and results routes.
- Navigation behavior review for desktop and mobile.
- Manual flag flow review through the manual flag control and global toast behavior.
- Scroll reveal inspection across pages.

Recommended test cases:

| Test Area | Test Case | Expected Result |
| --- | --- | --- |
| Navigation | Click each desktop and mobile nav item | Correct page loads and active nav state updates |
| Risk Scoring | Load selected employee case | Composite score, risk level, and reasons display correctly |
| Manual Flag | Flag an employee manually | High-priority alert appears in global toast and case review |
| Filtering | Apply department/risk filters | Employee list updates correctly |
| Sentiment | Review sentiment summary | Current score, trend, and summary display correctly |
| Finance Risk | Review wallet/transaction indicators | Finance risk score and board recommendation appear |
| Responsive UI | View on mobile screen | Header, mobile nav, cards, and forms remain usable |
| Accessibility | Enable reduced motion | Scroll animation is disabled and content appears immediately |
| Build Check | Run TypeScript check | No TypeScript errors |

Recommended future testing:

- Unit tests for scoring logic.
- Component tests for manual flag modal and global toast.
- End-to-end tests for navigation and case review workflows.
- Accessibility testing for keyboard navigation and screen readers.
- Performance testing when real backend data volume increases.
