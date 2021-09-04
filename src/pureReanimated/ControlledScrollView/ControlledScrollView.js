import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Page, { PAGE_WIDTH } from './Page';

const titles = ["What's", 'up', 'mobile', 'devs?'];

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

const ControlledScrollView = () => {
  const translateX = useSharedValue(0);

  // translateX min to 0 and max to total content offset x
  const clampedTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (e, ctx) => {
      translateX.value = e.translationX + ctx.x;
    },
    onEnd: (e) => {
      translateX.value = withDecay({ velocity: e.velocityX });
    },
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={{ flex: 1, flexDirection: 'row' }}>
          {titles.map((title, index) => {
            return (
              <Page
                key={index.toString()}
                translateX={clampedTranslateX}
                index={index}
                title={title}
              />
            );
          })}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { ControlledScrollView };
