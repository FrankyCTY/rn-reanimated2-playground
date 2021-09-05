import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { scaleTime, scaleLinear } from 'd3-scale';
import * as shape from 'd3-shape';
import { Cursor } from './Cursor';

const data = [
  { date: new Date(2018, 9, 1).getTime(), value: 0 },
  { date: new Date(2018, 9, 16).getTime(), value: 0 },
  { date: new Date(2018, 9, 17).getTime(), value: 200 },
  { date: new Date(2018, 10, 1).getTime(), value: 200 },
  { date: new Date(2018, 10, 2).getTime(), value: 300 },
  { date: new Date(2018, 10, 5).getTime(), value: 300 },
];

const φ = (1 + Math.sqrt(5)) / 2;
const { width, height: wHeight } = Dimensions.get('window');
const height = (1 - 1 / φ) * wHeight;
const strokeWidth = 4;
const padding = strokeWidth / 2;
const CURSOR_RADIUS = 8;
const STROKE_WIDTH = CURSOR_RADIUS / 2;
const getDomain = (domain) => [Math.min(...domain), Math.max(...domain)];

const RevoluteGraph = () => {
  const scaleX = scaleTime()
    .domain(getDomain(data.map((d) => d.date)))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(getDomain(data.map((d) => d.value)))
    .range([height - padding, padding]);
  const d = shape
    .line()
    .x((p) => scaleX(p.date))
    .y((p) => scaleY(p.value))
    .curve(shape.curveBasis)(data);

  return (
    <View style={styles.container}>
      <View style={styles.graph}>
        <Svg style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <Stop offset="0%" stopColor="#cee3f9" />
              <Stop offset="80%" stopColor="#ddedfa" />
              <Stop offset="100%" stopColor="#feffff" />
            </LinearGradient>
          </Defs>
          <Path
            d={`${d}L ${width} ${height} L 0 ${height}`}
            fill="url(#gradient)"
          />
          <Path
            fill="transparent"
            stroke="#3977e3"
            d={d}
            strokeWidth={strokeWidth}
          />
        </Svg>
        <Cursor
          r={CURSOR_RADIUS}
          borderWidth={STROKE_WIDTH}
          borderColor="#3977e3"
          d={d}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graph: {
    width,
    height,
  },
});

export { RevoluteGraph };
