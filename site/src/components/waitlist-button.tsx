"use client";

import { useWaitlist } from "./waitlist-provider";

export function WaitlistButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const openWaitlist = useWaitlist();

  return (
    <button onClick={openWaitlist} className={className}>
      {children}
    </button>
  );
}
