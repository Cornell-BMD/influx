import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Physician {
  physician_id: string;   // uuid
  name: string;           // character varying
  email: string;          // character varying
  phone: string;          // character varying
  address: string;        // character varying
  profile_image: string;  // bytea
}

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Doctor's Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/009/391/589/non_2x/man-face-clipart-design-illustration-free-png.png' }} // Default profile picture URL
          style={styles.avatar}
        />
        <Text style={styles.name}>Dr. John Doe</Text>
        <Text style={styles.specialty}>Cardiologist</Text>
      </View>

      {/* Biography Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biography</Text>
        <Text style={styles.sectionContent}>
          Dr. John Doe is a board-certified cardiologist with over 15 years of experience. He specializes in managing cardiovascular diseases and conducting advanced research in cardiac care.
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.sectionContent}>Phone: (123) 456-7890</Text>
        <Text style={styles.sectionContent}>Email: johndoe@example.com</Text>
      </View>

      {/* Appointment Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.appointmentButton} onPress={() => { /* Add navigation to appointment page */ }}>
          <Text style={styles.buttonText}>Schedule Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Links */}
      <View style={[styles.section, styles.socialIcons]}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
          <Icon name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
          <Icon name="twitter" size={30} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
          <Icon name="instagram" size={30} color="#C13584" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    height: 400
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 18,
    color: 'gray',
  },
  section: {
    marginVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    height: 100
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
  },
  appointmentButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
});

export default ProfileScreen;
