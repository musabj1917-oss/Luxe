import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockStories } from '../../server/routes/stories';

export default function CameraAndStoriesScreen() {
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [stories, setStories] = useState(mockStories);

  const handleSnapPhoto = () => {
    // Simulated snap capture
    const samplePhotos = [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600'
    ];
    const picked = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    setCapturedMedia(picked);
  };

  const handlePostStory = () => {
    if (!capturedMedia) return;

    const newStory = {
      id: `st_${Date.now()}`,
      user_id: 'u1',
      username: 'alex_star',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      type: 'photo' as const,
      media_url: capturedMedia,
      caption: 'Posted to Besties Story ✨',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 3600 * 1000).toISOString()
    };

    setStories([newStory, ...stories]);
    setCapturedMedia(null);
    Alert.alert('Story Posted!', 'Your story is now live for 24 hours with your approved besties.');
  };

  return (
    <View style={styles.container}>
      {/* Stories Bar Header */}
      <View style={styles.storiesContainer}>
        <Text style={styles.storiesTitle}>Bestie Stories (24h)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storiesList}>
          {/* Add story item */}
          <TouchableOpacity style={styles.addStoryItem} onPress={handleSnapPhoto}>
            <View style={styles.addStoryCircle}>
              <Ionicons name="add" size={28} color="#000000" />
            </View>
            <Text style={styles.storyName}>My Story</Text>
          </TouchableOpacity>

          {stories.map(item => (
            <TouchableOpacity key={item.id} style={styles.storyItem}>
              <View style={styles.storyBorder}>
                <Image source={{ uri: item.avatar_url }} style={styles.storyAvatar} />
              </View>
              <Text style={styles.storyName} numberOfLines={1}>{item.username}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Camera View Area */}
      <View style={styles.cameraView}>
        {capturedMedia ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedMedia }} style={styles.previewImage} />
            <View style={styles.previewOverlay}>
              <TouchableOpacity style={styles.discardButton} onPress={() => setCapturedMedia(null)}>
                <Ionicons name="close-circle" size={36} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.postStoryButton} onPress={handlePostStory}>
                <Ionicons name="paper-plane" size={20} color="#000000" style={{ marginRight: 6 }} />
                <Text style={styles.postStoryText}>Post Story (24h)</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.cameraPlaceholder}>
            <Ionicons name="camera-outline" size={80} color="#333333" />
            <Text style={styles.cameraText}>Tap circle below to capture a Snap</Text>
          </View>
        )}
      </View>

      {/* Snap Trigger Button */}
      {!capturedMedia && (
        <View style={styles.controlsBar}>
          <TouchableOpacity style={styles.snapRing} onPress={handleSnapPhoto}>
            <View style={styles.snapInnerCircle} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  storiesContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#111111',
  },
  storiesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFC00',
    marginBottom: 10,
  },
  storiesList: {
    alignItems: 'center',
  },
  addStoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  addStoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 14,
  },
  storyBorder: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  storyName: {
    color: '#FFFFFF',
    fontSize: 11,
    maxWidth: 65,
    textAlign: 'center',
  },
  cameraView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  cameraPlaceholder: {
    alignItems: 'center',
  },
  cameraText: {
    color: '#888888',
    fontSize: 14,
    marginTop: 12,
  },
  previewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewOverlay: {
    position: 'absolute',
    top: 40,
    bottom: 20,
    left: 20,
    right: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  discardButton: {
    padding: 8,
  },
  postStoryButton: {
    backgroundColor: '#FFFC00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  postStoryText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  controlsBar: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  snapRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 5,
    borderColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapInnerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  },
});
