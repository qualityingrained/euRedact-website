"use client";

import { useEffect, useRef, useState } from "react";

/*
  The redaction sweep behind the hero, ported from the euRedact Home design.

  Squares light up in short runs that travel left to right, as though a redactor
  were working across the page, then fade. Each run is 3–7 cells wide with a
  0.2s stagger between neighbours, so the run reads as a sweep rather than a
  block appearing at once. Rows start at random offsets and some are skipped
  entirely, which keeps the whole thing from marching in step.

  The grid is measured rather than assumed, so the cell count follows the
  viewport. That means it can only be built after mount — which is also why
  there is nothing to mismatch during hydration: the server renders an empty
  layer.

  `prefers-reduced-motion` is honoured in globals.css via [data-redact-cell],
  which pins these to opacity 0.
*/

const CELL_PX = 72;
const CYCLE_S = 12;
const STAGGER_S = 0.2;
const MIN_RUN = 3;
const MAX_RUN = 7;
/** Odd rows are dropped this often, to break up the vertical rhythm. */
const ROW_SKIP_CHANCE = 0.55;

type Cell = { delay: number | null };

/*
  Seeded LCG rather than Math.random: the pattern should be identical on every
  render for a given grid size, so a re-measure does not reshuffle the whole
  field while the user is looking at it.
*/
function makeCells(cols: number, rows: number): Cell[] {
  let seed = 20260728;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const cells: Cell[] = [];
  for (let r = 0; r < rows; r++) {
    const row: (number | null)[] = new Array(cols).fill(null);

    if (r % 2 === 1 && rnd() < ROW_SKIP_CHANCE) {
      row.forEach(() => cells.push({ delay: null }));
      continue;
    }

    let c = Math.floor(rnd() * 8);
    while (c + MIN_RUN <= cols) {
      const len = Math.min(
        MIN_RUN + Math.floor(rnd() * (MAX_RUN - MIN_RUN + 1)),
        cols - c
      );
      /* Keep the whole run inside one cycle so it never wraps mid-sweep. */
      const base = rnd() * (CYCLE_S - len * STAGGER_S);
      for (let i = 0; i < len; i++) {
        row[c + i] = +(base + i * STAGGER_S).toFixed(2);
      }
      /* Gap before the next run, so only a few sweeps are visible at once. */
      c += len + 7 + Math.floor(rnd() * 12);
    }

    row.forEach((delay) => cells.push({ delay }));
  }
  return cells;
}

export function HeroRedactionLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<{ cols: number; rows: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const box = el.getBoundingClientRect();
      const cols = Math.max(6, Math.ceil(box.width / CELL_PX));
      const rows = Math.max(4, Math.ceil(box.height / CELL_PX));
      setGrid((prev) =>
        prev && prev.cols === cols && prev.rows === rows ? prev : { cols, rows }
      );
    };

    /* ResizeObserver fires once on observe, which does the initial measure.
       Calling it synchronously here would cascade a render inside the effect. */
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cells = grid ? makeCells(grid.cols, grid.rows) : [];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={
        grid
          ? {
              display: "grid",
              gridTemplateColumns: `repeat(${grid.cols}, ${CELL_PX}px)`,
              gridAutoRows: `${CELL_PX}px`,
            }
          : undefined
      }
    >
      {cells.map((cell, i) =>
        cell.delay === null ? (
          <div key={i} />
        ) : (
          <div
            key={i}
            data-redact-cell="1"
            style={{
              background: "var(--cell)",
              opacity: 0,
              animation: `redactCell ${CYCLE_S}s linear infinite`,
              animationDelay: `${cell.delay}s`,
            }}
          />
        )
      )}
    </div>
  );
}
