import React from 'react';
import {
  useAnimatedRef,
  useSharedValue,
  useDerivedValue,
  scrollTo,
} from 'react-native-reanimated';
import { View, Button, ScrollView } from 'react-native';

const SCROLL_ITEM_HEIGHT = 500;

const ScrollToAndUseDerivedValue = () => {
  const animatedScrollViewRef = useAnimatedRef();
  const scroll = useSharedValue(0);

  // react to shared value changes
  useDerivedValue(() => {
    // scrollView total height = 5000
    // each time pressing btn scroll.value += 1, so we need to times 500
    // after 10 times we reset the scroll position to 0
    scrollTo(animatedScrollViewRef, 0, scroll.value * SCROLL_ITEM_HEIGHT, true);
  });

  const onScrollBtnPressed = () => {
    scroll.value = scroll.value + 1;
    if (scroll.value >= 10) scroll.value = 0;
  };

  const tenItems = Array.from(Array(10).keys());

  return (
    <View>
      <Button title="scroll down" onPress={onScrollBtnPressed} />
      <View style={{ width: 120, height: 200, backgroundColor: 'green' }}>
        <ScrollView
          ref={animatedScrollViewRef}
          style={{ backgroundColor: 'orange', width: 120 }}
        >
          {tenItems.map((_, i) => (
            <View
              key={i}
              style={{
                backgroundColor: 'white',
                width: 100,
                height: SCROLL_ITEM_HEIGHT,
                margin: 10,
              }}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export { ScrollToAndUseDerivedValue };
