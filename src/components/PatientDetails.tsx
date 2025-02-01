import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';

const PatientDetails = () => {
  const [isDosageModalVisible, setIsDosageModalVisible] = useState(false);
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false);
  const [dosage, setDosage] = useState('');
  const [currentDosage, setCurrentDosage] = useState(50); // Default dosage

  // Handlers
  const handleDosageUpdate = () => {
    const newDosage = parseInt(dosage, 10);
    if (!isNaN(newDosage) && newDosage > 0) {
      setCurrentDosage(newDosage);
      Alert.alert('Dosage Updated', `New dosage set to: ${newDosage}mg`);
      setIsDosageModalVisible(false);
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid dosage amount.');
    }
  };

  const handleEmergencyShutOff = () => {
    setIsEmergencyModalVisible(true);
  };

  const confirmEmergencyShutOff = () => {
    Alert.alert('System Shut Off', 'Emergency shut off activated.');
    setIsEmergencyModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Patient: John Doe</Text>

      {/* Emergency Shut Off Button */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={handleEmergencyShutOff}
      >
        <Text style={styles.emergencyButtonText}>Emergency Shut Off</Text>
      </TouchableOpacity>

      {/* Patient Information Section */}
      <Text style={styles.sectionTitle}>Patient Information</Text>
      <View style={styles.infoBox}>
        <Text>Date of Birth: 01/01/1980</Text>
        <Text>Age: 43</Text>
        <Text>Current Dosage: {currentDosage}mg</Text>
      </View>

      {/* Change Dosage Button */}
      <TouchableOpacity
        style={styles.changeDosageButton}
        onPress={() => setIsDosageModalVisible(true)}
      >
        <Text style={styles.changeDosageText}>Change Dosage</Text>
      </TouchableOpacity>

      {/* Dosage Modal */}
      <Modal
        visible={isDosageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDosageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Change Dosage</Text>
            <TextInput
              style={styles.input}
              value={dosage}
              onChangeText={setDosage}
              placeholder="Enter new dosage..."
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <Button title="Submit" onPress={handleDosageUpdate} />
              <Button title="Cancel" color="red" onPress={() => setIsDosageModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Emergency Modal */}
      <Modal
        visible={isEmergencyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEmergencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Confirm Emergency Shut Off</Text>
            <Text>Are you sure you want to shut off the system?</Text>
            <View style={styles.modalButtons}>
              <Button title="Yes" onPress={confirmEmergencyShutOff} />
              <Button title="No" color="red" onPress={() => setIsEmergencyModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emergencyButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  changeDosageButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  changeDosageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});
