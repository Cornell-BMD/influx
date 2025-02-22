import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider } from 'react-native-popup-menu';
import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';

interface Message {
  physician_id: string; //maybe uuid
  sent: Timestamp; //maybe consider date here
  subject: string;
  body: string;
  patient_id: string; // going to be used to fetch the name
  name: string // what to display  as title for the message
}

interface MessagesScreenProps {
  messages?: Message[];
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ messages: initialMessages }) => {
  const [messages, setMessages] = useState<Message[] | null>(initialMessages || null);
  const [loading, setLoading] = useState<boolean>(!initialMessages);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Dynamic data fetching
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/messages'); // Replace with API endpoint from backend
      const data: Message[] = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialMessages) {
      fetchMessages();
    }
  }, [initialMessages]);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <View style={styles.messageHeader}>
        <View style={styles.indicator} />
        <Text style={styles.sender}>{item.name}</Text>
        <Text style={styles.date}>{item.sent}</Text>
      </View>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.noMessagesText}>No messages to display.</Text>
      </View>
    );
  }

  return (
    <MenuProvider>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <Menu>
            <MenuTrigger>
              <Ionicons name="menu" size={24} color="#6b7280" />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => console.log('Go to Home')}>
                <Text style={styles.menuOption}>Home</Text>
              </MenuOption>
              <MenuOption onSelect={() => console.log('Go to Settings')}>
                <Text style={styles.menuOption}>Settings</Text>
              </MenuOption>
              <MenuOption onSelect={() => console.log('Logout')}>
                <Text style={[styles.menuOption, styles.logoutOption]}>Logout</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
          <Text style={styles.header}>MESSAGES</Text>
          {/* Compose Icon */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="create-outline" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.physician_id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        {/* Modal for Message Composition */}
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
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter recipient"
                />
              </View>
              <TextInput
                style={styles.messageInput}
                placeholder="Type your message here..."
                multiline={true}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>Cancel Composition</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton}>
                  <Text style={styles.sendText}>Send</Text>
                  <Ionicons name="send" size={18} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    height: 190,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    flex: 1,
  },
  menuOption: {
    fontSize: 14,
    padding: 10,
    color: '#111827',
  },
  logoutOption: {
    color: '#ef4444',
  },
  messageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80',
    marginRight: 8,
  },
  sender: {
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  subject: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesText: {
    fontSize: 16,
    color: '#6b7280',
  },
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
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: '#ffffff',
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 6,
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
  cancelButton: {
    flex: 1,
  },
  cancelText: {
    color: '#ffffff',
    fontSize: 14,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ade80',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  body: {
    marginTop: 4,
    fontSize: 14,
    color: "#374151",
    alignItems: "center", // need to position the body well
  },
  
  sendText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 8,
  },
});

export default MessagesScreen;
