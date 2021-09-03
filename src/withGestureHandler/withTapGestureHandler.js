import React from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

const WithTapGestureHandler = () => {
  const isPressed = useSharedValue(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: isPressed.value ? 'blue' : 'yellow',
      transform: [{ scale: withSpring(isPressed.value ? 1.5 : 1) }],
    };
  });

  const tapGestureHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      isPressed.value = true;
    },
    onEnd: (e, ctx) => {
      isPressed.value = false;
    },
  });

  return (
    <View style={styles.container}>
      <TapGestureHandler onGestureEvent={tapGestureHandler}>
        <Animated.View style={[styles.circle, animatedStyles]} />
      </TapGestureHandler>
    </View>
  );
};

const CIRCLE_SIZE = 120;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 600,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 365,
    backgroundColor: 'yellow',
  },
});

export { WithTapGestureHandler };
