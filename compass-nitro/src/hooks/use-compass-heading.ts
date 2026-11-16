import { useEffect, useState } from 'react';

import { normalizeHeading } from '@/utils/heading';

export type CompassAccuracy = 'high' | 'medium' | 'low';

export type CompassHeading = {
  heading: number;
  accuracy: CompassAccuracy;
};

const UPDATE_INTERVAL_MS = 100;
const CENTER_HEADING = 42;

function demoHeading(elapsedMs: number) {
  const seconds = elapsedMs / 1000;
  const drift = Math.sin(seconds / 7) * 12 + Math.sin(seconds / 2.5) * 2;
  return normalizeHeading(CENTER_HEADING + drift);
}

export function useCompassHeading(): CompassHeading {
  const [heading, setHeading] = useState(() => demoHeading(0));

  useEffect(() => {
    const startedAt = Date.now();
    const interval = setInterval(() => {
      setHeading(demoHeading(Date.now() - startedAt));
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  return { heading, accuracy: 'high' };
}
