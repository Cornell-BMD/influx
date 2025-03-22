import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '@/lib/supabase';

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

const screenWidth = Dimensions.get('window').width;

const PatientList = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    try {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) throw error;
      if (data) setPatients(data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredData = patients.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) =>
    isSortedAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const renderItem = ({ item }: { item: Patient }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/(details)/PatientDetails', params: { id: item.patient_id } })}

    >
      <View style={styles.cardContent}>
        <Image
          source={{ uri: item.profile_image }}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        {/* <TouchableOpacity>
          <Icon name={'star-outline'} size={24} color={'#9ca3af'} />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Find Your Patient</Text>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => setIsSortedAscending(!isSortedAscending)}>
          <View style={styles.sortButton}>
            <Text style={styles.sortText}>
              {isSortedAscending ? 'A → Z' : 'Z → A'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {sortedData.length > 0 ? (
        <FlatList
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.patient_id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>No patients found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#6b7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#ffffff',
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: '#000',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sortButton: {
    backgroundColor: '#e0e7ff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sortText: {
    fontSize: 12,
    color: '#4f46e5',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 250,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: 350,
    alignSelf: 'center',
    height: 100,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#374151',
  },
  listContent: {
    paddingBottom: 16,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: 'grey',
  },
});

export default PatientList;
