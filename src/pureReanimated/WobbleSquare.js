import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { View, StyleSheet, Button } from 'react-native';

const WobbleSquare = () => {
  const rotationZ = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotationZ.value}deg`,
        },
      ],
    };
  });

  const wobbleTheSquare = () => {
    rotationZ.value = withSequence(
      withRepeat(wobbleFromLToR(), 6, true),
      rotateToStartingPoint()
    );

    function wobbleFromLToR() {
      return withSequence(
        withTiming(-10, { duration: 100 }),
        withTiming(10, { duration: 100 })
      );
    }

    function rotateToStartingPoint() {
      return withTiming(0, { duration: 100 });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.square, animatedStyles]} />

      <Button title="start animation" onPress={wobbleTheSquare} />
    </View>
  );
};

const SQUARE_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: 'limegreen',
    marginBottom: 50,
  },
});

export { WobbleSquare };
