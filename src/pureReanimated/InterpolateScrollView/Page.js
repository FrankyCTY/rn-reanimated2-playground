import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const SQUARE_SIZE = width * 0.7;

const Page = ({ title, pageIdx, scrollContentOffsetX }) => {
  const currentPageFullyOnScreenInOffsetX = pageIdx * width;
  const prevPageFullyOnScreenInOffsetX = (pageIdx - 1) * width;
  const nextPageFullyOnScreenInOffsetX = (pageIdx + 1) * width;

  const aniSquareStyle = useAnimatedStyle(() => {
    const interpolatedScale = interpolate(
      scrollContentOffsetX.value,
      [
        prevPageFullyOnScreenInOffsetX,
        currentPageFullyOnScreenInOffsetX,
        nextPageFullyOnScreenInOffsetX,
      ],
      [0, 1, 0],
      // Ban interpolate to extend the output, example: > nextPageFullyOnScreenByOffsetX === 0, !== -1
      Extrapolate.CLAMP
    );

    const interpolatedBorderRadius = interpolate(
      scrollContentOffsetX.value,
      [
        prevPageFullyOnScreenInOffsetX,
        currentPageFullyOnScreenInOffsetX,
        nextPageFullyOnScreenInOffsetX,
      ],
      [0, SQUARE_SIZE / 2, 0],
      // Ban interpolate to extend the output, example: > nextPageFullyOnScreenByOffsetX === 0, !== -1
      Extrapolate.CLAMP
    );

    return {
      borderRadius: interpolatedBorderRadius,
      transform: [{ scale: interpolatedScale }],
    };
  });

  const aniTextContainerStyle = useAnimatedStyle(() => {
    const pxToStayInStartingPoint = 0;
    const pxToStayBelowBottomBorder = height / 2;
    const pxToStayAboveTopBorder = -(height / 2);

    const translateY = interpolate(
      scrollContentOffsetX.value,
      [
        prevPageFullyOnScreenInOffsetX,
        currentPageFullyOnScreenInOffsetX,
        nextPageFullyOnScreenInOffsetX,
      ],
      [
        pxToStayBelowBottomBorder,
        pxToStayInStartingPoint,
        pxToStayAboveTopBorder,
      ]
    );

    const opacity = interpolate(
      scrollContentOffsetX.value,
      [
        prevPageFullyOnScreenInOffsetX + 200,
        currentPageFullyOnScreenInOffsetX,
        nextPageFullyOnScreenInOffsetX - 200,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0, 0, 256, 0.${pageIdx + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, aniSquareStyle]} />

      <Animated.View style={[{ position: 'absolute' }, aniTextContainerStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: SQUARE_SIZE,
    width: SQUARE_SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    fontSize: 70,
    color: 'white',
    fontWeight: '700',
  },
});

export { Page };
