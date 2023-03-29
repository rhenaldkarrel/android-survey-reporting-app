import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { regionFrom } from '../lib/helpers/regionFrom';

export default function Map() {
  const coordinates = regionFrom(-6.129759815614638, 106.9556811104887, 2)
  const coordinates2 = regionFrom(-6.11934474821684, 106.956970205967, 2)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={coordinates}
      >
        <Marker
          coordinate={coordinates}
          title="title"
          description="description"
        />
        <Marker
          coordinate={coordinates2}
          title="title"
          description="description"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});