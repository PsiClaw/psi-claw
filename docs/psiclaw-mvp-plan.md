# PsiClaw MVP Plan
_Last updated: 2026-04-08_

> This document defines the shortest credible path from the current UI harness to a real
> PsiClaw MVP. It narrows scope aggressively so we can ship one complete operator loop
> before expanding into full desktop coverage, long-term memory, or large-scale training.

---

## 1. MVP Definition

### Product statement
PsiClaw MVP is a **single-user operator console for one live task surface** that can:

1. Observe a real task context
2. Generate a proposed next action
3. Require explicit approval for risky actions
4. Execute the approved action through one supported runtime
5. Persist a replayable trace and a basic eval result

### What the MVP must prove
- The console is no longer a mock UI; it reflects real runs and real decisions
- The safety model is enforced by code, not just described in copy
- Every action produces an auditable record: state, proposal, approval, execution, outcome
- We can collect real trace data that is useful for later fine-tuning and evals

### Recommended MVP wedge
Start with **API-first browser tasks** against a small set of known services, using
approval in the operator console and persisted traces.

This is the best first wedge because it:
- avoids the full complexity of native app control
- still validates the operator workflow end to end
- produces structured traces earlier than pure visual automation
- lets us exercise risk scoring, approval, execution, and replay quickly

---

## 2. Explicit Non-Goals

The following are intentionally **out of scope for MVP**:

- Full desktop-native coverage across arbitrary macOS apps
- Continuous background memory / OpenTrust personalization
- Multi-agent networking with OpenAgents
- Automated fine-tuning pipeline
- Broad benchmark dashboard across all six target suites
- Production-ready multi-user auth and team collaboration
- General-purpose browser automation across unknown sites

These should remain post-MVP expansion areas.

---

## 3. Current State

### What already exists
- A polished Next.js UI harness with routes for overview, console, gym, traces, and evals
- Demo data that communicates the intended product shape
- Planning docs for the model, training philosophy, and system prompt

### What is missing for MVP
- Live runtime integration
- Persisted sessions, actions, approvals, and traces
- A server-side execution boundary
- A real trace viewer backed by stored artifacts
- A basic eval pipeline grounded in actual runs
- A narrow supported task catalog with deterministic behavior

---

## 4. MVP Scope

### Supported user
- Single operator
- Local or self-hosted environment
- Trusted internal use only

### Supported task type
- API-first web tasks for a small allowlist of services

### Recommended first task set
- GitHub: list PRs, fetch PR summary, fetch diff metadata
- GitHub: draft review summary for operator approval
- Optional second service after GitHub is stable: Gmail or Linear read-only fetches

### Runtime assumption
- The operator console is the primary control surface
- Execution happens through one server-owned runtime with explicit policy checks
- Risky actions are blocked until operator approval is present

---

## 5. MVP User Journey

1. Operator starts a run from the console with a supported task
2. System creates a session and captures initial observed state
3. System proposes one next action with rationale, confidence, and risk
4. Operator approves or denies
5. If approved, runtime executes the action
6. System records resulting state and outcome
7. Console updates live with status
8. Trace page shows the full chain after completion
9. Evals page shows aggregated outcomes from real runs

### MVP success criteria
- A supported task can complete end to end without demo data
- Approval is enforced for medium/high-risk actions
- Trace artifacts are saved and visible in the UI
- Runs can be replayed and audited after completion
- Basic eval counters are computed from stored run outcomes

---

## 6. System Requirements

### Core entities
- `run`
  - one operator-initiated session
  - includes task type, current status, timestamps
- `observation`
  - captured state before or after an action
  - includes structured summary and raw artifact references
- `proposal`
  - next action candidate with confidence, rationale, and risk
- `approval`
  - operator decision with timestamp and actor
- `execution`
  - actual runtime invocation and result
- `trace_event`
  - normalized timeline entry used by replay UI and evals
- `eval_result`
  - outcome classification for the run or action

### Minimum storage needs
- Persistent store for run metadata and audit records
- Blob/file storage for raw trace artifacts if needed
- Local-first implementation is acceptable for MVP if it is durable and inspectable

### Minimum backend capabilities
- Create run
- Fetch run and trace timeline
- Submit approve/deny decision
- Execute approved action
- List runs for traces/evals pages

---

## 7. Safety And Policy Requirements

### Must-have policy rules
- Low-risk read-only actions may auto-approve if explicitly allowed by policy
- Medium-risk actions require operator approval
- High-risk or irreversible actions require operator approval and must be clearly labeled
- Denied actions must never execute
- Authentication, billing, deletion, publishing, and account-setting actions are blocked by default

### Must-have auditability
- Every approval and denial is persisted
- Every execution record includes the exact action attempted
- The trace timeline makes it clear whether the system observed, proposed, awaited approval, executed, or failed

---

## 8. Workstreams

### Workstream A: Backend foundation
Deliverables:
- Minimal persistent schema for runs, proposals, approvals, executions, and trace events
- Route handlers or server endpoints for session lifecycle and approvals
- Typed server-side models shared with the UI

Acceptance:
- We can create, fetch, and update a run without touching demo data

### Workstream B: Supported runtime
Deliverables:
- One concrete execution runtime for supported tasks
- Clear adapter boundary between task intent and provider-specific implementation
- Deterministic error handling and result normalization

Acceptance:
- GitHub read-only tasks execute and return structured results

### Workstream C: Policy engine
Deliverables:
- Risk classification on supported actions
- Policy gate that blocks execution unless approval exists
- Clear operator-facing reason when an action is blocked

Acceptance:
- Medium/high-risk actions cannot execute without an approval record

### Workstream D: Console integration
Deliverables:
- Console reads live runs instead of demo arrays
- Approve/deny controls mutate server state
- Real-time or refresh-based status updates

Acceptance:
- Operator decisions in the UI change actual run state and outcome

### Workstream E: Trace explorer
Deliverables:
- Trace view backed by persisted trace events
- Event timeline from observation to outcome
- Per-run replay detail page or expanded view

Acceptance:
- Completed runs show a full, readable audit trail

### Workstream F: Eval board
Deliverables:
- Minimal eval model derived from run outcomes
- Aggregate counters for success, blocked, denied, failed, and approval burden
- Remove or clearly label any remaining synthetic metrics

Acceptance:
- The evals page reflects real run data only

### Workstream G: Data export for training
Deliverables:
- Trace export format suitable for later model work
- Metadata that distinguishes success, failure, and recovery episodes
- Basic documentation for where training-ready artifacts live

Acceptance:
- A completed run can be exported as a structured artifact for future fine-tuning work

---

## 9. Delivery Phases

### Phase 0: Decision lock
Goal:
- Freeze the MVP wedge and supported services

Tasks:
- Confirm GitHub as the first supported service
- Confirm storage choice for MVP
- Confirm whether auto-approval is allowed for low-risk read-only actions

Exit criteria:
- No remaining product ambiguity for the first live loop

### Phase 1: Backend skeleton
Goal:
- Replace demo-only state with persisted run data

Tasks:
- Define schema and types
- Add run lifecycle endpoints
- Add seed/dev utilities if needed

Exit criteria:
- Console can load live run records from storage

### Phase 2: Execution and policy
Goal:
- Make one supported task actually run

Tasks:
- Implement GitHub adapter for read-only tasks
- Add proposal shape, risk scoring, and approval gate
- Normalize execution outcomes into trace events

Exit criteria:
- A GitHub task can be proposed and executed safely

### Phase 3: UI conversion
Goal:
- Turn console and traces into real product surfaces

Tasks:
- Bind console to live runs and approvals
- Bind trace view to stored events
- Replace synthetic queue/status numbers with derived values

Exit criteria:
- Operator can complete an end-to-end run from the UI

### Phase 4: MVP evals and export
Goal:
- Close the loop with real reporting and reusable artifacts

Tasks:
- Aggregate eval counters from stored runs
- Add structured trace export
- Document how these traces feed later training work

Exit criteria:
- Every completed run contributes to trace review and eval reporting

---

## 10. Concrete Build Order

1. Define types for runs, proposals, approvals, executions, and trace events
2. Implement storage and server endpoints
3. Implement one GitHub read-only adapter
4. Implement policy gating for approve/deny
5. Convert console from demo data to live state
6. Convert traces page from demo data to live state
7. Convert evals page to derived counters from stored runs
8. Add trace export format and docs
9. Remove or label remaining mock-only surfaces

---

## 11. Recommended Tech Choices For MVP

These are defaults, not hard requirements.

### Application
- Keep Next.js App Router as the console frontend
- Use route handlers or server actions only where they keep the flow simple and auditable

### Storage
- Start with a simple relational store or durable local DB
- Prioritize inspectability and low setup friction over long-term scale

### Execution adapters
- Keep provider adapters isolated behind typed interfaces
- Separate task intent from provider transport so later services can be added safely

### Trace artifacts
- Store structured JSON for the timeline first
- Add screenshots/raw payloads only where they materially help replay and training

---

## 12. Risks And Mitigations

### Risk: scope creep into full desktop automation
Mitigation:
- Keep MVP to API-first browser tasks only

### Risk: UI polish outruns real functionality
Mitigation:
- No new showcase pages until console, traces, and evals are backed by live data

### Risk: safety remains aspirational
Mitigation:
- Put the policy gate on the server path before wiring any live action button

### Risk: training work starts before the product loop is real
Mitigation:
- Treat live trace capture as the prerequisite for further fine-tuning investment

### Risk: too many integrations at once
Mitigation:
- Start with GitHub only; add a second integration only after the first is stable

---

## 13. Exit Criteria For MVP

PsiClaw is at MVP when all of the following are true:

- One supported operator task completes end to end from the UI
- The console is backed by live run state, not demo arrays
- Approval is enforced in code for gated actions
- Trace replay is backed by persisted artifacts
- Evals are computed from real runs
- The system can export structured traces for future training use
- Remaining non-MVP surfaces are either clearly marked as prototype-only or backed by real data

---

## 14. Post-MVP Expansion

Only after MVP is stable should we expand into:

- Native macOS app control
- Tandem-backed browser traces for richer visual tasks
- OpenTrust memory integration
- OpenAgents multi-agent delegation
- Fine-tuning pipeline automation
- Broader benchmark coverage and recovery training loops
