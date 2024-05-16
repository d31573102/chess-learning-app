import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CourseListScreen from '../screens/CourseListScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import LessonScreen from '../screens/LessonScreen';
import { AuthProvider } from '../contexts/AuthContext'


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Добро пожаловать!' }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Регистрация' }}
          />
          <Stack.Screen
            name="CourseList"
            component={CourseListScreen}
            options={{ title: 'Все разделы' }}
          />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetailScreen}
            options={{ title: 'Курс загружается...' }}
          />
          <Stack.Screen
            name="Lesson"
            component={LessonScreen}
            options={{ title: 'Урок загружается...' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default StackNavigator;
