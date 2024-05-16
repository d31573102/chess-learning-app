import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, View, Text, Button, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { getAuth } from 'firebase/auth';
import { fetchLesson, getLessonStatus, trackProgress, addToFavorites, removeFromFavorites } from '../services/firestore';

const {width, height} = Dimensions.get('window')

const auth = getAuth();

const LessonScreen = ({ route, navigation }) => {
  const { courseId, lessonId } = route.params;
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    if (lesson?.title) navigation.setOptions({ title: lesson.title })
  })

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const lessonData = await fetchLesson(courseId, lessonId);
          const status = await getLessonStatus(user.uid, lessonId);
          setLesson(lessonData);
          setCompleted(status.completed);
          setIsFavorite(status.isFavorite);
          setFavoriteId(status.favoriteId);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadLesson();
  }, [courseId, lessonId]);

  const handleMarkComplete = async () => {
    if (completed) return
    try {
      const user = auth.currentUser;
      if (user) {
        await trackProgress(user.uid, lessonId);
        setCompleted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        if (isFavorite) {
          await removeFromFavorites(user.uid, favoriteId);
          setIsFavorite(false);
          setFavoriteId(null);
        } else {
          const newFavoriteId = await addToFavorites(user.uid, lessonId);
          setIsFavorite(true);
          setFavoriteId(newFavoriteId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: lesson.videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        style={{ width: '100%', height: width }}
      />
      <Text style={styles.title}>{lesson.title}</Text>
      <Text>{lesson.description}</Text>
      <View style={{height: 20}} />
      <Button title={completed ? "Завершен" : "Завершить"} color={completed && 'green'} onPress={handleMarkComplete} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default LessonScreen;
