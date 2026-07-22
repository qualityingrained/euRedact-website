"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { WaitlistModal } from "./waitlist-modal";
import { trackEvent } from "@/lib/analytics";

const WaitlistContext = createContext<() => void>(() => {});

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => {
    setOpen(true);
    // Paired with waitlist-submitted, this gives the modal's conversion rate.
    trackEvent("waitlist-opened");
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <WaitlistContext value={openModal}>
      {children}
      <WaitlistModal open={open} onClose={closeModal} />
    </WaitlistContext>
  );
}
