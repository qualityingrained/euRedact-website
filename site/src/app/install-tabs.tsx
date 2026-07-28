"use client";

import { useState } from "react";

const COMMANDS = {
  pip: "pip install euredact",
  npm: "npm install euredact",
} as const;

type Manager = keyof typeof COMMANDS;

export function InstallTabs() {
  const [manager, setManager] = useState<Manager>("pip");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMMANDS[manager]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* Clipboard is unavailable over plain HTTP and in some browsers. The
         command is visible either way, so this stays silent. */
    }
  };

  return (
    <div className="flex items-stretch bg-code border border-outline-variant rounded-xl overflow-hidden">
      {(Object.keys(COMMANDS) as Manager[]).map((m) => (
        <button
          key={m}
          onClick={() => {
            setManager(m);
            setCopied(false);
          }}
          className={`px-3.5 text-[13px] font-medium cursor-pointer transition-colors ${
            manager === m
              ? "bg-brand text-white"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {m}
        </button>
      ))}
      <code className="font-mono text-sm text-white px-4 py-3.5 whitespace-nowrap border-l border-outline-variant">
        {COMMANDS[manager]}
      </code>
      <button
        onClick={copy}
        aria-label={`Copy ${COMMANDS[manager]}`}
        className="bg-white/5 border-l border-outline-variant text-white font-medium text-[13px] px-4 cursor-pointer hover:bg-white/10 transition-colors"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
