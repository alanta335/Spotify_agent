import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeMessage from './WelcomeMessage';
import { apiService } from '../../services/api';
import { DEFAULT_USER_DATA } from '../../utils/constants';
import LoadingSpinner from '../ui/LoadingSpinner';

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "Hi! I'm your Spotify AI assistant. I can help you control your music, create playlists, and discover new songs. What would you like to do?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      message: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await apiService.sendChatMessage(messageText, DEFAULT_USER_DATA);
      
      // Parse the response based on the expected JSON structure
      let messageContent;
      if (data.response && typeof data.response === 'string') {
        try {
          const parsedResponse = JSON.parse(data.response);
          messageContent = parsedResponse.content?.message || data.response;
          
          // Handle any actions if present
          if (parsedResponse.content?.actions && parsedResponse.content.actions.length > 0) {
            console.log('Spotify actions to execute:', parsedResponse.content.actions);
            // TODO: Process Spotify actions here
          }
        } catch (parseError) {
          // Fallback to plain text if JSON parsing fails
          messageContent = data.response;
        }
      } else {
        messageContent = data.response || "I've processed your request. Is there anything else you'd like me to help you with?";
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        message: messageContent,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        message: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (command) => {
    sendMessage(command);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.length === 1 && (
          <WelcomeMessage onQuickAction={handleQuickAction} />
        )}
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.message}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-800 text-white px-4 py-3 rounded-2xl">
              <div className="flex items-center space-x-3">
                <LoadingSpinner size="sm" color="green" />
                <span className="text-sm text-gray-300">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatContainer;
