import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

const SIZE = 100.0;

// worklets allow us to use UI thread (Native ui thread) instead of js thread)
const handleRotation = (animatedMain: Animated.SharedValue<number>) => {
  'worklet';

  return `${animatedMain.value * 2 * Math.PI}rad`;
};

const Animation = () => {
  // 1. Set up animation value on UI thread
  const animatedMain = useSharedValue(1);
  const animatedScale = useSharedValue(2);

  // 2. Create style object with UI threaded style values as default value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedMain.value,
      borderRadius: (animatedMain.value * SIZE) / 2,
      transform: [
        { scale: animatedScale.value },
        { rotate: `${animatedMain.value * 2 * Math.PI}rad` },
      ],
    };
  }, []);

  // 3. Initial animation by animating the animation values
  React.useEffect(() => {
    animatedMain.value = withRepeat(withSpring(0.5), -1, true);
    // Spring animation is based on physics
    animatedScale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      {/* animation style value attach to target */}
      <Animated.View style={[styles.view, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: { height: SIZE, width: SIZE, backgroundColor: 'blue' },
});

export { Animation };
