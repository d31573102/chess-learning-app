import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CourseCard = ({ course }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: course.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{course.title}</Text>
        <Text>{course.description}</Text>
        <Text>
          {course.completedLessons} / {course.totalLessons} уроков завершено
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: 'contain'
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseCard;
