This project now behaves like a multi-page company website for Precision Intelligence Lab, while still using the existing mock intelligence logic under the hood.

Current page flow:

1. Home page `/`
   This is the executive landing page.
   You should expect to see:
   - company-style hero section
   - lab capability overview
   - live intelligence summaries
   - current alert-driven insight cards

2. Features page `/features`
   This is the technical capabilities page.
   It explains how the lab works using the existing mock analysis data.
   You should expect to see:
   - selected case score
   - pressure index for the most active department
   - modeling and predictive analytics sections
   - system specification cards backed by current store data

3. About page `/about`
   This is the company and mission page.
   You should expect to see:
   - mission summary
   - active metrics from the current mock system
   - people roster built from the employee data
   - company-style timeline

4. Contact page `/contact`
   This is the inquiry and operations contact page.
   You should expect to see:
   - inquiry form
   - department contact cards
   - office and headquarters details
   - operational priority summary

New alert flow:

5. Global toast alert
   The website now has a top toast notification for potential information leaks.
   If a worker is flagged for trying to share restricted information outside the company domain, the system can show a red alert banner at the top of the website.

   The current mock example is based on:
   - employee: `Ifeanyi Obi`
   - event: external information share attempt

   The toast does this:
   - appears from the top automatically
   - states that the worker has been flagged for a possible external data share
   - shows the risk score tied to that worker
   - allows the user to review the case
   - allows the user to dismiss the alert

6. Manual flag flow
   The website now also allows you to personally raise a leak alert from the UI without editing code.

   How it works:
   - use the `Flag Employee` action in the shared header
   - choose the employee
   - choose the alert type
   - enter or adjust the incident details
   - submit the manual flag

   What happens next:
   - the manual flag enters the same top-toast flow as automatic detections
   - the employee is treated as a high-priority leak alert
   - the user can still review or dismiss the toast normally

How the data still works:

- The website is still not taking live user-entered threat data.
- The outputs still come from built-in mock files.
- The redesign changed presentation and navigation, not the core scoring model.

Main data sources:

- employees: `src/data/mockEmployees.ts`
- behavior, sentiment, and event data: `src/data/mockSignals.ts`
- analysis scoring logic: `src/store/slices/analysisSlice.ts`
- toast dismissal state: `src/store/slices/uiSlice.ts`
- manual flag modal: `src/components/insider-threat/manual-flag-control.tsx`

Important implementation note:

- The toast is not hardcoded only in the page markup.
- It is driven by both:
  automatic leak-style events from the event feed
  manual leak alerts submitted from the UI
- The alert is rendered globally through the shared site frame, so it can appear across the website.
