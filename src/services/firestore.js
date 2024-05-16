import { firestore } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, addDoc, deleteDoc, where } from 'firebase/firestore';

// Fetch all courses, ordered by createdAt
export const fetchCourses = async () => {
  try {
    const coursesCollection = collection(firestore, 'courses');
    const coursesQuery = query(coursesCollection, orderBy('createdAt', 'asc'));
    const coursesSnapshot = await getDocs(coursesQuery);
    return coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

// Fetch lessons for a specific course, ordered by createdAt
export const fetchLessons = async (courseId) => {
  try {
    const lessonsCollection = collection(firestore, `courses/${courseId}/lessons`);
    const lessonsQuery = query(lessonsCollection, orderBy('createdAt', 'asc'));
    const lessonsSnapshot = await getDocs(lessonsQuery);
    return lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

// Fetch a specific lesson by ID
export const fetchLesson = async (courseId, lessonId) => {
  try {
    const lessonDoc = doc(firestore, `courses/${courseId}/lessons/${lessonId}`);
    const lessonSnapshot = await getDoc(lessonDoc);
    if (!lessonSnapshot.exists()) {
      throw new Error('Lesson not found');
    }
    return { id: lessonSnapshot.id, ...lessonSnapshot.data() };
  } catch (error) {
    throw error;
  }
};

// Check if a lesson is completed and favorite status
export const getLessonStatus = async (userId, lessonId) => {
  try {
    const progressQuery = query(collection(firestore, `users/${userId}/progress`), where('lessonId', '==', lessonId));
    const progressSnapshot = await getDocs(progressQuery);

    const favoriteQuery = query(collection(firestore, `users/${userId}/favorites`), where('lessonId', '==', lessonId));
    const favoriteSnapshot = await getDocs(favoriteQuery);

    return {
      completed: !progressSnapshot.empty,
      isFavorite: !favoriteSnapshot.empty,
      favoriteId: favoriteSnapshot.empty ? null : favoriteSnapshot.docs[0].id,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch the completion status of all lessons in a course for a specific user
export const fetchCourseCompletionStatus = async (userId, courseId) => {
  try {
    const lessonsCollection = collection(firestore, `courses/${courseId}/lessons`);
    const lessonsQuery = query(lessonsCollection, orderBy('createdAt', 'asc'));
    const lessonsSnapshot = await getDocs(lessonsQuery);

    const completionStatus = await Promise.all(lessonsSnapshot.docs.map(async (lessonDoc) => {
      const status = await getLessonStatus(userId, lessonDoc.id);
      return { id: lessonDoc.id, ...lessonDoc.data(), ...status };
    }));

    return completionStatus;
  } catch (error) {
    throw error;
  }
};

// Track progress for a lesson
export const trackProgress = async (userId, lessonId) => {
  try {
    const progressRef = collection(firestore, `users/${userId}/progress`);
    await addDoc(progressRef, { lessonId });
  } catch (error) {
    throw error;
  }
};

// Add a lesson to favorites
export const addToFavorites = async (userId, lessonId) => {
  try {
    const favoritesRef = collection(firestore, `users/${userId}/favorites`);
    await addDoc(favoritesRef, { lessonId });
  } catch (error) {
    throw error;
  }
};

// Remove a lesson from favorites
export const removeFromFavorites = async (userId, favoriteId) => {
  try {
    const favoriteDoc = doc(firestore, `users/${userId}/favorites/${favoriteId}`);
    await deleteDoc(favoriteDoc);
  } catch (error) {
    throw error;
  }
};
