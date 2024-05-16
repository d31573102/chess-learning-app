import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LessonCard = ({ lesson }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: lesson.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text>{lesson.description}</Text>
        {lesson.completed && <Text style={styles.completed}>Завершен</Text>}
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
  completed: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default LessonCard;
