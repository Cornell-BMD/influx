import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const patient = {
  patient_id: "123",
  name: "Wellington Mapise",
  gender: "male",
  height: 67,
  weight: 100,
  birthdate: "1996-07-04",
  patient_since: "2024-09-16",
  profile_image: "https://static.vecteezy.com/system/resources/previews/009/391/589/non_2x/man-face-clipart-design-illustration-free-png.png",
};

const devices = [
  {
    device_id: 1,
    device_status: "Active",
    last_sync: "2024-03-07T10:30:00Z",
    battery_level: 80,
    medication_level: 50,
  },
];

const messages = [
  {
    message_id: 1,
    physician_id: "321",
    subject: "Updated Morning Dosage",
    body: "Please adjust the morning dosage to 15mL.",
    sent: "2024-03-07T08:00:00Z",
  },
  {
    message_id: 2,
    physician_id: "654",
    subject: "Appointment Summary",
    body: "Your checkup went well. Continue medication as prescribed.",
    sent: "2024-02-20T12:30:00Z",
  },
];

// Mock Treatment Plan Data
const deviceData = {
  initial_medication: 100, // Initial medication amount (in mL)
  medication_left: 15, // Remaining medication (in mL)
  schedule: ["15:40", "16:45", "19:50", "22:15", "23:30"], // Scheduled times
};

// Function to calculate "Injected" and "Remaining" dynamically
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

const PatientDetails = () => {
  const [treatmentPlan, setTreatmentPlan] = useState(calculateTreatmentPlan());


  const calculateAge = (birthdate: string) => {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTreatmentPlan(calculateTreatmentPlan());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="menu" size={28} color="#4A4A4A" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={28} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
    <View style={styles.profileContainer}>
      {/* Left: Profile Image */}
      <Image source={{ uri: patient.profile_image }} style={styles.profileImage} />

      {/* Right: Status and Buttons */}
      <View style={styles.profileActions}>
        <View style={styles.replacementContainer}>
          <Text style={styles.replacementText}>Next replacement in</Text>
          <Text style={styles.replacementBold}>1 day</Text>
        </View>

        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageText}>Send Message</Text>
          <MaterialIcons name="send" size={16} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyText}>EMERGENCY SHUTOFF</Text>
        </TouchableOpacity>
      </View>
    </View>

       {/* Patient Information Section */}
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


      
      {/* Treatment Plan Section */}
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
              name={entry.completed ? "check-circle" : "radio-button-unchecked"}
              size={24}
              color={entry.completed ? "#4CAF50" : "#B0B0B0"}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 50 },
  statusContainer: { backgroundColor: '#EDEDED', padding: 8, borderRadius: 10, marginVertical: 10 },
  statusText: { fontSize: 14 },

  profileContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: "stretch",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50, 
    paddingHorizontal: 20,
    gap: 20
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
});

export default PatientDetails;
