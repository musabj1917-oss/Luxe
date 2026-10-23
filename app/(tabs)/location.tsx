import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { locationStore, LocationUpdate } from '../../server/routes/location';

export default function LiveLocationScreen() {
  const [isSharing, setIsSharing] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [locations, setLocations] = useState<LocationUpdate[]>(Object.values(locationStore));

  const handlePause = () => {
    setIsPaused(!isPaused);
    Alert.alert(
      !isPaused ? 'Location Sharing Paused' : 'Location Resumed',
      !isPaused ? 'Your location update stream is temporarily paused.' : 'Your live location is updating now.'
    );
  };

  const handleStopSharing = () => {
    setIsSharing(false);
    setIsPaused(false);
    Alert.alert('Location Sharing Stopped', 'Your location is no longer visible to any approved friends.');
  };

  const handleStartSharing = () => {
    setIsSharing(true);
    setIsPaused(false);
    Alert.alert('Live Location Active', 'Sharing live updates with approved besties.');
  };

  const renderLocationItem = ({ item }: { item: LocationUpdate }) => (
    <View style={styles.locationCard}>
      <View style={styles.avatarCircle}>
        <Ionicons name="person" size={20} color="#000000" />
      </View>

      <View style={styles.locDetails}>
        <Text style={styles.locUsername}>@{item.username}</Text>
        <Text style={styles.locCoords}>
          Lat: {item.latitude.toFixed(4)}, Long: {item.longitude.toFixed(4)}
        </Text>
        <Text style={styles.locTimestamp}>
          Updated: {new Date(item.updatedAt).toLocaleTimeString()}
        </Text>
      </View>

      <View style={styles.statusPill}>
        <View style={[styles.dot, item.isPaused ? styles.dotYellow : styles.dotGreen]} />
        <Text style={styles.statusText}>{item.isPaused ? 'Paused' : 'Live'}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Map Mock View Header */}
      <View style={styles.mapHeaderView}>
        <Ionicons name="map" size={54} color="#FFFC00" />
        <Text style={styles.mapHeaderText}>Bestie Live Map Radar</Text>
        <Text style={styles.mapSubText}>Opt-in, end-to-end controlled friend updates</Text>
      </View>

      {/* Control Buttons Panel */}
      <View style={styles.controlPanel}>
        <Text style={styles.controlTitle}>My Location Sharing Status</Text>

        <View style={styles.btnRow}>
          {isSharing ? (
            <>
              <TouchableOpacity style={styles.pauseBtn} onPress={handlePause}>
                <Ionicons name={isPaused ? 'play' : 'pause'} size={18} color="#000000" style={{ marginRight: 6 }} />
                <Text style={styles.btnTextBold}>{isPaused ? 'Resume' : 'Pause Stream'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.stopBtn} onPress={handleStopSharing}>
                <Ionicons name="stop-circle" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.stopTextBold}>Stop Sharing</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.startBtn} onPress={handleStartSharing}>
              <Ionicons name="navigate" size={18} color="#000000" style={{ marginRight: 6 }} />
              <Text style={styles.btnTextBold}>Opt-In & Start Live Sharing</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Shared Besties Locations List */}
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.sectionTitle}>Approved Besties Live Stream</Text>
        <FlatList
          data={locations.filter(l => l.isSharing)}
          keyExtractor={item => item.userId}
          renderItem={renderLocationItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mapHeaderView: {
    height: 180,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  mapHeaderText: {
    color: '#FFFC00',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  mapSubText: {
    color: '#888888',
    fontSize: 12,
  },
  controlPanel: {
    backgroundColor: '#1E1E1E',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  controlTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  btnRow: {
    flexDirection: 'row',
  },
  pauseBtn: {
    flex: 1,
    backgroundColor: '#FFFC00',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stopBtn: {
    flex: 1,
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    flex: 1,
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextBold: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  stopTextBold: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#FFFC00',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locDetails: {
    flex: 1,
  },
  locUsername: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  locCoords: {
    color: '#888888',
    fontSize: 12,
  },
  locTimestamp: {
    color: '#666666',
    fontSize: 10,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  dotGreen: {
    backgroundColor: '#34C759',
  },
  dotYellow: {
    backgroundColor: '#FFCC00',
  },
  statusText: {
    color: '#CCCCCC',
    fontSize: 11,
    fontWeight: '600',
  },
});
