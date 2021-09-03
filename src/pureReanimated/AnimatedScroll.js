import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const SIZE = 100.0;

const AnimatedScroll = () => {
  const translationX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e) => {
    translationX.value = e.contentOffset.y;
  });

  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translationX.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[[styles.box, animatedBoxStyle]]} />
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {Array.from(Array(10)).map((_, idx) => (
          <Animated.View style={styles.item} key={idx}>
            <Text>item</Text>
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const BOX_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  scrollView: {
    width: '100%',
    flexGrow: 1,
    borderWidth: 1,
  },
  box: { height: BOX_SIZE, width: BOX_SIZE, backgroundColor: 'blue' },
  item: {
    height: 50,
    width: '100%',
    backgroundColor: 'yellow',
  },
});

export { AnimatedScroll };
