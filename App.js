import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  BasicAnimation,
  WobbleSquare,
  AnimatedScroll,
  PagerExample,
  ScrollToAndUseDerivedValue,
  InterpolateScrollView,
} from './src/pureReanimated';
import {
  WithPanGestureHandler,
  WithTapGestureHandler,
  WithPinchGestureHandler,
} from './src/withGestureHandler';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ width: '100%', flexGrow: 1 }}
      >
        {/* <Animation /> */}
        {/* <WobbleSquare /> */}
        {/* <AnimatedScroll /> */}
        {/* <PagerExample /> */}
        {/* <InterpolateScrollView /> */}
        {/* <ScrollToAndUseDerivedValue /> */}

        {/* <WithPanGestureHandler /> */}
        {/* <WithTapGestureHandler/> */}
        <WithPinchGestureHandler />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
