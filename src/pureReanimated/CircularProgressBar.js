import React from 'react';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ReText } from 'react-native-redash';

const BG_COLOR = '#444B6F';
const BG_STROKE_COLOR = '#303858';
const PROGRESS_STROKE_COLOR = '#A6E1FA';
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const CIRCLE_LENGTH = 1000; // 2PI * Radius
const Radius = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = () => {
  const progress = useSharedValue(0);

  const onRunBtnPressed = () => {
    const shouldClearProgress = progress.value > 0;
    const newProgressValue = shouldClearProgress ? 0 : 1;

    progress.value = withTiming(newProgressValue, { duration: 2000 });
  };

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  return (
    <View style={styles.container}>
      {/* <Text style={[styles.progressText]}>{progressText.value}</Text> */}
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: 'absolute' }}>
        <Circle
          cx={windowWidth / 2}
          cy={windowHeight / 2}
          r={Radius}
          stroke={BG_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={windowWidth / 2}
          cy={windowHeight / 2}
          r={Radius}
          stroke={PROGRESS_STROKE_COLOR}
          strokeWidth={15}
          // Dasharray === CIRCLE_LENGTH = full
          strokeDasharray={CIRCLE_LENGTH}
          // CONTROL stroke length with offset from CIRCLE_LENGTH * (0 - 1)
          strokeDashoffset={CIRCLE_LENGTH}
          strokeLinecap="round"
          animatedProps={animatedProps}
        />
      </Svg>

      <TouchableOpacity style={styles.button} onPress={onRunBtnPressed}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256, 256, 256, 0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: windowWidth * 0.7,
    height: 60,
    backgroundColor: BG_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 25, color: 'white', letterSpacing: 2 },
});

export { CircularProgressBar };
