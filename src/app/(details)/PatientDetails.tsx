import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
const [modalVisible, setModalVisible] = useState<boolean>(false);

type TreatmentItem = {
  time: string;
  injected: string;
  remaining: string;
  completed: boolean;
};

type Message = {
  id: string;
  doctorName: string;
  date: string;
  subject: string;
};
const PatientDetails = () => {
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentItem[]>([
    { time: '7:30', injected: '10mL', remaining: '93%', completed: true },
    { time: '8:25', injected: '10mL', remaining: '86%', completed: true },
    { time: '9:55', injected: '15mL', remaining: '75%', completed: false },
    { time: '11:25', injected: '15mL', remaining: '64%', completed: false },
    { time: '13:30', injected: '18mL', remaining: '52%', completed: false },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', doctorName: 'Dr. Lila Millington', date: '12/03/2023', subject: 'Updated Morning Dosage' },
    { id: '2', doctorName: 'Dr. Lila Millington', date: '11/14/2023', subject: 'Appointment Summary' },
  ]);

  const toggleCompletion = (index: number) => {
    const updatedPlan = [...treatmentPlan];
    updatedPlan[index].completed = !updatedPlan[index].completed;
    setTreatmentPlan(updatedPlan);
  };

  const renderTreatmentItem = ({ item, index }: { item: TreatmentItem, index: number }) => (
    <View style={styles.treatmentRow}>
      <Text style={styles.treatmentTime}>{item.time}</Text>
      <View style={styles.timelineDot} />
      <Text style={styles.treatmentInjected}>{item.injected}</Text>
      <Text style={styles.treatmentRemaining}>{item.remaining}</Text>
      <TouchableOpacity onPress={() => toggleCompletion(index)}>
        <MaterialIcons
          name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
          size={24}
          color={item.completed ? '#4CAF50' : '#B0B0B0'}
        />
      </TouchableOpacity>
    </View>
  );

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={styles.messageCard}>
      <View style={styles.messageRow}>
        <Text style={styles.messageDoctor}>{item.doctorName}</Text>
        <Text style={styles.messageDate}>{item.date}</Text>
      </View>
      <Text style={styles.messageSubject}>{item.subject}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={28} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* Device Status Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DEVICE STATUS</Text>
        <View style={styles.deviceStatus}>
          <View style={styles.dosageContainer}>
            <Text style={styles.dosageLabel}>Remaining Dosage</Text>
            <View style={styles.dosageCircle}>
              <Text style={styles.dosageText}>100%</Text>
            </View>
          </View>
          <View style={styles.deviceDetails}>
            <Text style={styles.nextReplacement}>Next replacement in <Text style={styles.bold}>1 day</Text></Text>
            <TouchableOpacity style={styles.emergencyButton}
            
            onPress ={() => {() => setModalVisible(true)}}>
            
  


              <Text style={styles.emergencyText}>EMERGENCY SHUTOFF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Treatment Plan Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TREATMENT PLAN</Text>
        <FlatList
          data={treatmentPlan}
          renderItem={renderTreatmentItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Messages Section */}
      <View style={styles.section}>
        <View style={styles.messagesHeader}>
          <Text style={styles.sectionTitle}>MESSAGES</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 70,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4A4A4A',
  },
  deviceStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dosageContainer: {
    alignItems: 'center',
  },
  dosageLabel: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  dosageCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDE7F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dosageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#673AB7',
  },
  deviceDetails: {
    alignItems: 'flex-end',
  },
  nextReplacement: {
    fontSize: 14,
    marginBottom: 10,
    color: '#4A4A4A',
  },
  bold: {
    fontWeight: 'bold',
  },
  emergencyButton: {
    backgroundColor: '#F44336',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  emergencyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  treatmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  treatmentTime: {
    fontSize: 14,
    color: '#4A4A4A',
    flex: 1,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9C27B0',
    marginHorizontal: 10,
  },
  treatmentInjected: {
    fontSize: 14,
    color: '#4A4A4A',
    flex: 1,
    textAlign: 'center',
  },
  treatmentRemaining: {
    fontSize: 14,
    color: '#9C27B0',
    flex: 1,
    textAlign: 'center',
  },
  messagesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 14,
    color: '#673AB7',
    fontWeight: 'bold',
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  messageDoctor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  messageDate: {
    fontSize: 12,
    color: '#B0B0B0',
  },
  messageSubject: {
    fontSize: 14,
    color: '#4A4A4A',
    fontStyle: 'italic',
  },
});

export default PatientDetails;
