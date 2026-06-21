"use client";

import { useEffect, useRef } from "react";

/**
 * Like useEffect, but only runs once on mount (even in StrictMode dev).
 */
export function useEffectOnce(effect: () => void | (() => void)) {
  const called = useRef(false);
  useEffect(() => {
    if (called.current) return;
    called.current = true;
    return effect();
  }, []);
}
