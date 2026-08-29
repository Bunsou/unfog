"use client";

import { useEffect, useState } from "react";
import { LOCATIONS, TASKS, pickRandomTask, type Location, type Task } from "./lib/tasks";

export default function Home() {
  const [task, setTask] = useState<Task | null>(null);
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [nextUsed, setNextUsed] = useState(false);
  const [hardToDoUsed, setHardToDoUsed] = useState(false);

  useEffect(() => {
    // Random pick must happen client-side only, after mount, to avoid a
    // server/client render mismatch (SSR has no source of randomness).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTask(pickRandomTask(TASKS));
  }, []);

  function poolFor(location: Location | null): Task[] {
    return location ? TASKS.filter((t) => t.locations.includes(location)) : TASKS;
  }

  function handleNext() {
    if (nextUsed) return;
    setTask((current) => pickRandomTask(poolFor(activeLocation), current?.id));
    setNextUsed(true);
  }

  function handleSelectLocation(location: Location) {
    if (hardToDoUsed) return;
    setActiveLocation(location);
    setTask((current) => pickRandomTask(poolFor(location), current?.id));
    setHardToDoUsed(true);
  }

  const rerollsLeft = Number(!nextUsed) + Number(!hardToDoUsed);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-background px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-sm font-semibold tracking-[0.2em] text-sage-dark uppercase">
          unfog
        </span>
        <p className="text-sm text-muted">Pick one small thing. Do it. Move on.</p>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
        {task ? (
          <>
            <span className="rounded-full bg-sage-tint px-4 py-1 text-xs font-semibold tracking-wide text-sage-dark uppercase">
              {task.minutes} min
            </span>
            <h1 className="text-2xl leading-snug font-semibold text-foreground sm:text-3xl">
              {task.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-2">
              {task.locations.map((loc) => (
                <span
                  key={loc}
                  className="rounded-full border border-border px-3 py-1 text-xs tracking-wide text-muted uppercase"
                >
                  {LOCATIONS.find((l) => l.value === loc)?.label}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-[132px] items-center justify-center text-muted">…</div>
        )}
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-4">
        <button
          onClick={handleNext}
          disabled={nextUsed}
          className="w-full rounded-full bg-sage px-6 py-3 font-medium text-white transition-colors hover:bg-sage-dark disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:hover:bg-border"
        >
          Next task
        </button>
        <button
          onClick={() => setShowFilters(true)}
          disabled={hardToDoUsed || showFilters}
          className="text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:no-underline disabled:hover:text-muted"
        >
          Hard to do?
        </button>

        {showFilters && (
          <div className="grid w-full grid-cols-2 gap-2 pt-1">
            {LOCATIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleSelectLocation(value)}
                disabled={hardToDoUsed}
                className={`rounded-full border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed ${
                  activeLocation === value
                    ? "border-sage bg-sage text-white"
                    : "border-border bg-card text-foreground hover:border-sage disabled:hover:border-border disabled:opacity-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {rerollsLeft === 0 && (
          <p className="text-xs text-muted">That&rsquo;s it for this round — refresh to start over.</p>
        )}
      </div>
    </div>
  );
}
