import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const TAB_HEIGHT = 64;

const StaticTabbar = ({ tabs, svgBgTranslationX }) => {
  const jumpyIconOpacity = new Animated.Value(1);
  const tabsActiveList = tabs.map(
    // by default the first clone icon is active
    (tab, tabIdx) => {
      const isFirstTab = tabIdx === 0;
      return new Animated.Value(isFirstTab ? 1 : 0);
    }
  );
  const TAB_WIDTH = WINDOW_WIDTH / tabs.length;

  const onPress = (pressedTabIdx) => {
    Animated.sequence([
      // 1. all clone icons go down
      Animated.parallel([
        ...tabsActiveList.map((isActive) =>
          Animated.timing(isActive, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          })
        ),
        // extra: clone icon opacity to 0 with proper delay to mimic icon disappear from the bar
        Animated.timing(jumpyIconOpacity, {
          tovalue: 0,
          delay: 40,
          duration: 1,
          useNativeDriver: true,
        }),
      ]),
      // 2. active clone icon go up
      Animated.parallel([
        Animated.spring(tabsActiveList[pressedTabIdx], {
          delay: 68,
          toValue: 1,
          useNativeDriver: true,
        }),
        // extra: show active clone icon with proper delay to mimic icon suddenly show up from bar
        Animated.timing(jumpyIconOpacity, {
          toValue: 1,
          delay: 220,
          duration: 1,
          useNativeDriver: true,
        }),
        // 3. move tabpit position (by moving svg bg)
        Animated.timing(svgBgTranslationX, {
          easing: Easing.bezier(0.23, 0.71, 0.48, 1),
          // remember, we use negative window width because we initially started
          // to make the SVG bg to be window width * 2, and the tab pit is started after the right border of screen.
          // We intended to use translateX to control a over extended SVG bg to move the tab pit
          toValue: -WINDOW_WIDTH + TAB_WIDTH * pressedTabIdx,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, tabIdx) => {
        const isActive = tabsActiveList[tabIdx];
        const jumpyIconTranslateY = isActive.interpolate({
          inputRange: [0, 1],
          outputRange: [TAB_HEIGHT + 5, 0],
        });
        /*
				  if svg bg translated to put tab pit on prev icon (tab), opacity = 1
				  if svg bg translated to put tab pit on this icon (tab), opacity = 0
				  if svg bg translated to put tab pit on next icon (tab), opacity = 1
				*/
        const opacity = svgBgTranslationX.interpolate({
          inputRange: [
            -WINDOW_WIDTH + TAB_WIDTH * (tabIdx - 1),
            -WINDOW_WIDTH + TAB_WIDTH * tabIdx,
            -WINDOW_WIDTH + TAB_WIDTH * (tabIdx + 1),
          ],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });

        return (
          <React.Fragment key={tabIdx}>
            <TouchableWithoutFeedback onPress={() => onPress(tabIdx)}>
              <Animated.View style={[styles.tab, { opacity }]}>
                <Icon size={25} color="black" name={tab} />
              </Animated.View>
            </TouchableWithoutFeedback>

            <Animated.View
              // active icon styles and position
              style={{
                position: 'absolute',
                top: -25,
                width: TAB_WIDTH,
                left: TAB_WIDTH * tabIdx,
                height: TAB_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateY: jumpyIconTranslateY }],
                opacity: jumpyIconOpacity,
              }}
            >
              {/* Circle icon bg */}
              <View style={styles.circle}>
                <Icon size={25} name={tab} />
              </View>
            </Animated.View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

const CIRCLE_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: TAB_HEIGHT,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { StaticTabbar };
