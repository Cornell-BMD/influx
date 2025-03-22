import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useLocalSearchParams } from 'expo-router';


interface Patient {
  patient_id: string;
  name: string;
  gender: string;
  height: number;
  weight: number;
  birthdate: string;
  patient_since: string;
  profile_image: string;
}

const PatientDetails = () => {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [subject, setSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [physicianId, setPhysicianId] = useState<string | null>(null);


  const calculateAge = (birthdate: string) => {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const fetchPatient = async () => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('patient_id', id)
      .single();
  
    if (error) {
      console.error('Error fetching patient:', error);
    } else {
      setPatient(data);
    }
  };


  //sending messages


  const sendMessage = async () => {
    if (!subject.trim() || !messageBody.trim()) {
      alert('Subject and message body are required.');
      return;
    }
  
    if (!physicianId || !patient?.patient_id) {
      alert('Missing physician or patient information.');
      return;
    }
  
    const { error } = await supabase.from('messages').insert([
      {
        physician_id: physicianId,
        patient_id: patient.patient_id,
        subject,
        body: messageBody,
        sent: new Date().toISOString(),
      },
    ]);
  
    if (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    } else {
      alert('Message sent successfully!');
      setModalVisible(false);
      setSubject('');
      setMessageBody('');
    }
  };
  
  
  //fetch doctors id
  const fetchPhysicianId = async () => {
    const user = supabase.auth.getUser();
    const email = (await user).data.user?.email;
  
    const { data, error } = await supabase
  .from('physicians')
  .select('physician_id')
  .eq('email', email)
  .maybeSingle();

if (error) {
  console.error('Error fetching physician:', error);
} else if (data) {
  setPhysicianId(data.physician_id);
} else {
  console.warn('No physician found for this email.');
}
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPatient();
      await fetchPhysicianId();
    };
  
    fetchData();
  }, []);
  

  // Mock Treatment Plan Data
  const deviceData = {
    initial_medication: 100,
    medication_left: 15,
    schedule: ['15:40', '16:45', '19:50', '22:15', '23:30'],
  };

  const calculateTreatmentPlan = () => {
    const totalUsage = deviceData.initial_medication - deviceData.medication_left;
    const dosagePerTime = totalUsage / deviceData.schedule.length;
    let remaining = deviceData.initial_medication;

    return deviceData.schedule.map((time, index) => {
      remaining -= dosagePerTime;
      const percentageLeft = Math.max(0, (remaining / deviceData.initial_medication) * 100);
      const hasPassed = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) >= time;

      return {
        time,
        injected: `${Math.round(dosagePerTime)}mL`,
        remaining: `${Math.round(percentageLeft)}%`,
        completed: hasPassed,
      };
    });
  };

  const [treatmentPlan, setTreatmentPlan] = useState(calculateTreatmentPlan());

  useEffect(() => {
    const interval = setInterval(() => {
      setTreatmentPlan(calculateTreatmentPlan());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={28} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: patient.profile_image }} style={styles.profileImage} />

        <View style={styles.profileActions}>
          <View style={styles.replacementContainer}>
            <Text style={styles.replacementText}>Next replacement in</Text>
            <Text style={styles.replacementBold}>1 day</Text>
          </View>

          <TouchableOpacity style={styles.messageButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.messageText}>Send Message</Text>
            <MaterialIcons name="send" size={16} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyText}>EMERGENCY SHUTOFF</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.patientName}>
        <Text style={styles.patientName}>{patient.name}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>PATIENT INFO</Text>
        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date of Birth</Text>
          <Text style={styles.infoValue}>{patient.birthdate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date Joined</Text>
          <Text style={styles.infoValue}>{patient.patient_since}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>{calculateAge(patient.birthdate)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{patient.gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Height</Text>
          <Text style={styles.infoValue}>{patient.height} inches</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Weight</Text>
          <Text style={styles.infoValue}>{patient.weight} lbs</Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>MESSAGE COMPOSITION</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>To</Text>
              <TextInput style={styles.textInput} value={patient.name} editable={false} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter subject"
                value={subject}
                onChangeText={setSubject}
              />
            </View>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your message here..."
              multiline={true}
              value={messageBody}
              onChangeText={setMessageBody}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel Composition</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Text style={styles.sendText}>Send</Text>
                <MaterialIcons name="send" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TREATMENT PLAN</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Time</Text>
          <Text style={styles.headerText}>Injected</Text>
          <Text style={styles.headerText}>Remaining</Text>
          <Text style={styles.headerText}>✔</Text>
        </View>

        {treatmentPlan.map((entry, index) => (
          <View key={index} style={styles.treatmentRow}>
            <View style={styles.timelineContainer}>
              <View style={[styles.timelineDot, index === 0 && styles.firstDot]} />
              {index !== treatmentPlan.length - 1 && <View style={styles.timelineLine} />}
              <Text style={styles.timeText}>{entry.time}</Text>
            </View>
            <Text style={styles.treatmentInjected}>{entry.injected}</Text>
            <Text style={styles.treatmentRemaining}>{entry.remaining}</Text>
            <MaterialIcons
              name={entry.completed ? 'check-circle' : 'radio-button-unchecked'}
              size={24}
              color={entry.completed ? '#4CAF50' : '#B0B0B0'}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 1 },
  statusContainer: { backgroundColor: '#EDEDED', padding: 8, borderRadius: 10, marginVertical: 10 },
  statusText: { fontSize: 14 },

  profileContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: "stretch",
    columnGap: 25,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50, 
    paddingHorizontal: 20,
    marginRight: 10,  
  },
  profileActions: {
    alignItems: "flex-start", 
  },
  replacementContainer: {
    backgroundColor: "#F2F2F7",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 8,
    width: "80%",
  },
  replacementText: {
    fontSize: 12,
    color: "#555",
  },
  replacementBold: {
    fontSize: 14,
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: "#957DFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
    width: "80%",
  },
  messageText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  emergencyButton: {
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    width: "80%",
    alignItems: "center",
  
  },
  emergencyText: {
    color: "#fff",
    fontWeight: "bold",
    flexDirection: "column",
    textAlign: "center",
  
  },

  // Treatment Plan Styles
  section: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20, elevation: 5 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  headerText: { fontWeight: 'bold', fontSize: 14, color: '#666' },
  treatmentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  
  timeText: { fontSize: 14, color: '#4A4A4A', flex: 1 },
  treatmentInjected: { fontSize: 14, backgroundColor: '#EDEDED', padding: 5, borderRadius: 5, flex: 1, textAlign: 'center' },
  treatmentRemaining: { fontSize: 14, color: '#673AB7', flex: 1, textAlign: 'center' },

  // Patient Info Section
  infoSection: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20, elevation: 5 },
  //sectionTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#666' },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  infoLabel: { fontSize: 14, color: '#555' },
  infoValue: { fontSize: 14, fontWeight: 'bold', color: '#333' },

  
  // Timeline Styles
  timelineContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#9C27B0', marginHorizontal: 10 },
  firstDot: { backgroundColor: '#6A1B9A' },
  timelineLine: { width: 2, height: 20, backgroundColor: '#B39DDB', position: 'absolute', left: 14, top: 10 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#a78bfa',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputGroup: { marginBottom: 12 },
  label: { color: '#ffffff', marginBottom: 4 },
  textInput: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 6,
  },



  patientName: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000', 
   paddingTop: 5
  },
  
  messageInput: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 6,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: { flex: 1 },
  cancelText: { color: '#ffffff', fontSize: 14 },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ade80',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendText: { color: '#ffffff', fontSize: 14, marginRight: 8 },
});

export default PatientDetails;

