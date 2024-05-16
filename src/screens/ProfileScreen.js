import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { logout } from '../services/auth';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default ProfileScreen;
