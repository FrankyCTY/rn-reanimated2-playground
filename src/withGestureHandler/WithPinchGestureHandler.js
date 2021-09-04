import React from 'react';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Dimensions, Image, StyleSheet } from 'react-native';

const imageUri =
  'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get('window');

const WithPinchGestureHandler = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      scale.value = e.scale;
      focalX.value = e.focalX;
      focalY.value = e.focalY;
    },
    onEnd: (e) => {
      scale.value = withTiming(1, { duration: 250 });
    },
  });

  const aniImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // Image top left corner will at the focal point
        { translateX: focalX.value },
        { translateY: focalY.value },
        // Image center now will at the focal point
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        // Scaling accordingly
        { scale: scale.value },
        // Offset the translateX Y to put image back to center
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const aniFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage
          style={[{ flex: 1 }, aniImageStyle]}
          source={{
            uri: imageUri,
          }}
        />
        <Animated.View style={[styles.focalPoint, aniFocalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  focalPoint: {
    ...StyleSheet.absoluteFill,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export { WithPinchGestureHandler };
