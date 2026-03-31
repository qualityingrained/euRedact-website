"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { WaitlistModal } from "./waitlist-modal";

const WaitlistContext = createContext<() => void>(() => {});

export function useWaitlist() {
  return useContext(WaitlistContext);
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <WaitlistContext value={openModal}>
      {children}
      <WaitlistModal open={open} onClose={closeModal} />
    </WaitlistContext>
  );
}
