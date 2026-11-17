import type { HybridObject } from 'react-native-nitro-modules';

export type CompassReading = {
  /** Magnetic heading in degrees clockwise from magnetic north. */
  heading: number;
  /** Core Location heading accuracy in degrees; negative means invalid. */
  accuracy: number;
};

export interface Compass extends HybridObject<{ ios: 'swift' }> {
  startUpdates(onReading: (reading: CompassReading) => void): void;
  stopUpdates(): void;
}
