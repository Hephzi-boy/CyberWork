# Nexora Technologies System Documentation

## 3.2 Data Sources

Nexora uses mock data stored inside the project files. This data represents workers, their behavior, communication activity, finance activity, sentiment, and suspicious events.

- Employee data: stores worker name, role, department, location, clearance level, and risk level.
- Behavior data: stores anomaly score, after-hours access, policy violations, USB activity, and download volume.
- Communication data: stores external emails, suspicious attachments, chat disclosures, outside calls, and rival contact signals.
- Financial data: stores transaction exports, wallet transfer attempts, transfer amount, and unapproved payouts.
- Sentiment data: stores current mood score, baseline score, negative keywords, trend history, and latest summary.
- Event feed data: stores suspicious events with time, title, details, severity, and event type.

Main files: `src/data/mockEmployees.ts` and `src/data/mockSignals.ts`.

## 3.3 Data Collection Methods

The current system does not collect live data. It uses already prepared mock data for demonstration.

In a real system, data would come from:

- Access logs and endpoint activity.
- Email, chat, and call monitoring platforms.
- File repositories, USB logs, and download records.
- Finance systems, wallet logs, and transaction records.
- Approved internal communication channels for sentiment analysis.

## 3.4 Data Characteristics (5Vs)

- Volume: the prototype uses small mock data, but a real system can handle many workers and records.
- Velocity: the current data is static, but production data would update close to real time.
- Variety: the system combines employee, behavior, communication, finance, sentiment, and event data.
- Veracity: the system explains why a worker is risky, reducing confusion from false positives.
- Value: the system helps detect possible leaks, fund misuse, and risky behavior early.

## 3.5 Existing System Analysis

Many existing insider-risk systems are fragmented. Different teams may check access logs, finance records, and communication alerts separately.

Common issues:

- Employee behavior is not reviewed in one place.
- Suspicious communication and file activity are separated.
- Finance anomalies may not be linked to access or communication behavior.
- Evidence is scattered across different tools.
- Leadership may receive alerts only after the issue becomes serious.

## 3.6 Problems of Existing System

- Detection is often delayed.
- There is no single employee risk score.
- Communication, access, and finance data are hard to connect.
- Review work can be slow and inconsistent.
- It may be unclear why a worker is considered risky.
- Important cases may not be prioritized quickly.
- Automated alerts may not lead to clear human review.
- Early warning signs can be missed.

## 3.7 Proposed System

Nexora Technologies is a web-based insider-risk monitoring system. It brings worker behavior, communication, finance, sentiment, and suspicious events into one dashboard.

Main features:

- Employee monitoring dashboard.
- Composite risk scoring.
- Communication risk analysis.
- Financial and wallet transfer risk analysis.
- Sentiment trend analysis.
- Automatic leak alerts.
- Case review dashboard.
- Board recommendation output.
- Department risk summary.
- Responsive pages for home, features, about, contact, analysis, and results.

The system is built with Next.js, React, Redux Toolkit, and TypeScript.

## 3.8 System Architecture

Nexora is a client-side web application. The frontend loads mock data, stores it in Redux, calculates risk, and displays the results in the interface.

Main layers:

- Presentation layer: Next.js pages and React components display the interface.
- State layer: Redux Toolkit stores filters, selected worker, analysis results, and dismissed alerts.
- Data layer: mock employee and signal data are imported from TypeScript files.
- Analysis layer: selectors calculate scores, reasons, alerts, and recommendations.
- Interaction layer: navigation, alert toast, filters, and case review let users use the system.

Important files:

- `src/app/page.tsx`: home page.
- `src/app/features/page.tsx`: features and case review page.
- `src/app/about/page.tsx`: company and people page.
- `src/app/contact/page.tsx`: contact page.
- `src/store/slices/analysisSlice.ts`: scoring and analysis logic.
- `src/store/slices/employeeSlice.ts`: employee filters and selection.
- `src/components/insider-threat/global-leak-toast.tsx`: automatic alert toast.

## 3.9 Data Flow Diagram

Simple flow:

```text
Mock Data
  -> Redux Store
  -> Analysis Selectors
  -> Risk Scores and Alerts
  -> Dashboard and Case Review
  -> User Reviews Results
```

Detailed flow:

```text
Employee, behavior, sentiment, and event data
  -> Redux initial state
  -> Risk scoring
  -> Watch vectors and recommendations
  -> UI cards, charts, alerts, and reports
```

## 3.10 Database Design

The current prototype does not use a real database. It uses TypeScript objects as mock data.

If converted to a database, the main tables would be:

- Employees: worker profile, department, role, location, clearance, and risk level.
- BehaviorSignals: anomaly score, access behavior, policy violations, USB activity, and downloads.
- SentimentRecords: sentiment score, baseline score, negative keywords, and summary.
- SuspiciousEvents: event title, details, severity, time, type, and linked employee.

## 3.11 Data Preprocessing

Before showing results, the system prepares the data inside the analysis slice.

It does the following:

- Matches behavior records with employees.
- Matches sentiment records with employees.
- Converts raw numbers into risk scores.
- Keeps scores between 0 and 100.
- Calculates communication risk.
- Calculates financial risk.
- Creates reasons for why a worker is flagged.
- Creates watch vectors for risky behavior areas.
- Sorts workers by score, sentiment, or name.
- Calculates average department risk.

## 3.12 Analytical Techniques

The system uses rule-based and weighted scoring. This means it checks conditions and combines multiple risk signals into one final score.

Main techniques:

- Composite scoring: combines sentiment, behavior, access, communication, finance, USB, and download risk.
- Threshold classification: places workers into low, medium, or high risk groups.
- Communication scoring: checks emails, attachments, chats, calls, and rival contacts.
- Financial scoring: checks transaction exports, wallet transfers, payouts, and transfer value.
- Sentiment drift: compares current sentiment with normal baseline behavior.
- Department aggregation: groups worker scores by department.
- Explainable alerts: shows reasons and watch vectors so users understand each case.

Risk levels:

```text
0-44: Low risk
45-74: Medium risk
75-100: High risk
```

## 3.13 Hardware Requirements

Minimum development hardware:

- Dual-core processor or better.
- 4 GB RAM minimum, 8 GB recommended.
- 1 GB free storage.
- 1366x768 display or higher.
- Internet connection for setup and deployment.

Recommended user hardware:

- Modern laptop or desktop.
- 8 GB RAM or higher.
- Stable internet connection.
- Modern web browser.

## 3.14 Software Requirements

Development software:

- Node.js.
- npm.
- Next.js 16.
- React 19.
- Redux Toolkit.
- React Redux.
- TypeScript.
- Chrome, Edge, Firefox, or Safari.

Runtime software:

- Web browser for users.
- Node.js server for deployment.
- Optional hosting platform such as Vercel, Netlify, or another Node-compatible host.

## 4.2 System Design

The system is a responsive multi-page web application. Users can move between home, features, about, contact, analysis, and results pages.

Main modules:

- App frame: shared header, navigation, footer, and global alert area.
- Home page: overview, metrics, intelligence cards, and latest events.
- Features page: selected worker review, monitoring coverage, and system details.
- About page: mission, people roster, projects, and timeline.
- Contact page: inquiry form, office details, and priority summary.
- Global toast: displays automatic urgent leak alerts.
- Scroll reveal: animates sections as users move down the page.

## 4.3 User Interface Design

The interface uses a corporate technology style for Nexora Technologies. It includes dark backgrounds, blue and purple accents, dashboards, cards, and responsive layouts.

Key UI features:

- Fixed top navigation.
- Mobile-friendly navigation.
- Hero sections with visual backgrounds.
- Dashboard metric ribbons.
- Case review cards.
- Automatic alert toast.
- Scroll reveal effects.
- Responsive design for desktop and mobile.
- Nexora logo and brand styling.

## 4.4 Database Implementation

The current project uses local mock data, not a live database. This makes the prototype easy to run without backend setup.

Current implementation:

- Employees are stored in `mockEmployees`.
- Behavior, sentiment, and events are stored in `mockSignals`.
- Redux loads the data into the app state.
- Selectors calculate metrics, pressure, case results, and alerts.

Future implementation:

- Store employee, behavior, sentiment, and event data in a database.
- Add backend API routes or services.
- Add authentication and role-based access.
- Add audit logs for case review actions.

## 4.5 Login Module

The current system does not include login. All pages are open because this is a frontend prototype.

Recommended login features:

- Email and password login form.
- Backend authentication service.
- User roles such as analyst, manager, finance reviewer, HR reviewer, and administrator.
- Protected analysis and results pages.
- Secure session management.
- Logout function.
- Audit logs for login and privileged actions.

Suggested roles:

- Analyst: views employee risk and case details.
- Manager: reviews department-level cases.
- Finance Reviewer: reviews financial and wallet indicators.
- HR Reviewer: reviews sentiment and conduct indicators.
- Administrator: manages users, settings, and access.

## 4.9 System Testing

Testing confirms that the system works correctly across data, UI, alerts, navigation, and responsiveness.

Checks performed:

- TypeScript compilation.
- Page review for home, features, about, contact, analysis, and results.
- Desktop and mobile navigation review.
- Automatic alert toast review.
- Scroll reveal review.

Recommended test cases:

- Navigation: each link should open the correct page.
- Risk scoring: selected worker should show score, level, and reasons.
- Filtering: department and risk filters should update the worker list.
- Sentiment: sentiment score, trend, and summary should display correctly.
- Finance risk: wallet and transaction indicators should show correct risk details.
- Responsive UI: pages should work on mobile and desktop.
- Accessibility: reduced motion should disable animations.
- Build check: TypeScript and production build should pass.

Future testing:

- Unit tests for scoring logic.
- Component tests for the global toast.
- End-to-end tests for navigation and case review.
- Accessibility tests for keyboard and screen reader support.
- Performance tests for larger real datasets.
