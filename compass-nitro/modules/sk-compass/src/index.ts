import { NitroModules } from 'react-native-nitro-modules';
import type { Compass } from './specs/compass.nitro';

export type { CompassReading } from './specs/compass.nitro';
export const CompassModule = NitroModules.createHybridObject<Compass>('Compass');
