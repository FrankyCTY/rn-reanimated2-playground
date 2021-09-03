import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

const SQUARE_SIZE = 100.0;
const CIRCLE_RADIUS = SQUARE_SIZE * 2;

const WithPanGestureHandler = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      // stored starting translate position
      ctx.translateX = translateX.value;
      ctx.translateY = translateY.value;
    },
    onActive: (event, ctx) => {
      // Move relative to the starting position, so won't fall back to center point every time we drag
      translateX.value = event.translationX + ctx.translateX;
      translateY.value = event.translationY + ctx.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      const isSquareInsideOfCircle = distance < CIRCLE_RADIUS + SQUARE_SIZE / 2;

      if (isSquareInsideOfCircle) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, animatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 600,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { WithPanGestureHandler };
