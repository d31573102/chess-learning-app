import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchCourseCompletionStatus } from '../services/firestore';
import { getAuth } from 'firebase/auth';
import LessonCard from '../components/LessonCard';

const auth = getAuth();

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId, courseName } = route.params;
  const [lessons, setLessons] = useState([]);

  useLayoutEffect(() => {
    if (courseName) navigation.setOptions({ title: courseName })
  }, [courseName])

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await fetchCourseCompletionStatus(user.uid, courseId);
          setLessons(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadLessons();
  }, [courseId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Lesson', { courseId, lessonId: item.id })}>
            <LessonCard lesson={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CourseDetailScreen;
