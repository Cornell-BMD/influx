import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider } from 'react-native-popup-menu';

interface Message {
  id: string;
  sender: string;
  date: string;
  subject: string;
}

interface MessagesScreenProps {
  messages?: Message[];
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ messages: initialMessages }) => {
  const [messages, setMessages] = useState<Message[] | null>(initialMessages || null);
  const [loading, setLoading] = useState<boolean>(!initialMessages);

  // Dynamic data fetching
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/messages'); // Replace with API endpoint
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
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.subject}>{item.subject}</Text>
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
        </View>

        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
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
    marginTop: 4,
    fontSize: 12,
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
});

export default MessagesScreen;
