import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { fetchCourses, fetchCourseCompletionStatus } from '../services/firestore';
import { getAuth } from 'firebase/auth';
import CourseCard from '../components/CourseCard';

const auth = getAuth();

const CourseListScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [ loading, setLoading ] = useState(false)

  const loadCourses = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        setLoading(true)
        const courseList = await fetchCourses();
        const courseCompletionStatuses = await Promise.all(
          courseList.map(async (course) => {
            const lessons = await fetchCourseCompletionStatus(user.uid, course.id);
            const completedLessons = lessons.filter((lesson) => lesson.completed).length;
            return {
              ...course,
              completedLessons,
              totalLessons: lessons.length,
            };
          })
        );
        setCourses(courseCompletionStatuses);
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CourseDetail', { courseId: item.id, courseName: item.title })}>
            <CourseCard course={item} />
          </TouchableOpacity>
        )}
        refreshing={loading}
        onRefresh={loadCourses}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CourseListScreen;
