import React, { useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  { id: '1', name: 'John Doe', age: 20, currentDosage: 300 },
  { id: '2', name: 'Mary Lion', age: 30, currentDosage: 200 },
  { id: '3', name: 'Tatenda Gonese', age: 40, currentDosage: 100 },
  { id: '4', name: 'John Long', age: 40, currentDosage: 100 },
  { id: '5', name: 'Mandy Mears', age: 40, currentDosage: 100 },
  { id: '6', name: 'Patient 1', age: 40, currentDosage: 100 },
];

const screenWidth = Dimensions.get('window').width;

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortedAscending, setIsSortedAscending] = useState(true);

  const filteredData = DATA.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) =>
    isSortedAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );

  const renderItem = ({ item }: { item: typeof DATA[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={{ uri: "https://static.vecteezy.com/system/resources/previews/009/391/589/non_2x/man-face-clipart-design-illustration-free-png.png" }}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>Age: {item.age}</Text>
          <Text style={styles.text}>Current Dosage: {item.currentDosage} mg</Text>
        </View>
      </View>
    </View>
  );

  const handleSort = () => {
    setIsSortedAscending(!isSortedAscending);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <Text style={styles.titleText}>Patient List</Text>

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

      {/* Sort Button (conditionally rendered) */}
      {sortedData.length > 0 && (
        <View style={styles.sortContainer}>
          <TouchableOpacity onPress={handleSort}>
            <Icon
              name={isSortedAscending ? "sort-by-alpha" : "sort"}
              size={20}
              color="skyblue"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Patient List or Not Found Message */}
      {sortedData.length > 0 ? (
        <FlatList
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={[styles.listContent, styles.notFoundContainer]}>
          <Text style={styles.notFoundText}>No patients found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff', // Set background color to white
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    marginLeft: 16,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#f9f9f9', // Light background for the search bar
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
    marginHorizontal: 8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff', // Set card color to white
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    borderColor: '#000', // Black border around each card
    borderWidth: 1,
    elevation: 3, // Optional: Adds shadow on Android for a subtle effect
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flexShrink: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  notFoundContainer: {
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: 'grey',
  },
});

export default PatientList;
