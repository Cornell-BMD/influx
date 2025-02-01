import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PatientList from '../../components/PatientList';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <PatientList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});
