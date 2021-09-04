import React, { useCallback } from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

// How to handle SINGLE TAP and DOUBLE TAP differently

const AnimatedImage = Animated.createAnimatedComponent(Image);

const DoubleTapToLike = () => {
  const scale = useSharedValue(0);
  const doubleTapRef = React.useRef();

  const aniHeartImgStyle = useAnimatedStyle(() => {
    // withSpring 1 to 0 can cause heart image to flip since withSpring will cause some moments of scale value to < 0
    return { transform: [{ scale: Math.max(scale.value, 0) }] };
  });

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, {}, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Outter Handler has hight priority which will override inner handler, so we need to use the waitFor prop */}
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          console.log('SINGLE TAP');
        }}
      >
        <TapGestureHandler
          ref={doubleTapRef}
          maxDelayMs={250}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <Animated.View>
            <ImageBackground
              source={require('../assets/likeBackground.jpg')}
              style={styles.image}
            >
              <AnimatedImage
                source={require('../assets/like.png')}
                style={[
                  styles.image,
                  {
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.3,
                    shadowRadius: 35,
                  },
                  aniHeartImgStyle,
                ]}
                resizeMode="center"
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: windowWidth,
    height: windowWidth,
  },
});

export { DoubleTapToLike };
