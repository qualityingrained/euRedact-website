"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Span {
  text: string;
  pii?: string; // e.g. "IBAN", "BSN", "EMAIL" — if set, this span is PII
}

interface DocMockupProps {
  lines: Span[][];
  variant: "chat" | "letter" | "logs" | "table" | "paper" | "ticket";
  darkParent?: boolean;
}

/* ------------------------------------------------------------------ */
/*  PII span rendering                                                 */
/* ------------------------------------------------------------------ */

function PiiSpan({ span, redacted }: { span: Span; redacted: boolean }) {
  if (!span.pii) {
    return <span>{span.text}</span>;
  }

  // Use a grid stack so both states occupy the same space without layout shift
  const area = "1 / 1 / 2 / 2";
  return (
    <span className="inline-grid rounded px-0.5" style={{ gridTemplate: "1fr / 1fr" }}>
      <span
        className={`transition-opacity duration-500 rounded px-0.5 bg-amber-400/20 text-amber-300 ${
          redacted ? "opacity-0" : "opacity-100"
        }`}
        style={{ gridArea: area }}
      >
        {span.text}
      </span>
      <span
        className={`transition-opacity duration-500 rounded px-0.5 bg-emerald-400/25 text-emerald-400 font-bold ${
          redacted ? "opacity-100" : "opacity-0"
        }`}
        style={{ gridArea: area }}
      >
        {`[${span.pii}]`}
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant shells                                                     */
/* ------------------------------------------------------------------ */

function ChatShell({
  children,
  redacted,
}: {
  children: React.ReactNode;
  redacted: boolean;
}) {
  return (
    <div className="space-y-3">
      {/* System message */}
      <div className="flex gap-2 items-start">
        <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-[8px] font-black text-indigo-300">AI</span>
        </div>
        <div className="bg-white/5 rounded-xl rounded-tl-sm px-3 py-2 text-[11px] text-slate-400 leading-relaxed">
          How can I help you today?
        </div>
      </div>
      {/* User message with PII */}
      <div className="flex gap-2 items-start justify-end">
        <div className="bg-secondary/10 border border-secondary/20 rounded-xl rounded-tr-sm px-3 py-2 text-[11px] leading-relaxed max-w-[85%]">
          {children}
        </div>
        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-secondary text-[10px]">person</span>
        </div>
      </div>
      {/* Redact indicator */}
      <div className={`flex items-center gap-1.5 justify-center transition-opacity duration-300 ${redacted ? "opacity-100" : "opacity-0"}`}>
        <span className="material-symbols-outlined text-secondary text-[10px]">shield</span>
        <span className="text-[9px] text-secondary font-bold uppercase tracking-wider">PII stripped before sending to LLM</span>
      </div>
    </div>
  );
}

function LetterShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Employment Contract</div>
        <div className="text-[9px] text-slate-600">Page 1 of 3</div>
      </div>
      <div className="text-[11px] leading-[1.8] space-y-3">{children}</div>
    </div>
  );
}

function LogsShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <span className="material-symbols-outlined text-slate-500 text-xs">terminal</span>
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Application Logs</span>
        <span className="ml-auto text-[9px] text-slate-600 font-mono">tail -f app.log</span>
      </div>
      <div className="font-mono text-[10px] leading-[1.9] space-y-0">{children}</div>
    </div>
  );
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <span className="material-symbols-outlined text-slate-500 text-xs">table_chart</span>
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">customers.csv</span>
        <span className="ml-auto text-[9px] text-slate-600">1,247 rows</span>
      </div>
      {children}
    </div>
  );
}

function PaperShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="text-center mb-4 pb-3 border-b border-white/10">
        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Journal of European Data Science</div>
        <div className="text-[11px] text-slate-300 font-bold">Patient Outcome Analysis — NL Cohort 2024</div>
      </div>
      <div className="text-[11px] leading-[1.8] space-y-3">{children}</div>
    </div>
  );
}

function TicketShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Open</span>
        </div>
        <span className="text-[9px] text-slate-500 font-bold">#4821</span>
        <span className="text-[9px] text-slate-600 ml-auto">2 hours ago</span>
      </div>
      <div className="text-[11px] leading-[1.8]">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table variant (special rendering)                                  */
/* ------------------------------------------------------------------ */

interface TableRow {
  cells: Span[];
}

function TableBody({
  headers,
  rows,
  redacted,
}: {
  headers: string[];
  rows: TableRow[];
  redacted: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <table className="w-full text-[10px]">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 text-left text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/5 last:border-0">
              {row.cells.map((cell, ci) => (
                <td key={ci} className="px-3 py-1.5 text-slate-300">
                  <PiiSpan span={cell} redacted={redacted} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function DocMockup({ lines, variant, darkParent }: DocMockupProps) {
  const [hovered, setHovered] = useState(false);

  const renderLines = () =>
    lines.map((spans, li) => (
      <div key={li}>
        {spans.map((s, si) => (
          <PiiSpan key={si} span={s} redacted={hovered} />
        ))}
      </div>
    ));

  const shell = () => {
    switch (variant) {
      case "chat":
        return <ChatShell redacted={hovered}>{renderLines()}</ChatShell>;
      case "letter":
        return <LetterShell>{renderLines()}</LetterShell>;
      case "logs":
        return <LogsShell>{renderLines()}</LogsShell>;
      case "paper":
        return <PaperShell>{renderLines()}</PaperShell>;
      case "ticket":
        return <TicketShell>{renderLines()}</TicketShell>;
      default:
        return renderLines();
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl md:rounded-[2rem] p-5 md:p-6 shadow-2xl overflow-hidden cursor-default select-none transition-all duration-300 ${
        darkParent
          ? "bg-black/40 border border-white/10"
          : "bg-slate-950 border border-white/10"
      } ${hovered ? "border-secondary/40" : ""}`}
    >
      {/* Hover hint */}
      <div className={`flex items-center justify-center gap-1.5 mb-4 transition-opacity duration-300 ${hovered ? "opacity-0" : "opacity-100"}`}>
        <span className="material-symbols-outlined text-slate-600 text-[11px]">touch_app</span>
        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Hover to redact</span>
      </div>
      <div className="text-slate-300">{variant === "table" ? null : shell()}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table mockup (separate export)                                     */
/* ------------------------------------------------------------------ */

export function TableMockup({
  headers,
  rows,
  darkParent,
}: {
  headers: string[];
  rows: TableRow[];
  darkParent?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl md:rounded-[2rem] p-5 md:p-6 shadow-2xl overflow-hidden cursor-default select-none transition-all duration-300 ${
        darkParent
          ? "bg-black/40 border border-white/10"
          : "bg-slate-950 border border-white/10"
      } ${hovered ? "border-secondary/40" : ""}`}
    >
      <div className={`flex items-center justify-center gap-1.5 mb-4 transition-all duration-300 ${hovered ? "opacity-0 h-0 mb-0" : "opacity-100"}`}>
        <span className="material-symbols-outlined text-slate-600 text-[11px]">touch_app</span>
        <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Hover to redact</span>
      </div>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <span className="material-symbols-outlined text-slate-500 text-xs">table_chart</span>
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">customers.csv</span>
        <span className="ml-auto text-[9px] text-slate-600">1,247 rows</span>
      </div>
      <TableBody headers={headers} rows={rows} redacted={hovered} />
    </div>
  );
}
