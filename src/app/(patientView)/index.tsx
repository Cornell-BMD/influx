import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PatientList from '../(details)/PatientDetails';
import PatientDetails from '../(details)/PatientDetails';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <PatientDetails/>
    </View>
  );
}

/*
const fetchPatients = async () => {
  try {
    //const {data: patients} = await supabase.from('treatment_plans').select('patient_id, patients ( patient_id ) ').eq("physician_id", "273b91fd-9fab-4ab3-911e-9eb89689aa60");
    const {data: patients} = await supabase.from('patients').select('*');
    // const {data: patients} = await supabase.from('patients').select('*').eq("patient", "273b91fd-9fab-4ab3-911e-9eb89689aa60"); // TODO: change to session physician_id
    return patients;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
  }
};*/

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
