"use client";

import { useState, useEffect, useCallback } from "react";

const FORMSPREE_URL = "https://formspree.io/f/xgopydoa";

export function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || status === "sending") return;

      setStatus("sending");
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          setStatus("success");
          setEmail("");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [email, status]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-[2rem] shadow-2xl max-w-md w-full p-10 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {status === "success" ? (
          <>
            <span className="material-symbols-outlined text-secondary text-5xl mb-4">
              check_circle
            </span>
            <h3 className="text-2xl font-black text-primary mb-2">
              You&apos;re on the list!
            </h3>
            <p className="text-on-surface-variant text-sm mb-6">
              We&apos;ll notify you as soon as euRedact Cloud launches.
            </p>
            <button
              onClick={onClose}
              className="bg-secondary text-white font-bold rounded-full px-8 py-3 hover:bg-emerald-400 transition-colors"
            >
              Done
            </button>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-secondary text-5xl mb-4">
              notifications_active
            </span>
            <h3 className="text-2xl font-black text-primary mb-2">
              Join the Waitlist
            </h3>
            <p className="text-on-surface-variant text-sm mb-8">
              Be the first to know when euRedact Cloud launches. No spam, just one
              email when we&apos;re ready.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-200 text-primary font-medium text-sm placeholder:text-slate-400 focus:outline-none focus:border-secondary transition-colors"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-secondary text-white font-black uppercase tracking-wider text-sm rounded-xl py-3.5 hover:bg-emerald-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Submitting..." : "Notify Me"}
              </button>
              {status === "error" && (
                <p className="text-red-500 text-xs font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            <p className="text-[11px] text-slate-400 mt-6">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
