# WaterGuard 💧
### Smart Water-Leak Detection and Repair Verification

WaterGuard is a water-loss monitoring and maintenance system that detects abnormal water flow, creates incidents, coordinates field workers, and verifies repairs using consecutive normal sensor readings.

## Problem
Water leaks can go unnoticed, repairs can be delayed, and a reported repair may not actually resolve the leak.

## Solution
WaterGuard connects sensor telemetry to an incident-management workflow. It tracks leaks from detection through worker assignment, repair submission, and sensor-based verification.

## Key Features
- **Sensor Monitoring:** Receive flow readings and compare them with expected flow.
- **Leak Detection:** Detect abnormal high-flow readings.
- **Incident Management:** Create and track water-leak incidents.
- **Worker Assignment:** Assign incidents to maintenance workers.
- **Repair Workflow:** Record repair submissions.
- **Automatic Verification:** Verify a repair after three consecutive normal readings.
- **Reopening:** Reopen an incident if high flow persists after repair submission.
- **Dashboard:** View sensors, incidents, statuses, and workers.

## Technology Stack
- Next.js and React
- TypeScript
- Tailwind CSS
- Supabase and PostgreSQL
- REST API routes
- Sensor telemetry simulation for testing

## Workflow
1. A sensor sends its flow reading.
2. The API compares the reading against the expected flow.
3. Abnormal flow creates a water-leak incident.
4. A supervisor assigns a maintenance worker.
5. The worker submits the repair.
6. WaterGuard evaluates subsequent sensor readings.
7. Three consecutive normal readings mark the incident as verified.
8. Persistent high flow causes the incident to be reopened.

## Run Locally

### Prerequisites
- Node.js and npm
- A Supabase project with the required tables and policies

### Installation

```bash
npm install
```

Configure your local `.env.local` file with the Supabase environment variables expected by the application. Never commit credentials or secret keys.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### TypeScript Check

```bash
npx tsc --noEmit
```

## Demo Checklist
- Show a normal sensor reading.
- Send an abnormal reading and show the generated incident.
- Assign the incident to a worker.
- Submit a repair.
- Send three consecutive normal readings.
- Confirm the incident becomes `VERIFIED` and its verification timestamp is saved.
- Demonstrate reopening when high flow persists after a repair.

## Project Status
WaterGuard includes a working telemetry and incident-management prototype. Deployment configuration and any additional cloud integrations should be verified before presenting them as implemented.

## Future Improvements
- Integrate production sensor devices.
- Expand cloud-based event processing and notifications.
- Add authentication and role-based access control.
- Deploy a production dashboard and monitoring infrastructure.

---
Built for a water-conservation and infrastructure-maintenance use case.
