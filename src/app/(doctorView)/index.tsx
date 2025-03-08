import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
  patient_id: string;     // uuid
  name: string;           // character varying
  gender: string;         // text
  height: number;         // double precision
  weight: number;         // double precision
  birthdate: string;      // date
  patient_since: string;  // date
  profile_image: string;  // bytea
}

const DATA = [
  { id: '1', name: 'Susan Bridget', isFavorite: true },
  { id: '2', name: 'Elias Trent', isFavorite: false },
  { id: '3', name: 'Mariana Solis', isFavorite: false },
  { id: '4', name: 'Wellington Mapise', isFavorite: false },
  { id: '5', name: 'Tatenda Gonese', isFavorite: false },
  { id: '6', name: 'John Doe', isFavorite: false },
];

const screenWidth = Dimensions.get('window').width;

const PatientList = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [patients, setPatients] = useState(DATA);

  const fetchPatients = async () => {
    try {
      //const {data: patients} = await supabase.from('treatment_plans').select('patient_id, patients ( patient_id ) ').eq("physician_id", "273b91fd-9fab-4ab3-911e-9eb89689aa60");
      const {data: patients} = await supabase.from('patients').select('*');
      // const {data: patients} = await supabase.from('patients').select('*').eq("patient", "273b91fd-9fab-4ab3-911e-9eb89689aa60"); // TODO: change to session physician_id
      return patients;
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };  

  const filteredData = patients.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) =>
    isSortedAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const toggleFavorite = (id: string) => {
    const updatedPatients = patients.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setPatients(updatedPatients);
  };

  const renderItem = ({ item }: { item: typeof DATA[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(details)/PatientDetails`)} 
    >
      <View style={styles.cardContent}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/009/391/589/non_2x/man-face-clipart-design-illustration-free-png.png',
          }}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Icon
            name={item.isFavorite ? 'star' : 'star-outline'}
            size={24}
            color={item.isFavorite ? '#fbbf24' : '#9ca3af'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.titleText}>Find Your Patient</Text>

      {/* Search Bar */}
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

      {/* Sort Button */}
      <View style={styles.sortContainer}>
        <TouchableOpacity onPress={() => setIsSortedAscending(!isSortedAscending)}>
          <View style={styles.sortButton}>
            <Text style={styles.sortText}>
              {isSortedAscending ? 'A → Z' : 'Z → A'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Patient List */}
      {sortedData.length > 0 ? (
        <FlatList
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
