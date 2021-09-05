import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  BasicAnimation,
  WobbleSquare,
  AnimatedScroll,
  PagerExample,
  ScrollToAndUseDerivedValue,
  InterpolateScrollView,
  ControlledScrollView,
  CircularProgressBar,
} from './src/pureReanimated';
import {
  WithPanGestureHandler,
  WithTapGestureHandler,
  WithPinchGestureHandler,
  DoubleTapToLike,
} from './src/withGestureHandler';
import { BankyTabbar } from './src/Tabbar';
import { RevoluteGraph } from './src/graph';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{
          width: '100%',
          flexGrow: 1,
          // only for tabbar
          justifyContent: 'flex-end',
        }}
      >
        {/* <Animation /> */}
        {/* <WobbleSquare /> */}
        {/* <AnimatedScroll /> */}
        {/* <PagerExample /> */}
        {/* <InterpolateScrollView /> */}
        {/* <ScrollToAndUseDerivedValue /> */}
        {/* <ControlledScrollView /> */}
        {/* {<CircularProgressBar />} */}

        {<BankyTabbar />}

        {/* <RevoluteGraph /> */}

        {/* <WithPanGestureHandler /> */}
        {/* <WithTapGestureHandler /> */}
        {/* {<WithPinchGestureHandler />} */}
        {/* <DoubleTapToLike /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    flexGrow: 1,
    backgroundColor: '#ea3345',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
