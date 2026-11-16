/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0A0A0B',
    background: '#FFFFFF',
    backgroundElement: '#F1F2F4',
    backgroundSelected: '#E2E3E7',
    textSecondary: '#676B73',
    accent: '#E5484D',
    positive: '#2F9E63',
    dial: '#F8F9FA',
    dialBorder: '#E1E3E8',
    tick: '#16171A',
    tickSubtle: '#B4B8C0',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    backgroundElement: '#1B1C1F',
    backgroundSelected: '#292A2E',
    textSecondary: '#9EA2AA',
    accent: '#FF6369',
    positive: '#3DD68C',
    dial: '#0E0F11',
    dialBorder: '#26282D',
    tick: '#F5F6F8',
    tickSubtle: '#575C66',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
