"use client";

import { useState, useCallback } from "react";

const FORMSPREE_URL = "https://formspree.io/f/xgopydoa";

export function BlogSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || status === "sending") return;

      setStatus("sending");
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, source: "blog" }),
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

  return (
    <section className="mx-auto max-w-7xl px-8 pb-20">
      <div className="bg-accent-indigo rounded-[3rem] p-16 text-center">
        <h2 className="font-black text-3xl text-white mb-4">Stay Updated</h2>
        <p className="text-slate-300 mb-8">
          Get notified about new features and GDPR guides.
        </p>

        {status === "success" ? (
          <p className="text-secondary font-black text-lg">
            You&apos;re subscribed! We&apos;ll keep you posted.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 text-white placeholder:text-white/40 border border-white/20 rounded-xl px-6 py-4 flex-1 max-w-md w-full focus:outline-none focus:border-secondary"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-secondary text-primary font-black rounded-xl px-8 py-4 hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
