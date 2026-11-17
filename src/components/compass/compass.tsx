import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/hooks/use-theme";
import { formatHeading, headingToCardinal } from "@/utils/heading";

const TICK_ANGLES = Array.from({ length: 72 }, (_, index) => index * 5);
const NUMBER_ANGLES = Array.from(
  { length: 12 },
  (_, index) => index * 30,
).filter((angle) => angle % 90 !== 0);
const CARDINALS = [
  { angle: 0, label: "N" },
  { angle: 90, label: "E" },
  { angle: 180, label: "S" },
  { angle: 270, label: "W" },
];

const ROTATION_DURATION = 180;

type CompassProps = {
  heading: number;
  size: number;
};

export function Compass({ heading, size }: CompassProps) {
  const theme = useTheme();
  const rotation = useSharedValue(heading);
  const previousHeading = useSharedValue(heading);

  useEffect(() => {
    let delta = heading - previousHeading.value;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    previousHeading.value = heading;
    rotation.value = withTiming(rotation.value + delta, {
      duration: ROTATION_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [heading, previousHeading, rotation]);

  const dialStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-rotation.value}deg` }],
  }));

  const innerSize = size * 0.64;

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View
        style={[
          styles.dial,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: theme.dialBorder,
            backgroundColor: theme.dial,
          },
          dialStyle,
        ]}
      >
        <View
          style={[
            styles.innerRing,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              borderColor: theme.dialBorder,
              top: (size - innerSize) / 2,
              left: (size - innerSize) / 2,
            },
          ]}
        />

        {/* tick angles */}
        {TICK_ANGLES.map((angle) => {
          const isMajor = angle % 30 === 0;
          const isMedium = !isMajor && angle % 15 === 0;
          const isNorth = angle === 0;
          const width = isMajor ? 2 : 1;
          const height = isMajor
            ? size * 0.05
            : isMedium
              ? size * 0.032
              : size * 0.018;

          return (
            <View
              key={angle}
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { transform: [{ rotate: `${angle}deg` }] },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  top: size * 0.035,
                  left: "50%",
                  width,
                  height,
                  marginLeft: -width / 2,
                  borderRadius: width / 2,
                  backgroundColor: isNorth
                    ? theme.accent
                    : isMajor || isMedium
                      ? theme.tick
                      : theme.tickSubtle,
                }}
              />
            </View>
          );
        })}

        {NUMBER_ANGLES.map((angle) => (
          <View
            key={`number-${angle}`}
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              { transform: [{ rotate: `${angle}deg` }] },
            ]}
          >
            <Text
              style={[
                styles.number,
                {
                  top: size * 0.105,
                  fontSize: size * 0.026,
                  color: theme.tickSubtle,
                },
              ]}
            >
              {angle}
            </Text>
          </View>
        ))}

        {CARDINALS.map(({ angle, label }) => (
          <View
            key={label}
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              { transform: [{ rotate: `${angle}deg` }] },
            ]}
          >
            <Text
              style={[
                styles.cardinal,
                {
                  top: size * 0.1,
                  fontSize: size * 0.058,
                  color: angle === 0 ? theme.accent : theme.tick,
                },
              ]}
            >
              {label}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* the index marker */}
      <View
        pointerEvents="none"
        style={[styles.indexMarker, { top: size * 0.006 }]}
      >
        <View
          style={[
            styles.indexTriangle,
            {
              borderTopColor: theme.accent,
            },
          ]}
        />
      </View>

      {/* degree coounter */}
      <View pointerEvents="none" style={styles.readout}>
        <Text
          style={[
            styles.degrees,
            {
              fontSize: size * 0.21,
              lineHeight: size * 0.235,
              color: theme.text,
            },
          ]}
        >
          {formatHeading(heading)}°
        </Text>
        <Text
          style={[
            styles.direction,
            {
              fontSize: size * 0.048,
              color: theme.textSecondary,
            },
          ]}
        >
          {headingToCardinal(heading)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dial: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerRing: {
    position: "absolute",
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  number: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "500",
    fontVariant: ["tabular-nums"],
  },
  cardinal: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 1,
  },
  indexMarker: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  indexTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 9,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  readout: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  degrees: {
    fontWeight: "200",
    letterSpacing: -1,
    fontVariant: ["tabular-nums"],
    includeFontPadding: false,
  },
  direction: {
    marginTop: -2,
    paddingLeft: 4,
    fontWeight: "600",
    letterSpacing: 4,
  },
});
