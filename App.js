import { StyleSheet, Text, View } from 'react-native';
import './src/services/firebase';
import StackNavigator from './src/navigation/StackNavigator'

export default function App() {
  return StackNavigator()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
