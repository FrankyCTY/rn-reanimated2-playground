import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Animation, WithPanGestureHandler } from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ width: '100%' }}
      >
        {/* <Animation /> */}
        <WithPanGestureHandler />
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
