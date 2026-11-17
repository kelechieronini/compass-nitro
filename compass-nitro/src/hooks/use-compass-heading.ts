import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { CompassModule } from 'sk-compass';

import { normalizeHeading } from '@/utils/heading';

export type CompassAccuracy = 'high' | 'medium' | 'low';

export type CompassHeading = {
  heading: number;
  accuracy: CompassAccuracy;
};

export function useCompassHeading(): CompassHeading {
  const [heading, setHeading] = useState(0);
  const [accuracy, setAccuracy] = useState<CompassAccuracy>('low');

  useEffect(() => {
    if (Platform.OS !== 'ios') return;
    CompassModule.startUpdates(({ heading: nextHeading, accuracy: accuracyDegrees }) => {
      if (accuracyDegrees < 0) {
        setAccuracy('low');
        return;
      }
      setHeading(normalizeHeading(nextHeading));
      setAccuracy(accuracyDegrees <= 10 ? 'high' : accuracyDegrees <= 25 ? 'medium' : 'low');
    });

    return () => { CompassModule.stopUpdates(); };
  }, []);

  return { heading, accuracy };
}
