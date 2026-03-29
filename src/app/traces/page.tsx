import { AppShell, Panel } from "@/components/app-shell";
import { traceEvents } from "@/lib/demo-data";

export default function TracesPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <section>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">
            Traces
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Replayable decision chains from observation to outcome.
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-300">
            ΨClaw preserves not just what happened, but why it happened: observed UI
            state, proposed action, approval status, and resulting effect.
          </p>
        </section>

        <Panel title="Trace: install nightly build" eyebrow="Replay-ready artifact">
          <div className="space-y-4">
            {traceEvents.map((event) => (
              <div key={event.step} className="flex gap-4 rounded-2xl border border-white/8 bg-black/20 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-400/15 text-sm font-medium text-violet-100">
                  {event.step}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-lg font-medium text-white">{event.event}</div>
                    <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-100">
                      {event.status}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{event.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
