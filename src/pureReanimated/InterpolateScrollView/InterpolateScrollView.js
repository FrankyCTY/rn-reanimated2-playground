import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import { Page } from './Page';

const TITLE_OF_SCROLL_PAGES = ['Good', 'Morning', 'My', 'Venus'];

const InterpolateScrollView = () => {
  const scrollContentOffsetX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollContentOffsetX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      horizontal
      onScroll={scrollHandler}
      // fire onScroll each 16ms
      scrollEventThrottle={16}
      style={styles.container}
    >
      {TITLE_OF_SCROLL_PAGES.map((title, idx) => {
        return (
          <Page
            key={idx}
            title={title}
            pageIdx={idx}
            scrollContentOffsetX={scrollContentOffsetX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { InterpolateScrollView };
