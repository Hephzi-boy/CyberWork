# Detection of Insider Cyber Threats Using Behavioral Sentiment Analysis

## Project Intent

This project should be presented as a final-year cyber security research prototype, not a generic admin dashboard.

The product experience should communicate three things clearly:

1. This is an academic research project.
2. This is also a working prototype for insider-threat detection.
3. The system supports analyst decision-making by combining behavioral evidence and sentiment evidence into a risk score.

The UI should be suitable for:

- academic project presentation
- chapter-three and chapter-four explanation
- prototype demonstration
- case-study walkthrough
- results and evaluation review

## Core Detection Idea

The system combines:

- behavioral indicators from employee activity logs
- sentiment analysis from internal communications
- a weighted insider-threat risk model
- human analyst review before any escalation decision

Important principle:

Sentiment analysis must be presented as a risk indicator only, not proof of malicious intent.

## Research Objectives

The interface and workflow should support these study objectives:

1. Study insider cyber threat patterns and existing detection methods.
2. Design a system that collects and analyzes user behavioral activities.
3. Implement sentiment analysis on internal communication data.
4. Develop a risk scoring model that combines behavioral and sentiment indicators.
5. Test and evaluate the effectiveness of the proposed detection system.

## Product Positioning

This project should feel like:

- a cyber-intelligence research system
- a polished academic prototype
- a forensic storytelling interface

It should not feel like:

- a plain SaaS dashboard
- a generic card grid
- a corporate admin panel
- a basic CRUD application

## Visual Direction for UI Redesign

The redesigned UI should follow this direction:

- bold editorial cyber-research aesthetic
- premium, modern, intelligent, forensic feel
- strong grid system with asymmetrical layout
- large expressive headings
- readable body copy
- monospace code areas for prototype logic and output
- layered backgrounds, evidence blocks, charts, workflow rails, and diagram-like sections
- subtle motion and hover depth

Preferred color and type direction:

- deep ink, navy, graphite, teal, amber, and rust accents
- one expressive display font for headings
- one clean sans-serif for body content
- one monospace font for code and data output

## Information Architecture

The project should be organized into three major application screens:

1. Research Overview Page
2. Prototype Analysis / Case Study Page
3. Results and Evaluation Page

## Screen 1: Research Overview Page

### Purpose

Present the project topic, methodology, data sources, detection workflow, prototype summary, and sample employee watchlist in a visually strong academic narrative.

### Required sections

#### Hero

- project title
- short project summary
- note explaining that behavioral sentiment analysis is a decision-support signal
- primary CTA such as `Explore Prototype`
- secondary CTA such as `View Workflow`

#### Objectives

- display the five study objectives as clear numbered research cards

#### Chapter Three: Research Methodology

- hybrid research design
- descriptive approach
- experimental approach
- data sources
- data collection methods
- preprocessing pipeline

#### Data Sources

- CERT Insider Threat Dataset
- Enron Email Dataset
- internal communication logs
- user activity logs
- questionnaire or survey inputs

#### Feature Fusion

- behavioral features
- sentiment features
- risk scoring model

#### Prototype Workflow

- employee activity ingestion
- behavior extraction
- sentiment analysis
- feature engineering
- risk model or machine learning model
- threat risk score
- SOC analyst review

#### Prototype Code Preview

- Python prototype block
- sentiment scoring logic
- suspicious keyword detection
- risk scoring flow
- example output table

#### Chapter Four Preview

- system design
- user interface design
- database implementation
- login module
- result visualization
- system testing
- performance evaluation
- results and discussion
- achievements
- limitations

#### Live Watchlist Preview

- sample employee cases
- risk score
- sentiment score
- anomaly score
- case-study navigation action

## Screen 2: Prototype Analysis / Case Study Page

### Purpose

Show a single employee as a full insider-threat review case with explainable evidence.

### Layout direction

- primary content area for evidence and charts
- side area for analyst summary, case profile, and recommendations

### Required sections

#### Case Header

- employee name
- role
- department
- location
- clearance level
- threat badge
- analyst review status

#### Composite Risk Meter

- final threat score out of 100
- threshold bands for low, medium, and high risk

#### Behavioral Evidence

- after-hours access count
- failed logins
- file access anomalies
- USB activity
- privilege escalation events
- download volume
- command usage anomalies

#### Sentiment Evidence

- baseline sentiment
- current sentiment
- sentiment drift
- negative keyword hits
- communication summary
- sentiment trend chart

#### Flagged Reasons

- plain-language explanation of why the case was escalated

#### Suspicious Timeline

- event feed with timestamps
- access events
- sentiment events
- policy events
- transfer events

#### Analyst Recommendation Panel

- escalate for review
- increase monitoring
- restrict privileged access if needed
- HR and security follow-up
- explicit note against automated punitive action

## Screen 3: Results and Evaluation Page

### Purpose

Present chapter-four testing, metrics, findings, strengths, and limitations in a strong academic format.

### Required sections

#### Evaluation Hero

- results summary
- testing overview
- quick interpretation of system performance

#### KPI Cards

- accuracy
- precision
- recall
- F1-score
- false positives
- false negatives

#### Results Visualization

- department risk distribution
- sentiment drift over time
- alert category breakdown
- high-risk vs low-risk populations

#### Findings

- combined behavioral and sentiment analysis improves early detection
- sentiment alone is insufficient
- behavioral anomalies offer stronger confirmation
- human review remains essential

#### Achievements

- prototype developed
- risk model implemented
- visualization system working
- case analysis supported

#### Limitations

- privacy concerns
- dataset realism
- false positives
- sentiment ambiguity
- limited access to real organizational deployment data

## Data Model for the UI

The visual system should reflect these data groups clearly.

### Behavioral indicators

- login frequency
- failed login attempts
- file downloads
- USB insertions
- privilege changes
- access outside work hours
- command usage
- data transfer activity

### Sentiment indicators

- email sentiment score
- chat sentiment score
- emotional tone
- stress markers
- hostility markers
- negative message count
- suspicious keywords

### Risk outputs

- composite threat score
- threat level
- escalation status
- analyst recommendation

## Research Methodology Workflow

This section should guide both the written project narrative and the UI storytelling.

### Research design

- hybrid design combining quantitative and qualitative methods
- descriptive approach for behavior and sentiment pattern analysis
- experimental approach for validating the proposed detection model

### Data sources

- primary data from communication logs, user activity logs, and questionnaires
- secondary data from CERT, Enron, and cybersecurity research sources

### Data collection techniques

- log monitoring tools
- text extraction from emails and chats
- repository and dataset APIs
- employee questionnaires or structured sentiment surveys

### Data preprocessing

- data cleaning
- normalization
- tokenization
- stop-word removal
- stemming
- lemmatization
- anonymization

### Feature extraction

Two major feature groups should be visible in both the UI and documentation:

1. Behavioral features
2. Sentiment features

## End-to-End Detection Workflow

This is the core project logic that the interface should explain visually:

1. Collect employee activity logs and communication records.
2. Clean and normalize structured and unstructured data.
3. Extract behavioral indicators from activity streams.
4. Extract sentiment indicators from internal communication text.
5. Combine both feature sets in a weighted risk model or machine learning model.
6. Produce a composite insider-threat score.
7. Flag suspicious cases for SOC analyst review.
8. Present recommendations and contextual evidence for human decision-making.

## User Journey Workflow

The user experience should follow this sequence:

1. User lands on the Research Overview Page.
2. User understands the project problem, objectives, and methodology.
3. User reviews datasets, feature categories, and the prototype workflow.
4. User inspects the Python prototype logic and sample output.
5. User opens a sample employee case study.
6. User reviews behavioral evidence and sentiment evidence together.
7. User sees the composite risk score, flagged reasons, timeline, and analyst recommendations.
8. User moves to the Results and Evaluation Page for model performance and findings.

## UI Component System

The redesign should be built from reusable components rather than page-specific one-offs.

### Required components

- research hero
- objective cards
- methodology timeline
- dataset chips or evidence tiles
- feature comparison split panel
- workflow rail or process diagram
- Python code preview block
- example output table
- watchlist case cards
- composite risk gauge
- sentiment trend chart
- suspicious event timeline
- KPI cards
- evaluation charts
- findings panel
- limitations panel

## Implementation Workflow

This is the recommended build sequence for the redesign.

### Phase 1: Product framing

- define the product as a research prototype
- lock the academic narrative around chapter three and chapter four
- finalize the three-screen structure

### Phase 2: UX architecture

- create low-fidelity layouts for the three screens
- order sections for storytelling clarity
- separate academic explanation from analyst evidence

### Phase 3: Visual system

- define typography
- define color tokens
- define background language
- define chart styling
- define code block styling
- establish a distinct cyber-research identity

### Phase 4: Component system

- build reusable layout and data-display components
- keep sections modular and composable
- support both desktop and mobile presentation

### Phase 5: Data binding

- connect mock employee, behavior, sentiment, and event data
- map realistic values into cards, charts, and case views
- support research-demo storytelling with structured sample data

### Phase 6: Interaction design

- add meaningful transitions
- add workflow emphasis
- add chart highlights
- improve case navigation and content scanning

### Phase 7: Validation

- verify readability on desktop and mobile
- verify that the thesis narrative is still clear
- verify that the prototype is presentation-ready for academic defense

## Stitch Handoff Prompt

Use the text below when handing the redesign to Stitch.

```text
Design a high-end web UI for a final-year cyber security project titled "Detection of Insider Cyber Threats Using Behavioral Sentiment Analysis."

This is not a generic dashboard. It should feel like a polished academic cyber-intelligence research prototype that combines thesis presentation, system workflow, and analyst review.

Create 3 main screens:

1. Research Overview Page
2. Prototype Analysis / Case Study Page
3. Results and Evaluation Page

Visual direction:
- Bold editorial cyber-research aesthetic
- Premium, modern, intelligent, forensic feel
- Strong grid system with asymmetrical layout
- Large expressive headings
- Clean body typography
- Monospace code blocks
- Layered backgrounds, subtle diagrams, evidence panels, and elegant charts
- Avoid plain admin dashboard layouts
- Avoid repetitive cards with no hierarchy
- Use deep ink/navy or graphite with teal, amber, and rust accents
- Include subtle motion and transitions

Research Overview Page must include:
- Hero with project title and summary
- 5 objectives
- Chapter Three methodology
- Data sources
- Data collection methods
- Preprocessing pipeline
- Behavioral features
- Sentiment features
- Risk scoring explanation
- Workflow diagram from employee activity to SOC analyst review
- Python prototype code preview
- Example output table
- Chapter Four implementation structure
- Live watchlist preview of sample employee cases

Prototype Analysis Page must include:
- Employee case-study header
- Composite risk score meter
- Behavioral evidence section
- Sentiment evidence section
- Sentiment trend chart
- Flagged reasons
- Suspicious event timeline
- Structured case profile
- Analyst recommendations

Results and Evaluation Page must include:
- Model evaluation summary
- KPI cards
- Charts for department risk, sentiment drift, and alert categories
- Findings section
- Achievements section
- Limitations section

Data concepts to visualize:
- Login anomalies
- Failed logins
- File downloads
- USB activity
- Privilege changes
- After-hours access
- Email/chat sentiment
- Stress and hostility indicators
- Threat keywords
- Composite risk score
- Analyst review outcome

The UI should be presentation-ready for an academic final project defense and visually distinctive enough to stand out from normal SaaS dashboards.
```

## Current Build Note

The current codebase is still a frontend-only Next.js application with local mock data and client-side state. This workflow document defines the target direction for the next UI redesign pass and for any external layout generation tool such as Stitch.
