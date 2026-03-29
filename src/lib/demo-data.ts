export const navItems = [
  { href: "/", label: "Overview" },
  { href: "/console", label: "Operator Console" },
  { href: "/gym", label: "Desktop Gym" },
  { href: "/traces", label: "Traces" },
  { href: "/evals", label: "Evals" },
];

export const capabilityCards = [
  {
    title: "Desktop-aware observation",
    description:
      "ΨClaw turns desktop state into structured observations: windows, controls, app focus, risk markers, and task progress.",
  },
  {
    title: "Human approval at the center",
    description:
      "The system proposes actions with confidence, rationale, and blast radius before any destructive step is taken.",
  },
  {
    title: "Traceable training future",
    description:
      "Every simulated run becomes an auditable training artifact for future desktop agents, evals, and safety tuning.",
  },
];

export const workflowSteps = [
  "Observe current desktop state and active task objective.",
  "Infer candidate actions from UI affordances and prior successful trajectories.",
  "Score safety, reversibility, and operator confidence before proposing action.",
  "Request approval or auto-run low-risk actions under policy.",
  "Capture trace output for replay, evals, and future fine-tuning.",
];

export const consoleStats = [
  { label: "Active desktop sessions", value: "12", change: "+3 today" },
  { label: "Approval queue", value: "04", change: "2 high priority" },
  { label: "Successful simulations", value: "93.4%", change: "+4.2% this week" },
  { label: "Mean intervention time", value: "11s", change: "-6s vs baseline" },
];

export const observedApps = [
  {
    name: "Finder",
    state: "Focused",
    detail: "Downloads folder open · 18 visible items",
  },
  {
    name: "Safari",
    state: "Observed",
    detail: "OpenClaw docs tab active · 2 forms detected",
  },
  {
    name: "Terminal",
    state: "Observed",
    detail: "pnpm dev running · no elevated prompt",
  },
  {
    name: "Slack",
    state: "Muted",
    detail: "Unread badge present · no required action",
  },
];

export const proposedActions = [
  {
    title: "Open docs command palette",
    confidence: "96%",
    risk: "Low",
    reason:
      "Visible command menu trigger matches prior successful trajectories for settings lookup.",
  },
  {
    title: "Download latest build artifact",
    confidence: "82%",
    risk: "Medium",
    reason:
      "Target button is stable, but resulting file write touches operator workspace.",
  },
  {
    title: "Close stale auth modal",
    confidence: "71%",
    risk: "Needs review",
    reason:
      "Modal content is partially occluded; safe dismissal likely, but ambiguity remains.",
  },
];

export const desktopWindows = [
  {
    title: "Safari · docs.openclaw.ai",
    subtitle: "Frontmost · keyboard focus captured",
    chips: ["DOM snapshot", "2 clickable targets", "Low risk"],
  },
  {
    title: "Terminal · psi-claw",
    subtitle: "Background process healthy",
    chips: ["stdout streaming", "No sudo", "Editable repo"],
  },
  {
    title: "Finder · Downloads",
    subtitle: "Candidate task destination",
    chips: ["18 files", "write-capable", "reversible"],
  },
];

export const taskScenarios = [
  {
    name: "Install nightly build",
    status: "Ready",
    objective: "Locate newest artifact, verify signature, move to Applications.",
  },
  {
    name: "Update workspace dependency",
    status: "Running",
    objective: "Inspect terminal output, resolve prompts, preserve repo cleanliness.",
  },
  {
    name: "Submit weekly async update",
    status: "Drafted",
    objective: "Observe browser form state, populate sections, request final approval.",
  },
];

export const traceEvents = [
  {
    step: "01",
    event: "Snapshot captured",
    detail: "Desktop graph encoded with 4 windows, 31 actionable elements, 0 permission prompts.",
    status: "Observed",
  },
  {
    step: "02",
    event: "Intent ranked",
    detail: "Policy engine prioritized reversible navigation over form submission.",
    status: "Reasoned",
  },
  {
    step: "03",
    event: "Action proposed",
    detail: "Click Safari command palette trigger with 96% confidence and low blast radius.",
    status: "Pending approval",
  },
  {
    step: "04",
    event: "Operator approved",
    detail: "Action executed in sandbox replay with trace hash preserved for eval set export.",
    status: "Complete",
  },
];

export const evalRows = [
  {
    suite: "Finder Navigation",
    success: "97%",
    interventions: "0.3 / run",
    note: "Strong on file discovery and move semantics.",
  },
  {
    suite: "Browser Form Fill",
    success: "88%",
    interventions: "1.4 / run",
    note: "Needs better handling for auth and dynamic modals.",
  },
  {
    suite: "Terminal Safety",
    success: "99%",
    interventions: "0.1 / run",
    note: "Excellent detection of risky commands and irreversible writes.",
  },
  {
    suite: "Cross-app workflows",
    success: "74%",
    interventions: "2.2 / run",
    note: "Main frontier area for real macOS task training.",
  },
];
