import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Compass } from '@/components/compass/compass';
import { Spacing } from '@/constants/theme';
import { useCompassHeading, type CompassAccuracy } from '@/hooks/use-compass-heading';
import { useTheme } from '@/hooks/use-theme';

const ACCURACY_LABEL: Record<CompassAccuracy, string> = {
  high: 'High accuracy',
  medium: 'Calibrating',
  low: 'Move away from metal',
};

export default function CompassScreen() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const { heading, accuracy } = useCompassHeading();

  const dialSize = Math.min(width - Spacing.five * 2, height * 0.46, 380);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.screen, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Compass</Text>

        <View style={[styles.pill, { backgroundColor: theme.backgroundElement }]}>
          <View style={[styles.dot, { backgroundColor: theme.positive }]} />
          <Text style={[styles.pillLabel, { color: theme.textSecondary }]}>
            {ACCURACY_LABEL[accuracy]}
          </Text>
        </View>
      </View>

      <View style={styles.dialArea}>
        <Compass heading={heading} size={dialSize} />
      </View>

      <Text style={[styles.hint, { color: theme.textSecondary }]}>
        Hold your device flat and level
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.three,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pillLabel: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  dialArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
    paddingBottom: Spacing.three,
  },
});
