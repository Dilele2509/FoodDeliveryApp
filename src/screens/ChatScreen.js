import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import axios from '../API/axios';
import { primaryColor } from "../../assets/styles/GlobalStyles";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hi I'm Hungry Cat! Can I help you???",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: require("../../assets/AIAva.jpeg"),
        },
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (inputText.trim() !== '') {
      const newMessage = {
        _id: messages.length + 1,
        text: inputText.trim(),
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage])
      );

      try {
        const response = await axios.post('/ai/chat-box/', {
          question: inputText.trim()
        });

        if (response.status === 200) {
          const data = response.data;
          const botMessage = {
            _id: messages.length + 2, // Ensure unique ID
            text: data.answer,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "AI Bot",
              avatar: require("../../assets/AIAva.jpeg"),
            },
          };
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [botMessage])
          );
        } else {
          console.error('Failed to fetch chat response:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching chat response:', error);
      }

      setInputText('');
    }
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
          padding: 5,
          borderRadius: 10,
        },
        right: {
          backgroundColor: primaryColor.organPrimary,
          padding: 5,
          borderRadius: 10,
        },
      }}
      textStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#fff',
        },
      }}
    />
  );

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Ionicons name="send" size={26} color={primaryColor.organPrimary} />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      renderSend={renderSend}
      user={{
        _id: 1,
      }}
      onInputTextChanged={setInputText}
      placeholder="Type your message..."
      value={inputText}
      renderBubble={renderBubble}
    />
  );
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;
