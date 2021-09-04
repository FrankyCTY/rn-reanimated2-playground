import React from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';

// used be feather icon
const tabs = ['grid', 'list', 'refresh-cw', 'box', 'user'];

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 64;
const TAB_WIDTH = width / tabs.length;

const left = shape
  .line()
  .x((d) => d.x)
  .y((d) => d.y)([
  { x: 0, y: 0 },
  { x: width, y: 0 },
]);

// The go down pit in red
const tabPit = shape
  .line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(shape.curveBasis)([
  {
    x: width,
    y: 0,
  },
  { x: width + 5, y: 0 },
  { x: width + 10, y: 10 },
  { x: width + 15, y: TAB_BAR_HEIGHT },
  { x: width + TAB_WIDTH - 15, y: TAB_BAR_HEIGHT },
  { x: width + TAB_WIDTH - 10, y: 10 },
  { x: width + TAB_WIDTH - 5, y: 0 },
  { x: width + TAB_WIDTH, y: 0 },
]);

// White section of tabBar
const right = shape
  .line()
  .x((d) => d.x)
  .y((d) => d.y)([
  { x: width + TAB_WIDTH, y: 0 },
  { x: width * 2, y: 0 },
  { x: width * 2, y: TAB_BAR_HEIGHT },
  { x: 0, y: TAB_BAR_HEIGHT },
  { x: 0, y: 0 },
]);

const d = `${left} ${tabPit} ${right}`;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Tabbar = () => {
  return (
    <>
      <AnimatedSvg
        width={width * 2}
        height={TAB_BAR_HEIGHT}
        style={{ transform: [{ translateX: -100 }] }}
      >
        {<Path d={d} fill="white" />}
      </AnimatedSvg>
      <SafeAreaView style={styles.safeArea} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
  },
});

export { Tabbar };
