import React from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { StaticTabbar } from './StaticTabbar';
import * as shape from 'd3-shape';

/* CORE COMPONENTS
  1. SVG white bar background with a tab pit - AnimatedSVg
  2. Icon tab bar with 5 icons - StaticTabbar
*/

// used by FontAwesome
const tabs = ['grid', 'list', 'refresh-cw', 'box', 'user'];

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 64;
const TAB_WIDTH = WINDOW_WIDTH / tabs.length;

const left = shape
  .line()
  .x((d) => d.x)
  .y((d) => d.y)([
  { x: 0, y: 0 },
  { x: WINDOW_WIDTH, y: 0 },
]);

// The go down pit in red
const tabPitDepth = TAB_BAR_HEIGHT - 20;
const tabPit = shape
  .line()
  .x((d) => d.x)
  .y((d) => d.y)
  .curve(shape.curveBasis)([
  {
    x: WINDOW_WIDTH,
    y: 0,
  },
  { x: WINDOW_WIDTH + 1, y: 0 },
  { x: WINDOW_WIDTH + 3, y: 1 },
  { x: WINDOW_WIDTH + 10, y: 10 },
  { x: WINDOW_WIDTH + 15, y: tabPitDepth },
  { x: WINDOW_WIDTH + TAB_WIDTH - 15, y: tabPitDepth },
  { x: WINDOW_WIDTH + TAB_WIDTH - 10, y: 10 },
  { x: WINDOW_WIDTH + TAB_WIDTH - 1, y: 0 },
  { x: WINDOW_WIDTH + TAB_WIDTH - 3, y: 2 },
  { x: WINDOW_WIDTH + TAB_WIDTH, y: 0 },
]);

// White section of tabBar
const right = shape
  .line()
  .x((d) => d.x)
  .y((d) => d.y)([
  { x: WINDOW_WIDTH + TAB_WIDTH, y: 0 },
  { x: WINDOW_WIDTH * 2.2, y: 0 },
  { x: WINDOW_WIDTH * 2.2, y: TAB_BAR_HEIGHT },
  { x: 0, y: TAB_BAR_HEIGHT },
  { x: 0, y: 0 },
]);

const d = `${left} ${tabPit} ${right}`;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const BankyTabbar = () => {
  // remember, we use negative window width because we initially started
  // to make the SVG bg to be window width * 2, and the tab pit is started after the right border of screen.
  // We intended to use translateX to control a over extended SVG bg to move the tab pit

  // Started from negative WINDOW_WIDTH means the tabpit will be on the first icon position
  const svgBgTranslationX = new Animated.Value(-WINDOW_WIDTH);

  return (
    <>
      <View height={TAB_BAR_HEIGHT}>
        <AnimatedSvg
          width={WINDOW_WIDTH * 2.2}
          height={TAB_BAR_HEIGHT}
          style={{ transform: [{ translateX: svgBgTranslationX }] }}
        >
          {<Path d={d} fill="white" />}
        </AnimatedSvg>

        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar tabs={tabs} svgBgTranslationX={svgBgTranslationX} />
        </View>
      </View>
      <SafeAreaView style={styles.safeArea} />
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
  },
});

export { BankyTabbar };
